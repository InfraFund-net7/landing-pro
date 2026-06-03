/**
 * Renders Payload admin dashboard at /admin without RootPage notFound()
 * (logged-in users + empty segments can miss DefaultView when Drizzle findOne fails).
 */
import { PageConfigProvider } from '@payloadcms/ui';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';
import { getVisibleEntities } from '@payloadcms/ui/shared';
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { DashboardView } from '@payloadcms/next/views';
import { initReq } from 'payload-init-req';
import { redirect } from 'next/navigation';
import config from '@payload-config';
import type { SanitizedPermissions } from 'payload';
import { applyLocaleFiltering, formatAdminURL } from 'payload/shared';
import * as qs from 'qs-esm';
import React from 'react';
import { markVercelKnownHasUser } from './payload-vercel-known-user.js';

type AdminPageProps = {
  config: typeof config;
  importMap: Record<string, unknown>;
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export async function payloadAdminDashboardPage(
  props: AdminPageProps
): Promise<React.ReactElement> {
  markVercelKnownHasUser();
  process.env.PAYLOAD_VERCEL_KNOWN_HAS_USER = '1';
  console.log('[payload] admin dashboard page (bypass RootPage)');

  const cfg = await props.config;
  const searchParams = await props.searchParams;
  const adminRoute = cfg.routes.admin;
  const currentRoute = formatAdminURL({ adminRoute, path: null });
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

  if (!req.user) {
    redirect(
      formatAdminURL({
        adminRoute,
        path: cfg.admin.routes.login,
      })
    );
  }

  const viewActions = [...(cfg?.admin?.components?.actions || [])];
  const clientConfig = getClientConfig({
    config: cfg,
    i18n: req.i18n,
    importMap: props.importMap,
    user: req.user,
  });

  await applyLocaleFiltering({
    clientConfig,
    config: cfg,
    req,
  });

  const visibleEntities = getVisibleEntities({ req });
  const params = await props.params;

  const RenderedView = RenderServerComponent({
    clientProps: {
      browseByFolderSlugs: [],
      clientConfig,
      viewType: 'dashboard',
    },
    Fallback: DashboardView as React.ComponentType<Record<string, unknown>>,
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
      <DefaultTemplate
        i18n={req.i18n}
        params={params}
        payload={req.payload}
        permissions={permissions as SanitizedPermissions}
        req={req}
        searchParams={searchParams}
        user={req.user}
        viewActions={viewActions}
        viewType="dashboard"
        visibleEntities={{
          collections: visibleEntities?.collections,
          globals: visibleEntities?.globals,
        }}
      >
        {RenderedView}
      </DefaultTemplate>
    </PageConfigProvider>
  );
}
