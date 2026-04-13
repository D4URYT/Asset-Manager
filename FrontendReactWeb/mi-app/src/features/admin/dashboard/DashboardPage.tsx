'use client';

import { Shield, Bell, Settings, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useDashboard } from './hooks/useDashboard';
import { StatsSection } from './sections/StatsSection';
import { ChartsSection } from './sections/ChartsSection';
import { UsersSection } from './sections/UsersSection';
import { RecentActivitySection } from './sections/RecentActivitySection';
import { cssVariables } from './theme/dashboardTheme';
import type { Period } from './types/dashboard.types';
import { AdminSidebar } from './ui/AdminSidebar';
import { ADMIN_NAV_ITEMS } from './data/adminNavigation.data';
import { colors, font } from '../users/theme/tokens';

const PERIODS: { key: Period; label: string }[] = [
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' },
  { key: 'year', label: 'Año' },
];

export default function DashboardPage() {
  const { data, isLoading, isRefreshing, error, refresh, selectedPeriod, setSelectedPeriod } = useDashboard();

  // ----- Loading -----
  if (isLoading && !data) {
    return (
      <>
        <style>{cssVariables}</style>
        <div style={{ minHeight: '100vh', background: colors.bg.primary, fontFamily: font.family, display: 'flex' }}>
          <AdminSidebar navItems={ADMIN_NAV_ITEMS} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, border: '3px solid var(--color-primary-soft)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Cargando dashboard...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ----- Error -----
  if (error && !data) {
    return (
      <>
        <style>{cssVariables}</style>
        <div style={{ minHeight: '100vh', background: colors.bg.primary, fontFamily: font.family, display: 'flex' }}>
          <AdminSidebar navItems={ADMIN_NAV_ITEMS} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <WifiOff size={40} color="var(--color-error)" strokeWidth={1.5} />
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Error de conexión</p>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>{error}</p>
              <button onClick={refresh} style={{ marginTop: 8, padding: '10px 24px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ----- Main -----
  return (
    <>
      <style>{cssVariables + `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: ${font.family}; background: ${colors.bg.primary}; color: var(--color-text-primary); }
        button { font-family: inherit; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .dash-main { animation: fadeIn .35s ease; }
      `}</style>

      <div style={{ minHeight: '100vh', background: colors.bg.primary, fontFamily: font.family, display: 'flex' }}>
        <AdminSidebar navItems={ADMIN_NAV_ITEMS} />

        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* ----- Topbar ----- */}
          <header style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border)',
            padding: '0 24px',
            height: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.3px', lineHeight: 1 }}>Dashboard</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-disabled)', fontWeight: 500, marginTop: 1 }}>Panel de Administrador</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* System health */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--color-success-soft)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                <Wifi size={12} color="var(--color-success)" strokeWidth={2} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-success)' }}>{data?.systemHealth}%</span>
              </div>

              {/* Refresh */}
              <button
                onClick={refresh}
                disabled={isRefreshing}
                title="Actualizar"
                style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-alt)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              >
                <RefreshCw size={16} color="var(--color-text-secondary)" strokeWidth={2} style={isRefreshing ? { animation: 'spin .8s linear infinite' } : undefined} />
              </button>

              <button title="Notificaciones" style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-alt)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                <Bell size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              </button>

              <button title="Configuración" style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-alt)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                <Settings size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              </button>
            </div>
          </header>

          {/* ----- Subbar: period + quick stats ----- */}
          <div style={{
            background: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border)',
            padding: '10px 24px',
            display: 'flex', alignItems: 'center', gap: 20,
          }}>
            {/* Period tabs */}
            <div style={{ display: 'flex', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: 3, gap: 2 }}>
              {PERIODS.map(p => (
                <button
                  key={p.key}
                  onClick={() => setSelectedPeriod(p.key)}
                  style={{
                    padding: '5px 14px',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    fontWeight: selectedPeriod === p.key ? 600 : 500,
                    color: selectedPeriod === p.key ? 'var(--color-text-primary)' : 'var(--color-text-disabled)',
                    background: selectedPeriod === p.key ? 'var(--color-bg-card)' : 'transparent',
                    boxShadow: selectedPeriod === p.key ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{ width: 1, height: 20, background: 'var(--color-border)' }} />

            {/* Quick counts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary)' }}>
                  {data?.totalUsers?.toLocaleString() ?? '--'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>usuarios</span>
              </div>
              <div style={{ width: 1, height: 14, background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary)' }}>
                  {data?.totalModerators ?? '--'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>moderadores</span>
              </div>
            </div>
          </div>

          {/* ----- Content ----- */}
          {data && (
            <main className="dash-main" style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <StatsSection stats={data.stats} />
              <ChartsSection data={data.chartData} />

              {/* Two-column: users + activity */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <UsersSection
                  users={data.recentUsers}
                  onSeeAll={() => { /* router.push('/admin/users') */ }}
                  onUserPress={(u) => { /* router.push(`/admin/users/${u.id}`) */ }}
                />
                <RecentActivitySection
                  activities={data.recentActivity}
                  onSeeAll={() => { /* router.push('/admin/activity') */ }}
                />
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  );
}
