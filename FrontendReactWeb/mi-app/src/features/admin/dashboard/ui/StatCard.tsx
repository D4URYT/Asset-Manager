import {
  Users, DollarSign, FileText, Clock, Shield, AlertTriangle,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import type { StatCard as StatCardType } from '../types/dashboard.types';

const iconMap = {
  users:      { Icon: Users,         color: 'var(--color-primary-light)', bg: 'var(--color-primary-soft)' },
  revenue:    { Icon: DollarSign,    color: 'var(--color-success)',       bg: 'var(--color-success-soft)' },
  invoices:   { Icon: FileText,      color: 'var(--color-primary-light)', bg: 'var(--color-primary-soft)' },
  pending:    { Icon: Clock,         color: 'var(--color-warning)',       bg: 'var(--color-warning-soft)' },
  moderators: { Icon: Shield,        color: 'var(--color-primary)',       bg: 'var(--color-primary-soft)' },
  overdue:    { Icon: AlertTriangle, color: 'var(--color-error)',         bg: 'var(--color-error-soft)'   },
};

export function StatCard({ item }: { item: StatCardType }) {
  const { Icon, color, bg } = iconMap[item.type];
  const isPositive = item.change > 0;
  const isNeutral = item.change === 0;

  const changeColor = isNeutral ? 'var(--color-text-disabled)'
    : isPositive ? 'var(--color-success)' : 'var(--color-error)';
  const changeBg = isNeutral ? 'var(--color-bg-alt)'
    : isPositive ? 'var(--color-success-soft)' : 'var(--color-error-soft)';
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <div style={{
      background: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      transition: 'box-shadow .2s, transform .2s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-lg)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={color} strokeWidth={2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: changeBg, borderRadius: 'var(--radius-full)', padding: '3px 8px' }}>
          <TrendIcon size={11} color={changeColor} strokeWidth={2.5} />
          <span style={{ fontSize: 11, fontWeight: 600, color: changeColor }}>
            {isNeutral ? '-' : `${isPositive ? '+' : ''}${item.change}%`}
          </span>
        </div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.5px' }}>{item.value}</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)' }}>{item.label}</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>{item.changeLabel}</div>
    </div>
  );
}
