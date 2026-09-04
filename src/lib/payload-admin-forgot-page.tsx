/**
 * Renders Payload forgot-password without RootPage dbHasUser redirect.
 */
import { PageConfigProvider } from '@payloadcms/ui';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';
import { getVisibleEntities } from '@payloadcms/ui/shared';
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig';
import { initReq } from 'payload-init-req';
import { MinimalTemplate } from '@payloadcms/next/templates';
import { ForgotPasswordView } from 'payload-forgot-view';
import { RootPage } from '@payloadcms/next/views';
import { redirect } from 'next/navigation';
import config from '@payload-config';
import { applyLocaleFiltering, formatAdminURL } from 'payload/shared';
import * as qs from 'qs-esm';
import React from 'react';
import { probeNeonHasPayloadUser } from './neon-user-probe.js';
import { getDefaultAdminLandingPath } from './admin-default-route.js';
import { markVercelKnownHasUser } from './payload-vercel-known-user.js';

type AdminPageProps = {
  config: typeof config;
  importMap: Record<string, unknown>;
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

async function renderForgotView(props: AdminPageProps) {
  const cfg = await props.config;
  const params = await props.params;
  const segments = ['forgot'];
  const searchParams = await props.searchParams;
  const adminRoute = cfg.routes.admin;
  const currentRoute = formatAdminURL({
    adminRoute,
    path: `/${segments.join('/')}`,
  });
  const queryString = `${qs.stringify(searchParams ?? {}, { addQueryPrefix: true })}`;

  const { cookies, locale, permissions, req } = await initReq({
    configPromise: props.config,
    importMap: props.importMap,
    key: 'initPage',
    overrides: {
      fallbackLocale: false,
      req: {
        query: qs.parse(queryString, {
          depth: 10,
          ignoreQueryPrefix: true,
        }),
      },
      urlSuffix: `${currentRoute}${searchParams ? queryString : ''}`,
    },
  });

  if (req.user) {
    redirect(getDefaultAdminLandingPath(req.user));
  }

  const clientConfig = getClientConfig({
    config: cfg,
    i18n: req.i18n,
    importMap: props.importMap,
    user: req.user as unknown as Parameters<typeof getClientConfig>[0]['user'],
  });

  await applyLocaleFiltering({
    clientConfig,
    config: cfg,
    req,
  });

  const visibleEntities = getVisibleEntities({ req });

  const RenderedView = RenderServerComponent({
    clientProps: {
      browseByFolderSlugs: [],
      clientConfig,
      viewType: 'forgot',
    },
    Fallback: ForgotPasswordView as React.ComponentType<
      Record<string, unknown>
    >,
    importMap: props.importMap,
    serverProps: {
      clientConfig,
      i18n: req.i18n,
      importMap: props.importMap,
      initPageResult: {
        cookies,
        languageOptions: [],
        locale,
        permissions,
        req,
        translations: req.i18n.translations,
        visibleEntities,
      },
      params,
      payload: req.payload,
      searchParams,
    },
  });

  return (
    <PageConfigProvider config={clientConfig}>
      <MinimalTemplate className="forgot-password">
        {RenderedView}
      </MinimalTemplate>
    </PageConfigProvider>
  );
}

export async function payloadAdminForgotPage(
  props: AdminPageProps
): Promise<React.ReactElement> {
  if (process.env.VERCEL) {
    const hasUser = await probeNeonHasPayloadUser();
    if (hasUser === false) {
      redirect(
        formatAdminURL({
          adminRoute: (await props.config).routes.admin,
          path: (await props.config).admin.routes.createFirstUser,
        })
      );
    }
    if (hasUser === true) {
      markVercelKnownHasUser();
    }
    return renderForgotView(props);
  }

  return RootPage({
    ...props,
    params: Promise.resolve({ segments: ['forgot'] }),
  }) as Promise<React.ReactElement>;
}
