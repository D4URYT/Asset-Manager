import { Users, ArrowRight } from 'lucide-react';
import { UserRow } from '../ui/UserRow';
import type { RecentUser } from '../types/dashboard.types';

interface UsersSectionProps {
  users: RecentUser[];
  onSeeAll?: () => void;
  onUserPress?: (u: RecentUser) => void;
}

export function UsersSection({ users, onSeeAll, onUserPress }: UsersSectionProps) {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={16} color="var(--color-primary)" strokeWidth={2} />
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Usuarios Recientes</h2>
        </div>
        <button
          onClick={onSeeAll}
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontSize: 13, fontWeight: 500, padding: 0 }}
        >
          Ver todos <ArrowRight size={13} strokeWidth={2} />
        </button>
      </div>

      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {users.map((user, i) => (
          <div key={user.id} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
            <UserRow user={user} onPress={onUserPress} />
          </div>
        ))}
      </div>
    </section>
  );
}