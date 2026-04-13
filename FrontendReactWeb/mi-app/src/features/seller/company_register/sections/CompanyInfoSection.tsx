'use client';
import React from 'react';
import { Building2 } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';
import { CompanyFormData } from '../types/companyRegister.types';
import { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS } from '../data/companyRegisterData';
import { InputField } from '../ui/InputField';
import { SelectField, SizeSelector } from '../ui/SelectField';

interface Props {
  formData: CompanyFormData;
  getFieldError: (f: keyof CompanyFormData) => string | undefined;
  updateField: <K extends keyof CompanyFormData>(f: K, v: CompanyFormData[K]) => void;
}

export const CompanyInfoSection: React.FC<Props> = ({ formData, getFieldError, updateField }) => (
  <div>
    <div style={{ textAlign:'center', marginBottom:28 }}>
      <Building2 size={48} color={C.brand600} style={{ marginBottom:10 }} />
      <h2 style={{ fontSize:20, fontWeight:600, color:C.textPrimary, margin:'0 0 4px' }}>Datos de la Empresa</h2>
      <p style={{ fontSize:14, color:C.textSecondary, margin:0 }}>Ingresa la información principal de tu negocio.</p>
    </div>

    <InputField
      label="Nombre de la empresa" placeholder="Ej. Soluciones Tech S.A."
      value={formData.companyName}
      onChange={e => updateField('companyName', e.target.value)}
      error={getFieldError('companyName')} required
    />
    <InputField
      label="RUC / NIT / RFC" placeholder="Número de identificación fiscal"
      value={formData.taxId}
      onChange={e => updateField('taxId', e.target.value.toUpperCase())}
      error={getFieldError('taxId')} required
      hint="Identificación tributaria de tu país"
    />
    <SelectField
      label="Sector / Industria" required
      options={INDUSTRY_OPTIONS}
      value={formData.industryType}
      onChange={v => updateField('industryType', v as CompanyFormData['industryType'])}
      error={getFieldError('industryType')}
    />
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
      <InputField
        label="Año de fundación" placeholder="2018"
        value={formData.foundedYear}
        onChange={e => updateField('foundedYear', e.target.value)}
        maxLength={4} hint="Opcional"
      />
      <InputField
        label="Sitio web" placeholder="www.empresa.com"
        value={formData.website}
        onChange={e => updateField('website', e.target.value)}
        hint="Opcional"
      />
    </div>
    <SizeSelector
      options={COMPANY_SIZE_OPTIONS}
      value={formData.companySize}
      onChange={v => updateField('companySize', v as CompanyFormData['companySize'])}
      error={getFieldError('companySize')}
    />
  </div>
);