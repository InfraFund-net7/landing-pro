/**
 * Renders Payload admin login without RootPage dbHasUser → create-first-user redirect
 * (bundled RootPage on Vercel does not reliably see globalThis / patch).
 */
import { PageConfigProvider } from '@payloadcms/ui';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';
import { getVisibleEntities } from '@payloadcms/ui/shared';
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig';
import { initReq } from 'payload-init-req';
import { MinimalTemplate } from '@payloadcms/next/templates';
import { LoginView, RootPage } from '@payloadcms/next/views';
import { redirect } from 'next/navigation';
import config from '@payload-config';
import { applyLocaleFiltering, formatAdminURL } from 'payload/shared';
import * as qs from 'qs-esm';
import React from 'react';
import { probeNeonHasPayloadUser } from './neon-user-probe.js';
import { resolveAdminRedirectPath } from './admin-default-route.js';
import { markVercelKnownHasUser } from './payload-vercel-known-user.js';

type AdminPageProps = {
  config: typeof config;
  importMap: Record<string, unknown>;
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

async function renderLoginView(props: AdminPageProps) {
  const cfg = await props.config;
  const params = await props.params;
  const segments = ['login'];
  const searchParams = await props.searchParams;
  const signedOut = searchParams?.signedOut === '1';
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

  if (req.user && !signedOut) {
    const redirectParam =
      typeof searchParams?.redirect === 'string'
        ? searchParams.redirect
        : undefined;
    redirect(resolveAdminRedirectPath(req.user, redirectParam));
  }

  const viewActions = [...(cfg?.admin?.components?.actions || [])];
  const clientConfig = getClientConfig({
    config: cfg,
    i18n: req.i18n,
    importMap: props.importMap,
    // RootPage passes req.user (null when logged out); types only list true | User.
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
      viewType: 'login',
    },
    Fallback: LoginView as React.ComponentType<Record<string, unknown>>,
    importMap: props.importMap,
    serverProps: {
      clientConfig,
      i18n: req.i18n,
      importMap: props.importMap,
      initPageResult: {
        cookies,
        languageOptions: Object.entries(
          req.payload.config.i18n.supportedLanguages || {}
        ).reduce<
          Array<{
            label: string;
            value: string;
          }>
        >((acc, [language, languageConfig]) => {
          if (
            Object.keys(req.payload.config.i18n.supportedLanguages).includes(
              language
            )
          ) {
            acc.push({
              label: languageConfig.translations.general.thisLanguage,
              value: language,
            });
          }
          return acc;
        }, []),
        locale,
        permissions,
        req,
        translations: req.i18n.translations,
        visibleEntities,
      },
      params,
      payload: req.payload,
      searchParams,
      viewActions,
    },
  });

  return (
    <PageConfigProvider config={clientConfig}>
      <MinimalTemplate className="login">{RenderedView}</MinimalTemplate>
    </PageConfigProvider>
  );
}

export async function payloadAdminLoginPage(
  props: AdminPageProps
): Promise<React.ReactElement> {
  if (process.env.VERCEL) {
    const hasUser = await probeNeonHasPayloadUser();
    if (hasUser === false) {
      const cfg = await props.config;
      redirect(
        formatAdminURL({
          adminRoute: cfg.routes.admin,
          path: cfg.admin.routes.createFirstUser,
        })
      );
    }
    if (hasUser === true) {
      markVercelKnownHasUser();
      process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER = '1';
      console.log('[payload] admin login page (bypass RootPage)');
    }
    return renderLoginView(props);
  }

  return RootPage({
    ...props,
    params: Promise.resolve({ segments: ['login'] }),
  }) as Promise<React.ReactElement>;
}
