'use client';
import React from 'react';
import { Eye, EyeOff, Lock } from "lucide-react";
import { C } from '../theme/companyRegisterTheme';
import { CompanyFormData, PasswordStrength } from '../types/companyRegister.types';
import { InputField } from '../ui/InputField';
import { CheckboxField } from '../ui/SelectField';

interface Props {
  formData: CompanyFormData;
  getFieldError: (f: keyof CompanyFormData) => string | undefined;
  updateField: <K extends keyof CompanyFormData>(f: K, v: CompanyFormData[K]) => void;
  showPassword: boolean;
  showConfirm: boolean;
  toggleShowPassword: () => void;
  toggleShowConfirm: () => void;
  passwordStrength: PasswordStrength;
}

const PW_TIPS = [
  'Mínimo 8 caracteres',
  'Al menos una mayúscula (A–Z)',
  'Al menos un número (0–9)',
  'Un símbolo especial (!@#$…)',
];

export const AccountSection: React.FC<Props> = ({
  formData, getFieldError, updateField,
  showPassword, showConfirm, toggleShowPassword, toggleShowConfirm,
  passwordStrength,
}) => (
  <div>
    <div style={{ textAlign:'center', marginBottom:28 }}>
      <Lock size={48} color={C.brand600} style={{ marginBottom:10 }} />
      <h2 style={{ fontSize:20, fontWeight:600, color:C.textPrimary, margin:'0 0 4px' }}>Seguridad de la Cuenta</h2>
      <p style={{ fontSize:14, color:C.textSecondary, margin:0 }}>Crea una contraseña fuerte para proteger tu empresa.</p>
    </div>

    <InputField
      label="Contraseña" placeholder="Mínimo 8 caracteres" required
      type={showPassword ? 'text' : 'password'}
      value={formData.password}
      onChange={e => updateField('password', e.target.value)}
      error={getFieldError('password')}
      autoComplete="new-password"
      rightSlot={
        <button type="button" onClick={toggleShowPassword}
          style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, opacity:0.6, padding:0 }}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />

    {/* Strength meter */}
    {formData.password.length > 0 && (
      <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:-8, marginBottom:16 }}>
        <div style={{ flex:1, display:'flex', gap:4 }}>
          {[25,50,75,100].map(mark => (
            <div key={mark} style={{
              flex:1, height:5, borderRadius:9999,
              backgroundColor: passwordStrength.percent >= mark ? passwordStrength.color : C.borderDefault,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
        <span style={{ fontSize:12, fontWeight:600, minWidth:65, textAlign:'right', color:passwordStrength.color }}>
          {passwordStrength.label}
        </span>
      </div>
    )}

    <InputField
      label="Confirmar contraseña" placeholder="Repite tu contraseña" required
      type={showConfirm ? 'text' : 'password'}
      value={formData.confirmPassword}
      onChange={e => updateField('confirmPassword', e.target.value)}
      error={getFieldError('confirmPassword')}
      autoComplete="new-password"
      rightSlot={
        <button type="button" onClick={toggleShowConfirm}
          style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, opacity:0.6, padding:0 }}>
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />

    {/* Tips */}
    <div style={{ backgroundColor:C.bgAlt, borderRadius:10, padding:'14px 16px', marginBottom:20 }}>
      <p style={{ fontSize:13, fontWeight:500, color:C.textSecondary, margin:'0 0 8px' }}>
        Recomendaciones de seguridad
      </p>
      {PW_TIPS.map((t,i) => (
        <p key={i} style={{ fontSize:12, color:C.textSecondary, margin:'0 0 4px', lineHeight:'18px' }}>
          • {t}
        </p>
      ))}
    </div>

    <CheckboxField
      value={formData.acceptTerms}
      onChange={v => updateField('acceptTerms', v)}
      error={getFieldError('acceptTerms')}
    >
      Acepto los{' '}
      <a href="#" style={{ color:C.brand400, fontWeight:600 }}>Términos de Servicio</a>
      {' '}y la{' '}
      <a href="#" style={{ color:C.brand400, fontWeight:600 }}>Política de Privacidad</a>
      {' '}de FinanzApp
    </CheckboxField>

    <CheckboxField
      value={formData.acceptMarketing}
      onChange={v => updateField('acceptMarketing', v)}
    >
      Quiero recibir novedades y actualizaciones{' '}
      <span style={{ color:C.textDisabled }}>(opcional)</span>
    </CheckboxField>
  </div>
);