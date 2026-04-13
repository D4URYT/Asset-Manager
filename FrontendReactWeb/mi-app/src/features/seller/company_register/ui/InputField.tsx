'use client';
import React, { useState, InputHTMLAttributes } from 'react';
import { AlertTriangle } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  rightSlot?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label, error, hint, required, rightSlot, style, ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const borderColor = error ? C.error : focused ? C.brand600 : C.borderDefault;
  const bgColor     = error ? '#FFF5F5' : focused ? '#F0F5FF' : C.bgSecondary;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontSize: 13, fontWeight: 500,
        color: C.textPrimary, marginBottom: 6,
      }}>
        {label}{required && <span style={{ color: C.error, marginLeft: 2 }}>*</span>}
      </label>

      <div style={{
        display: 'flex', alignItems: 'center',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 10, paddingLeft: 14, paddingRight: 14,
        minHeight: 52, backgroundColor: bgColor,
        transition: 'border-color 0.15s, background 0.15s',
      }}>
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, fontSize: 14, color: C.textPrimary,
            background: 'transparent', border: 'none', outline: 'none',
            paddingTop: 8, paddingBottom: 8, width: '100%',
            fontFamily: 'inherit',
          }}
          {...rest}
        />
        {rightSlot && <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>{rightSlot}</div>}
      </div>

      {error
        ? (
        <p style={{ fontSize: 12, color: C.error, margin: '4px 0 0', display:'flex', alignItems:'center', gap:6 }}>
          <AlertTriangle size={14} />
          {error}
        </p>
      )
        : hint
        ? <p style={{ fontSize: 12, color: C.textDisabled, margin: '4px 0 0' }}>{hint}</p>
        : null}
    </div>
  );
};