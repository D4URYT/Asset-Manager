import { BarChart2 } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import type { StatCard as StatCardType } from '../types/dashboard.types';

export function StatsSection({ stats }: { stats: StatCardType[] }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <BarChart2 size={16} color="var(--color-primary)" strokeWidth={2} />
        <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Resumen General</h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
      }}>
        {stats.map(item => <StatCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}