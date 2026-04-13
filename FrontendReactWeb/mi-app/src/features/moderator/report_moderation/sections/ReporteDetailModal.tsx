"use client";

import React, { useState, useEffect } from 'react';
import { Reporte, EstadoReporte } from '../types/reportes.types';
import { colors, estadoConfig, categoriaConfig, prioridadConfig } from '../theme/reportes.theme';
import { EstadoBadge, PrioridadBadge } from '../ui/StatusBadge';

interface ReporteDetailModalProps {
  reporte: Reporte | null;
  isOpen: boolean;
  onClose: () => void;
  onCambiarEstado: (reporteId: string, nuevoEstado: EstadoReporte, nota: string) => void;
  onGuardarNota: (reporteId: string, nota: string) => void;
}

function formatFecha(iso: string) {
  return new Date(iso).toLocaleString('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitials(nombre: string) {
  return nombre.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

const CloseIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PackageIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NoteIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

type TabId = 'detalle' | 'usuario' | 'pedido' | 'historial';

export function ReporteDetailModal({
  reporte,
  isOpen,
  onClose,
  onCambiarEstado,
  onGuardarNota,
}: ReporteDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('detalle');
  const [nuevoEstado, setNuevoEstado] = useState<EstadoReporte | ''>('');
  const [notaCambio, setNotaCambio] = useState('');
  const [notaModerador, setNotaModerador] = useState('');
  const [notaGuardada, setNotaGuardada] = useState(false);

  useEffect(() => {
    if (reporte) {
      setNuevoEstado('');
      setNotaCambio('');
      setNotaModerador(reporte.notasModerador || '');
      setNotaGuardada(false);
    }
  }, [reporte]);

  if (!isOpen || !reporte) return null;

  const handleCambiarEstado = () => {
    if (!nuevoEstado) return;
    onCambiarEstado(reporte.id, nuevoEstado as EstadoReporte, notaCambio);
    setNuevoEstado('');
    setNotaCambio('');
  };

  const handleGuardarNota = () => {
    onGuardarNota(reporte.id, notaModerador);
    setNotaGuardada(true);
    setTimeout(() => setNotaGuardada(false), 2000);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'detalle', label: 'Detalle', icon: <NoteIcon /> },
    { id: 'usuario', label: 'Usuario', icon: <UserIcon /> },
    { id: 'pedido', label: 'Pedido', icon: <PackageIcon /> },
    { id: 'historial', label: 'Historial', icon: <HistoryIcon /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          zIndex: 50,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 680,
          maxHeight: '90vh',
          backgroundColor: colors.background.secondary,
          borderRadius: 16,
          zIndex: 51,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.background.secondary,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.brand[600],
                    backgroundColor: colors.brand[100],
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}
                >
                  {reporte.codigo}
                </span>
                <EstadoBadge estado={reporte.estado} />
                <PrioridadBadge prioridad={reporte.prioridad} />
              </div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: colors.text.primary, lineHeight: 1.3 }}>
                {reporte.titulo}
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: colors.text.secondary }}>
                {categoriaConfig[reporte.categoria].label} · Creado el {formatFecha(reporte.fechaCreacion)}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: colors.text.secondary,
                padding: 4,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                  backgroundColor: activeTab === tab.id ? colors.brand[600] : 'transparent',
                  color: activeTab === tab.id ? '#fff' : colors.text.secondary,
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* TAB: Detalle */}
          {activeTab === 'detalle' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Descripción del usuario
                </p>
                <div
                  style={{
                    padding: 16,
                    backgroundColor: colors.background.alt,
                    borderRadius: 10,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {reporte.descripcion}
                </div>
              </div>

              {/* Cambiar Estado */}
              <div>
                <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Cambiar estado del reporte
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {(Object.keys(estadoConfig) as EstadoReporte[]).map((estado) => {
                      const cfg = estadoConfig[estado];
                      const isSelected = nuevoEstado === estado;
                      const isCurrent = reporte.estado === estado;
                      return (
                        <button
                          key={estado}
                          onClick={() => setNuevoEstado(isSelected ? '' : estado)}
                          disabled={isCurrent}
                          style={{
                            padding: '7px 14px',
                            borderRadius: 8,
                            border: `2px solid ${isSelected ? cfg.color.main : colors.border}`,
                            backgroundColor: isSelected ? cfg.color.bg : 'transparent',
                            color: isCurrent ? colors.text.disabled : cfg.color.text,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: isCurrent ? 'not-allowed' : 'pointer',
                            fontFamily: 'inherit',
                            opacity: isCurrent ? 0.5 : 1,
                            transition: 'all 0.15s',
                          }}
                        >
                          {isCurrent ? `✓ ${cfg.label}` : cfg.label}
                        </button>
                      );
                    })}
                  </div>

                  {nuevoEstado && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                      <textarea
                        placeholder="Agrega una nota sobre este cambio de estado (opcional)..."
                        value={notaCambio}
                        onChange={(e) => setNotaCambio(e.target.value)}
                        rows={2}
                        style={{
                          padding: '10px 12px',
                          border: `1px solid ${colors.border}`,
                          borderRadius: 8,
                          fontSize: 13,
                          color: colors.text.primary,
                          fontFamily: 'inherit',
                          resize: 'none',
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={handleCambiarEstado}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: colors.brand[600],
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          alignSelf: 'flex-start',
                        }}
                      >
                        Aplicar cambio de estado
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nota moderador */}
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Notas del moderador
                </p>
                <textarea
                  placeholder="Escribe notas internas sobre este reporte..."
                  value={notaModerador}
                  onChange={(e) => setNotaModerador(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    color: colors.text.primary,
                    fontFamily: 'inherit',
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  onClick={handleGuardarNota}
                  style={{
                    marginTop: 8,
                    padding: '8px 18px',
                    backgroundColor: notaGuardada ? '#10B981' : colors.background.alt,
                    color: notaGuardada ? '#fff' : colors.text.primary,
                    border: `1px solid ${notaGuardada ? '#10B981' : colors.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  {notaGuardada ? 'Guardado' : 'Guardar nota'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: Usuario */}
          {activeTab === 'usuario' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 20,
                  backgroundColor: colors.background.alt,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: colors.brand[600],
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getInitials(reporte.usuario.nombre)}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text.primary }}>
                    {reporte.usuario.nombre}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: colors.text.secondary }}>
                    ID: {reporte.usuario.id}
                  </p>
                </div>
              </div>
              {[
                { label: 'Email', value: reporte.usuario.email },
                { label: 'Teléfono', value: reporte.usuario.telefono || 'No registrado' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: colors.background.secondary,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: colors.text.secondary }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.text.primary }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB: Pedido */}
          {activeTab === 'pedido' && (
            <div>
              {reporte.pedido ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      padding: '14px 16px',
                      backgroundColor: colors.brand[100],
                      borderRadius: 10,
                      border: `1px solid ${colors.brand[400]}22`,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 12, color: colors.brand[400], fontWeight: 600 }}>Número de Pedido</p>
                    <p style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 700, color: colors.brand[600], fontFamily: 'monospace' }}>
                      {reporte.pedido.numero}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: colors.text.secondary }}>
                      Realizado el {new Date(reporte.pedido.fecha).toLocaleDateString('es-DO', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  <div>
                    <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Productos
                    </p>
                    {reporte.pedido.productos.map((prod) => (
                      <div
                        key={prod.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          backgroundColor: colors.background.alt,
                          borderRadius: 8,
                          border: `1px solid ${colors.border}`,
                          marginBottom: 6,
                        }}
                      >
                        <div>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: colors.text.primary }}>{prod.nombre}</p>
                          <p style={{ margin: '2px 0 0', fontSize: 11, color: colors.text.secondary, fontFamily: 'monospace' }}>SKU: {prod.sku}</p>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 700, color: colors.text.primary }}>
                          RD$ {prod.precio.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      backgroundColor: colors.background.secondary,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>Total del pedido</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: colors.brand[600] }}>
                      RD$ {reporte.pedido.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 40, color: colors.text.disabled }}>
                  <p style={{ fontSize: 14 }}>Este reporte no tiene un pedido asociado</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: Historial */}
          {activeTab === 'historial' && (
            <div>
              {reporte.historial.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: colors.text.disabled }}>
                  <p style={{ fontSize: 14 }}>Sin cambios de estado registrados aún</p>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  {reporte.historial.map((item, index) => (
                    <div key={item.id} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: estadoConfig[item.estadoNuevo].color.main,
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                        {index < reporte.historial.length - 1 && (
                          <div style={{ width: 2, flex: 1, backgroundColor: colors.border, marginTop: 4 }} />
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          paddingBottom: 16,
                          borderBottom: index < reporte.historial.length - 1 ? 'none' : undefined,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <EstadoBadge estado={item.estadoNuevo} size="sm" />
                          <span style={{ fontSize: 11, color: colors.text.disabled }}>
                            por {item.moderador}
                          </span>
                          <span style={{ fontSize: 11, color: colors.text.disabled, marginLeft: 'auto' }}>
                            {formatFecha(item.fecha)}
                          </span>
                        </div>
                        {item.nota && (
                          <p
                            style={{
                              margin: '6px 0 0',
                              fontSize: 13,
                              color: colors.text.secondary,
                              lineHeight: 1.5,
                              padding: '8px 12px',
                              backgroundColor: colors.background.alt,
                              borderRadius: 6,
                              borderLeft: `3px solid ${colors.brand[400]}`,
                            }}
                          >
                            {item.nota}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}