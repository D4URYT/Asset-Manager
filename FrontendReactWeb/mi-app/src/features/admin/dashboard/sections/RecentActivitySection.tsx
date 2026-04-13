import { Activity, ArrowRight } from 'lucide-react';
import { ActivityItem } from '../ui/ActivityItem';
import type { RecentActivity } from '../types/dashboard.types';

interface RecentActivitySectionProps {
  activities: RecentActivity[];
  onSeeAll?: () => void;
}

export function RecentActivitySection({ activities, onSeeAll }: RecentActivitySectionProps) {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={16} color="var(--color-primary)" strokeWidth={2} />
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Actividad Reciente</h2>
        </div>
        <button
          onClick={onSeeAll}
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontSize: 13, fontWeight: 500, padding: 0 }}
        >
          Ver todo <ArrowRight size={13} strokeWidth={2} />
        </button>
      </div>

      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px 20px 8px', boxShadow: 'var(--shadow-sm)' }}>
        {activities.map((activity, i) => (
          <ActivityItem key={activity.id} activity={activity} isLast={i === activities.length - 1} />
        ))}
      </div>
    </section>
  );
}