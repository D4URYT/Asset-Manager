import { Shield, ChevronRight } from 'lucide-react';
import type { RecentUser } from '../types/dashboard.types';

const roleConfig = {
  admin:     { label: 'Admin',      color: 'var(--color-primary)',       bg: 'var(--color-primary-soft)' },
  moderator: { label: 'Moderador',  color: 'var(--color-primary-light)', bg: '#EFF6FF' },
  user:      { label: 'Usuario',    color: 'var(--color-text-secondary)', bg: 'var(--color-bg-alt)' },
};

const statusConfig = {
  active:    { label: 'Activo',     color: 'var(--color-success)',      dot: 'var(--color-success)' },
  inactive:  { label: 'Inactivo',   color: 'var(--color-text-disabled)', dot: 'var(--color-text-disabled)' },
  suspended: { label: 'Suspendido', color: 'var(--color-error)',        dot: 'var(--color-error)' },
};

export function UserRow({ user, onPress }: { user: RecentUser; onPress?: (u: RecentUser) => void }) {
  const role   = roleConfig[user.role];
  const status = statusConfig[user.status];
  const initials = user.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <div
      onClick={() => onPress?.(user)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        cursor: 'pointer',
        transition: 'background .15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-alt)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'var(--color-primary-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>{initials}</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.name}
          </span>
          {user.role === 'moderator' && <Shield size={12} color="var(--color-primary-light)" strokeWidth={2} />}
        </div>
        <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>{user.email}</span>
      </div>

      {/* Role + Status */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: role.color, background: role.bg, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
          {role.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: status.dot }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: status.color }}>{status.label}</span>
        </div>
      </div>

      <ChevronRight size={14} color="var(--color-text-disabled)" strokeWidth={2} />
    </div>
  );
}
