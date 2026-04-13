'use client';
import React from 'react';
import { AlertTriangle, type LucideIcon } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';

// ─── SelectField ──────────────────────────────────────────────────────────────
interface SelectOption { label: string; value: string }
interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label, options, value, onChange, error, required,
}) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:500, color:C.textPrimary, marginBottom:6 }}>
      {label}{required && <span style={{ color:C.error, marginLeft:2 }}>*</span>}
    </label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', height: 52, padding: '0 40px 0 14px',
        fontSize: 14, color: value ? C.textPrimary : C.textDisabled,
        backgroundColor: C.bgSecondary,
        border: `1.5px solid ${error ? C.error : C.borderDefault}`,
        borderRadius: 10, outline: 'none', cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%234B5563' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        fontFamily: 'inherit',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value} disabled={o.value === ''}>
          {o.label}
        </option>
      ))}
    </select>
    {error && (
      <p style={{ fontSize:12, color:C.error, margin:'4px 0 0', display:'flex', alignItems:'center', gap:6 }}>
        <AlertTriangle size={14} />
        {error}
      </p>
    )}
  </div>
);

// ─── SizeSelector ─────────────────────────────────────────────────────────────
interface SizeOption { label: string; value: string; range: string; Icon: LucideIcon }
interface SizeSelectorProps {
  options: SizeOption[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ options, value, onChange, error }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:500, color:C.textPrimary, marginBottom:6 }}>
      Tamaño de empresa <span style={{ color:C.error }}>*</span>
    </label>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '14px 12px',
              border: `1.5px solid ${active ? C.brand600 : C.borderDefault}`,
              borderRadius: 10, cursor: 'pointer',
              backgroundColor: active ? C.brand100 : C.bgSecondary,
              transition: 'all 0.15s',
            }}
          >
            <opt.Icon size={22} color={active ? C.brand600 : C.textDisabled} style={{ marginBottom: 4 }} />
            <span style={{ fontSize:14, fontWeight:600, color: active ? C.brand600 : C.textPrimary }}>
              {opt.label}
            </span>
            <span style={{ fontSize:11, color: active ? C.brand400 : C.textDisabled, marginTop:2 }}>
              {opt.range}
            </span>
          </button>
        );
      })}
    </div>
    {error && (
      <p style={{ fontSize:12, color:C.error, margin:'4px 0 0', display:'flex', alignItems:'center', gap:6 }}>
        <AlertTriangle size={14} />
        {error}
      </p>
    )}
  </div>
);

// ─── CheckboxField ────────────────────────────────────────────────────────────
interface CheckboxFieldProps {
  value: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ value, onChange, error, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 2,
          border: `2px solid ${value ? C.brand600 : C.borderDefault}`,
          backgroundColor: value ? C.brand600 : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        {value && <span style={{ color:'white', fontSize:11, fontWeight:'bold', lineHeight:1 }}>✓</span>}
      </div>
      <span style={{ fontSize:13, color:C.textSecondary, lineHeight:'20px' }}>{children}</span>
    </label>
    {error && (
      <p style={{ fontSize:12, color:C.error, margin:'4px 0 0 30px', display:'flex', alignItems:'center', gap:6 }}>
        <AlertTriangle size={14} />
        {error}
      </p>
    )}
  </div>
);