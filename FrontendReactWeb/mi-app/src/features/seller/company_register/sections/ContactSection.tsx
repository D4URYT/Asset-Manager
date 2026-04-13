'use client';
import React from 'react';
import { Info, User } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';
import { CompanyFormData } from '../types/companyRegister.types';
import { InputField } from '../ui/InputField';

interface Props {
  formData: CompanyFormData;
  getFieldError: (f: keyof CompanyFormData) => string | undefined;
  updateField: <K extends keyof CompanyFormData>(f: K, v: CompanyFormData[K]) => void;
}

export const ContactSection: React.FC<Props> = ({ formData, getFieldError, updateField }) => (
  <div>
    <div style={{ textAlign:'center', marginBottom:24 }}>
      <User size={48} color={C.brand600} style={{ marginBottom:10 }} />
      <h2 style={{ fontSize:20, fontWeight:600, color:C.textPrimary, margin:'0 0 4px' }}>Responsable Administrativo</h2>
      <p style={{ fontSize:14, color:C.textSecondary, margin:0 }}>Datos del administrador principal de la cuenta.</p>
    </div>

    {/* Banner */}
    <div style={{
      display:'flex', gap:10, alignItems:'flex-start',
      backgroundColor:C.brand100, borderLeft:`3px solid ${C.brand600}`,
      borderRadius:10, padding:'12px 14px', marginBottom:20,
    }}>
      <Info size={16} color={C.brand600} style={{ marginTop:1 }} />
      <p style={{ fontSize:12, color:C.brand600, margin:0, lineHeight:'18px' }}>
        Esta persona tendrá acceso completo como administrador de la cuenta.
      </p>
    </div>

    <InputField label="Nombre completo" placeholder="Nombre y apellidos"
      value={formData.adminFullName}
      onChange={e => updateField('adminFullName', e.target.value)}
      error={getFieldError('adminFullName')} required
    />
    <InputField label="Correo electrónico corporativo" placeholder="admin@empresa.com"
      type="email" value={formData.adminEmail}
      onChange={e => updateField('adminEmail', e.target.value.toLowerCase())}
      error={getFieldError('adminEmail')} required
    />
    <InputField label="Teléfono / WhatsApp" placeholder="+52 55 1234 5678"
      type="tel" value={formData.adminPhone}
      onChange={e => updateField('adminPhone', e.target.value)}
      error={getFieldError('adminPhone')} required
      hint="Incluye código de país (+52, +57, +51…)"
    />
    <InputField label="Cargo / Posición" placeholder="Ej. Director General, Contador, CFO…"
      value={formData.adminPosition}
      onChange={e => updateField('adminPosition', e.target.value)}
      hint="Opcional"
    />
  </div>
);