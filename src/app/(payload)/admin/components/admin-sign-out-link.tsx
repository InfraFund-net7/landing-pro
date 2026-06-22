import AdminSignOutButton from '@/app/(payload)/admin/components/admin-sign-out-button';
import type { CSSProperties } from 'react';

const adminNavLinkStyle: CSSProperties = {
  color: '#A7B7D9',
  textDecoration: 'none',
  fontSize: 13,
  border: '1px solid #2A3B61',
  borderRadius: 8,
  padding: '8px 10px',
};

type AdminSignOutLinkProps = {
  style?: CSSProperties;
};

export default function AdminSignOutLink({ style }: AdminSignOutLinkProps) {
  return (
    <AdminSignOutButton
      style={{
        ...adminNavLinkStyle,
        ...style,
        background: 'transparent',
        cursor: 'pointer',
        font: 'inherit',
      }}
    >
      Sign out
    </AdminSignOutButton>
  );
}
