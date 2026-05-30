declare module 'payload-init-req' {
  export function initReq(args: unknown): Promise<{
    cookies: unknown;
    locale: string;
    permissions: unknown;
    req: import('payload').PayloadRequest;
  }>;
}
