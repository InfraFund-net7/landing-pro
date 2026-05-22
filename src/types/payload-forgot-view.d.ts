declare module 'payload-forgot-view' {
  import type React from 'react';

  export const forgotPasswordBaseClass: string;
  export function ForgotPasswordView(props: {
    initPageResult: unknown;
  }): React.ReactElement;
}
