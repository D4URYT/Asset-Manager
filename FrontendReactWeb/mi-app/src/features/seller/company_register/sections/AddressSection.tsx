'use client';
import React from 'react';
import { MapPin } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';
import { CompanyFormData } from '../types/companyRegister.types';
import { COUNTRY_OPTIONS } from '../data/companyRegisterData';
import { InputField } from '../ui/InputField';
import { SelectField } from '../ui/SelectField';

interface Props {
  formData: CompanyFormData;
  getFieldError: (f: keyof CompanyFormData) => string | undefined;
  updateField: <K extends keyof CompanyFormData>(f: K, v: CompanyFormData[K]) => void;
}

export const AddressSection: React.FC<Props> = ({ formData, getFieldError, updateField }) => {
  const countryOpts = [
    { label: 'Seleccionar país...', value: '' },
    ...COUNTRY_OPTIONS.map(c => ({ label: c, value: c })),
  ];
  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <MapPin size={48} color={C.brand600} style={{ marginBottom:10 }} />
        <h2 style={{ fontSize:20, fontWeight:600, color:C.textPrimary, margin:'0 0 4px' }}>Dirección Fiscal</h2>
        <p style={{ fontSize:14, color:C.textSecondary, margin:0 }}>Ubicación legal registrada de tu empresa.</p>
      </div>

      <SelectField label="País" required
        options={countryOpts} value={formData.country}
        onChange={v => updateField('country', v)}
        error={getFieldError('country')}
      />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <InputField label="Estado / Provincia" placeholder="Estado"
          value={formData.state}
          onChange={e => updateField('state', e.target.value)}
          hint="Opcional"
        />
        <InputField label="Ciudad" placeholder="Ciudad" required
          value={formData.city}
          onChange={e => updateField('city', e.target.value)}
          error={getFieldError('city')}
        />
      </div>
      <InputField label="Dirección completa" placeholder="Calle, número, colonia…" required
        value={formData.address}
        onChange={e => updateField('address', e.target.value)}
        error={getFieldError('address')}
      />
      <InputField label="Código Postal" placeholder="Ej. 06600"
        value={formData.postalCode}
        onChange={e => updateField('postalCode', e.target.value)}
        maxLength={10} hint="Opcional"
      />
    </div>
  );
};