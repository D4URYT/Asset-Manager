import { CheckCircle, UserPlus, AlertCircle, ShieldCheck, Flag } from 'lucide-react';
import type { RecentActivity } from '../types/dashboard.types';

const activityConfig = {
  invoice_paid:    { Icon: CheckCircle, color: 'var(--color-success)',       bg: 'var(--color-success-soft)' },
  user_created:    { Icon: UserPlus,    color: 'var(--color-primary-light)', bg: 'var(--color-primary-soft)' },
  invoice_overdue: { Icon: AlertCircle, color: 'var(--color-error)',         bg: 'var(--color-error-soft)'   },
  moderator_added: { Icon: ShieldCheck, color: 'var(--color-primary)',       bg: 'var(--color-primary-soft)' },
  report_flagged:  { Icon: Flag,        color: 'var(--color-warning)',       bg: 'var(--color-warning-soft)' },
};

export function ActivityItem({ activity, isLast }: { activity: RecentActivity; isLast?: boolean }) {
  const { Icon, color, bg } = activityConfig[activity.type];

  return (
    <div style={{ display: 'flex', gap: 14, paddingBottom: isLast ? 0 : 16 }}>
      {/* Timeline column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={14} color={color} strokeWidth={2} />
        </div>
        {!isLast && <div style={{ width: 1.5, flex: 1, background: 'var(--color-border)', marginTop: 4 }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{activity.description}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{activity.user}</div>
        <div style={{ fontSize: 11, color: 'var(--color-text-disabled)', marginTop: 3 }}>{activity.timestamp}</div>
      </div>
    </div>
  );
}