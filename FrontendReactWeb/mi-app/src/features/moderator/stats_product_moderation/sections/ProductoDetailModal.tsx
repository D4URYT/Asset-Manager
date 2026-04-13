"use client";

import React, { useState } from 'react';
import { Producto } from '../types/productos.types';
import { colors, categoriaConfig } from '../theme/productos.theme';
import { EstadoBadge, CategoriaBadge, StarRating, CrecimientoBadge } from '../ui/ProductoUI';

const CloseIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

type TabId = 'resumen' | 'ventas' | 'resenas';

const tabs: { id: TabId; label: string }[] = [
  { id: 'resumen', label: 'Resumen'   },
  { id: 'ventas',  label: 'Ventas'    },
  { id: 'resenas', label: 'Reseñas'   },
];

const sl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 };

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 13px', background: colors.bg.secondary, borderRadius: 8, border: `1px solid ${colors.border}`, marginBottom: 5 }}>
      <span style={{ fontSize: 13, color: colors.text.secondary }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: valueColor || colors.text.primary }}>{value}</span>
    </div>
  );
}

function BarChart({ data }: { data: { mes: string; ventas: number; ingresos: number }[] }) {
  const max = Math.max(...data.map(d => d.ventas));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 90, padding: '0 2px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 8.5, color: colors.text.disabled }}>{d.ventas >= 1000 ? `${(d.ventas / 1000).toFixed(1)}k` : d.ventas}</span>
          <div style={{ width: '100%', backgroundColor: i === data.length - 1 ? colors.brand[600] : colors.brand[100], borderRadius: '3px 3px 0 0', height: `${Math.max(3, (d.ventas / max) * 68)}px` }} />
          <span style={{ fontSize: 8.5, color: colors.text.disabled }}>{d.mes}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductoDetailModal({ producto, isOpen, onClose }: {
  producto: Producto | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<TabId>('resumen');

  if (!isOpen || !producto) return null;
  const p = producto;
  const catColor = categoriaConfig[p.categoria].color;
  const maxVentas = Math.max(...p.ventasMensuales.map(v => v.ventas));

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', zIndex: 50, backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90%', maxWidth: 640, maxHeight: '90vh', backgroundColor: colors.bg.secondary, borderRadius: 16, zIndex: 51, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '20px 22px 14px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 13 }}>
            <div style={{ flex: 1, paddingRight: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, flexWrap: 'wrap' }}>
                <CategoriaBadge cat={p.categoria} />
                <EstadoBadge estado={p.estado} />
                <CrecimientoBadge valor={p.crecimiento} />
              </div>
              <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: colors.text.primary, lineHeight: 1.3 }}>{p.nombre}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: p.empresaColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7.5, fontWeight: 800, color: '#fff' }}>{p.empresa.slice(0, 2).toUpperCase()}</div>
                <span style={{ fontSize: 12.5, color: colors.text.secondary }}>{p.empresa}</span>
                <span style={{ fontSize: 12, color: colors.text.disabled }}>·</span>
                <StarRating valor={p.calificacion} small />
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text.secondary, padding: 4, borderRadius: 6, display: 'flex', flexShrink: 0 }}><CloseIcon /></button>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 13 }}>
            {[
              { label: 'Ventas',    value: p.totalVentas.toLocaleString(),                                                                            color: colors.brand[600] },
              { label: 'Ingresos',  value: `RD$ ${p.totalIngresos >= 1000000 ? (p.totalIngresos/1000000).toFixed(2)+'M' : (p.totalIngresos/1000).toFixed(0)+'k'}`, color: '#10B981' },
              { label: 'Precio',    value: `RD$ ${p.precio.toLocaleString()}`,                                                                         color: colors.text.primary },
              { label: 'Vistas',    value: p.totalVistas >= 1000 ? `${(p.totalVistas/1000).toFixed(0)}k` : String(p.totalVistas),                      color: colors.brand[400] },
            ].map(k => (
              <div key={k.label} style={{ background: colors.bg.alt, borderRadius: 8, padding: '8px 13px', border: `1px solid ${colors.border}`, flex: 1, minWidth: 90 }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: k.color }}>{k.value}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10.5, color: colors.text.secondary }}>{k.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '5px 14px', border: 'none', borderRadius: 8, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .14s', backgroundColor: tab === t.id ? colors.brand[600] : 'transparent', color: tab === t.id ? '#fff' : colors.text.secondary }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 22 }}>

          {/* Resumen */}
          {tab === 'resumen' && (
            <div>
              <p style={sl}>Métricas del producto</p>
              <InfoRow label="Tasa de conversión" value={`${p.tasaConversion}%`} valueColor={p.tasaConversion >= 6 ? '#10B981' : p.tasaConversion >= 4 ? '#F59E0B' : '#EF4444'} />
              <InfoRow label="Tasa de devolución" value={`${p.tasaDevolucion}%`} valueColor={p.tasaDevolucion > 8 ? '#EF4444' : p.tasaDevolucion > 4 ? '#F59E0B' : '#10B981'} />
              <InfoRow label="Stock disponible"   value={p.stock === 0 ? 'Sin stock' : `${p.stock} unidades`} valueColor={p.stock === 0 ? '#EF4444' : p.stock < 50 ? '#F59E0B' : '#10B981'} />
              <InfoRow label="Total vistas"        value={p.totalVistas.toLocaleString()} />
              <InfoRow label="Ingreso por unidad"  value={`RD$ ${p.precio.toLocaleString()}`} />
              <InfoRow label="Total reseñas"       value={p.totalResenas.toLocaleString()} />
              <InfoRow label="Fecha de lanzamiento" value={new Date(p.fechaLanzamiento).toLocaleDateString('es-DO', { day: '2-digit', month: 'long', year: 'numeric' })} />
            </div>
          )}

          {/* Ventas */}
          {tab === 'ventas' && (
            <div>
              <p style={sl}>Ventas mensuales (últimos 8 meses)</p>
              <div style={{ background: colors.bg.alt, borderRadius: 10, padding: '16px 12px', border: `1px solid ${colors.border}`, marginBottom: 16 }}>
                <BarChart data={p.ventasMensuales} />
              </div>
              <p style={{ ...sl, marginBottom: 8 }}>Detalle por mes</p>
              {p.ventasMensuales.slice().reverse().slice(0, 6).map(m => (
                <div key={m.mes} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: colors.bg.secondary, borderRadius: 8, border: `1px solid ${colors.border}`, marginBottom: 5 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: colors.text.secondary, width: 34 }}>{m.mes}</span>
                  <div style={{ flex: 1, height: 6, backgroundColor: colors.bg.alt, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: colors.brand[400], borderRadius: 3, width: `${(m.ventas / maxVentas) * 100}%` }} />
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: colors.text.primary, minWidth: 50, textAlign: 'right' }}>{m.ventas.toLocaleString()}</span>
                  <span style={{ fontSize: 11.5, color: '#10B981', fontWeight: 600, minWidth: 70, textAlign: 'right' }}>RD$ {(m.ingresos / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          )}

          {/* Reseñas */}
          {tab === 'resenas' && (
            <div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', padding: '16px 18px', background: colors.bg.alt, borderRadius: 12, border: `1px solid ${colors.border}`, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 42, fontWeight: 800, color: colors.text.primary, lineHeight: 1 }}>{p.calificacion.toFixed(1)}</p>
                  <div style={{ margin: '6px 0 4px', display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(p.calificacion) ? '#F59E0B' : '#E2E8F0'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: colors.text.disabled }}>{p.totalResenas.toLocaleString()} reseñas</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[...p.resenasDist].reverse().map(r => {
                    const max = Math.max(...p.resenasDist.map(x => x.cantidad));
                    const pct = Math.round((r.cantidad / p.totalResenas) * 100);
                    return (
                      <div key={r.estrellas} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: colors.text.secondary, width: 10 }}>{r.estrellas}</span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        <div style={{ flex: 1, height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', backgroundColor: '#F59E0B', borderRadius: 4, width: `${(r.cantidad / max) * 100}%` }} />
                        </div>
                        <span style={{ fontSize: 11, color: colors.text.disabled, width: 28, textAlign: 'right' }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}