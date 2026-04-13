"use client";

import React, { useState } from 'react';
import { Empresa } from '../types/estadisticas.types';
import { colors, categoriaConfig } from '../theme/estadisticas.theme';
import { EmpresaAvatar, EstadoBadge, StarRating, CrecimientoBadge } from '../ui/EmpresaUI';

const CloseIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconChart = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconStar2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const IconInfo = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

type TabId = 'resumen' | 'ventas' | 'productos';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'resumen',   label: 'Resumen',   icon: <IconInfo />  },
  { id: 'ventas',    label: 'Ventas',    icon: <IconChart /> },
  { id: 'productos', label: 'Top Productos', icon: <IconStar2 /> },
];

const sl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 };

function BarChart({ data }: { data: { mes: string; ventas: number }[] }) {
  const max = Math.max(...data.map(d => d.ventas));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 9, color: colors.text.disabled }}>{d.ventas >= 1000 ? `${(d.ventas/1000).toFixed(1)}k` : d.ventas}</span>
          <div style={{ width: '100%', backgroundColor: i === data.length - 1 ? colors.brand[600] : colors.brand[100], borderRadius: '3px 3px 0 0', height: `${(d.ventas / max) * 72}px`, minHeight: 4, transition: 'height .3s' }} />
          <span style={{ fontSize: 9, color: colors.text.disabled }}>{d.mes}</span>
        </div>
      ))}
    </div>
  );
}

function MetricRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 13px', background: colors.bg.secondary, borderRadius: 8, border: `1px solid ${colors.border}`, marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: colors.text.secondary }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: colors.text.primary }}>{value}</span>
        {sub && <p style={{ margin: 0, fontSize: 10.5, color: colors.text.disabled }}>{sub}</p>}
      </div>
    </div>
  );
}

export function EmpresaDetailModal({ empresa, isOpen, onClose }: {
  empresa: Empresa | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<TabId>('resumen');

  if (!isOpen || !empresa) return null;
  const e = empresa;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', zIndex: 50, backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90%', maxWidth: 640, maxHeight: '90vh', backgroundColor: colors.bg.secondary, borderRadius: 16, zIndex: 51, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '20px 22px 14px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <EmpresaAvatar iniciales={e.iniciales} color={e.colorAvatar} size={50} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.text.primary }}>{e.nombre}</h2>
                  <EstadoBadge estado={e.estado} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: colors.text.secondary, backgroundColor: colors.bg.alt, padding: '2px 8px', borderRadius: 6, border: `1px solid ${colors.border}` }}>{categoriaConfig[e.categoria].label}</span>
                  <StarRating valor={e.calificacion} />
                  <CrecimientoBadge valor={e.crecimiento} />
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.secondary, padding: 4, borderRadius: 6, display: 'flex' }}><CloseIcon /></button>
          </div>
          {/* Quick KPIs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            {[
              { label: 'Ventas', val: e.totalVentas.toLocaleString(), color: colors.brand[600] },
              { label: 'Ingresos', val: `RD$ ${(e.totalIngresos/1000000).toFixed(2)}M`, color: '#10B981' },
              { label: 'Clientes', val: e.clientesUnicos.toLocaleString(), color: colors.brand[400] },
              { label: 'Productos', val: String(e.totalProductos), color: '#F59E0B' },
            ].map(k => (
              <div key={k.label} style={{ background: colors.bg.alt, borderRadius: 8, padding: '8px 14px', border: `1px solid ${colors.border}`, flex: 1, minWidth: 90 }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: k.color }}>{k.val}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10.5, color: colors.text.secondary }}>{k.label}</p>
              </div>
            ))}
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 13px', border: 'none', borderRadius: 8, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .14s', backgroundColor: tab === t.id ? colors.brand[600] : 'transparent', color: tab === t.id ? '#fff' : colors.text.secondary }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>

          {/* Resumen */}
          {tab === 'resumen' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={sl}>Datos generales</p>
              <MetricRow label="Fecha de registro"    value={new Date(e.fechaRegistro).toLocaleDateString('es-DO', { day:'2-digit', month:'long', year:'numeric' })} />
              <MetricRow label="Total reseñas"         value={e.totalResenas.toLocaleString()} />
              <MetricRow label="Tasa de devolución"   value={`${e.tasaDevolucion}%`} sub={e.tasaDevolucion > 5 ? 'Alta — revisar' : 'Normal'} />
              <MetricRow label="Crecimiento periodo"  value={`${e.crecimiento > 0 ? '+' : ''}${e.crecimiento}%`} />
              <MetricRow label="Promedio por venta"   value={`RD$ ${Math.round(e.totalIngresos / e.totalVentas).toLocaleString()}`} />
              <MetricRow label="Ingresos por cliente" value={`RD$ ${Math.round(e.totalIngresos / e.clientesUnicos).toLocaleString()}`} />
            </div>
          )}

          {/* Ventas */}
          {tab === 'ventas' && (
            <div>
              <p style={sl}>Ventas mensuales (últimos 8 meses)</p>
              <div style={{ background: colors.bg.alt, borderRadius: 10, padding: '16px 14px', border: `1px solid ${colors.border}`, marginBottom: 16 }}>
                <BarChart data={e.ventasMensuales} />
              </div>
              <p style={{ ...sl, marginBottom: 8 }}>Detalle por mes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {e.ventasMensuales.slice().reverse().slice(0, 5).map(m => (
                  <div key={m.mes} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 13px', background: colors.bg.secondary, borderRadius: 8, border: `1px solid ${colors.border}` }}>
                    <span style={{ fontSize: 13, color: colors.text.secondary, fontWeight: 500, width: 36 }}>{m.mes}</span>
                    <div style={{ flex: 1, marginLeft: 12, height: 6, backgroundColor: colors.bg.alt, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', backgroundColor: colors.brand[400], borderRadius: 3, width: `${(m.ventas / Math.max(...e.ventasMensuales.map(x=>x.ventas))) * 100}%` }} />
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: colors.text.primary, marginLeft: 12 }}>{m.ventas.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600, marginLeft: 10 }}>RD$ {(m.ingresos/1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productos */}
          {tab === 'productos' && (
            <div>
              <p style={sl}>Productos más vendidos</p>
              {e.productosTop.map((p, i) => {
                const maxU = Math.max(...e.productosTop.map(x => x.unidades));
                return (
                  <div key={p.id} style={{ background: colors.bg.secondary, border: `1px solid ${colors.border}`, borderRadius: 10, padding: '13px 15px', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: i === 0 ? '#FEF3C7' : colors.bg.alt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: i === 0 ? '#D97706' : colors.text.secondary, flexShrink: 0 }}>#{i+1}</div>
                      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: colors.text.primary, flex: 1 }}>{p.nombre}</p>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981' }}>RD$ {(p.ingresos/1000).toFixed(0)}k</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 6, backgroundColor: colors.bg.alt, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: i === 0 ? colors.brand[600] : colors.brand[400], borderRadius: 3, width: `${(p.unidades / maxU) * 100}%`, opacity: 1 - i * 0.1 }} />
                      </div>
                      <span style={{ fontSize: 11.5, color: colors.text.secondary, whiteSpace: 'nowrap' }}>{p.unidades.toLocaleString()} unidades</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}