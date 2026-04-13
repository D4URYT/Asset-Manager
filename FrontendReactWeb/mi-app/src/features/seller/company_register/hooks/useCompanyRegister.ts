'use client';
import { useState, useCallback, useMemo } from 'react';
import { CompanyFormData, FieldError, FormStatus, PasswordStrength } from '../types/companyRegister.types';
import { INITIAL_FORM_DATA } from '../data/companyRegisterData';
import { C } from '../theme/companyRegisterTheme';

const TOTAL_STEPS = 4;

export const calcPasswordStrength = (pw: string): PasswordStrength => {
  if (!pw) return { score: 0, label: '', color: C.borderDefault, percent: 0 };
  let s = 0;
  if (pw.length >= 8)           s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  const map: PasswordStrength[] = [
    { score:1, label:'Muy débil', color: C.error,    percent:25  },
    { score:2, label:'Débil',     color: C.warning,  percent:50  },
    { score:3, label:'Buena',     color: C.brand400, percent:75  },
    { score:4, label:'¡Fuerte!',  color: C.success,  percent:100 },
  ];
  return map[s - 1] ?? map[0];
};

export const useCompanyRegister = () => {
  const [currentStep,  setCurrentStep]  = useState(1);
  const [formData,     setFormData]     = useState<CompanyFormData>(INITIAL_FORM_DATA);
  const [errors,       setErrors]       = useState<FieldError[]>([]);
  const [formStatus,   setFormStatus]   = useState<FormStatus>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);

  const updateField = useCallback(<K extends keyof CompanyFormData>(field: K, value: CompanyFormData[K]) => {
    setFormData(p => ({ ...p, [field]: value }));
    setErrors(p => p.filter(e => e.field !== field));
  }, []);

  const getFieldError = useCallback(
    (field: keyof CompanyFormData) => errors.find(e => e.field === field)?.message,
    [errors]
  );

  const validateStep = useCallback((step: number): boolean => {
    const errs: FieldError[] = [];
    if (step === 1) {
      if (!formData.companyName.trim())  errs.push({ field:'companyName',  message:'Nombre de empresa requerido' });
      if (!formData.taxId.trim())        errs.push({ field:'taxId',        message:'RUC / NIT requerido' });
      if (!formData.industryType)        errs.push({ field:'industryType', message:'Selecciona un sector' });
      if (!formData.companySize)         errs.push({ field:'companySize',  message:'Selecciona el tamaño' });
    }
    if (step === 2) {
      if (!formData.adminFullName.trim()) errs.push({ field:'adminFullName', message:'Nombre completo requerido' });
      if (!formData.adminEmail.trim())    errs.push({ field:'adminEmail',    message:'Email requerido' });
      else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) errs.push({ field:'adminEmail', message:'Formato de email inválido' });
      if (!formData.adminPhone.trim())    errs.push({ field:'adminPhone',    message:'Teléfono requerido' });
    }
    if (step === 3) {
      if (!formData.country)              errs.push({ field:'country',  message:'País requerido' });
      if (!formData.city.trim())          errs.push({ field:'city',     message:'Ciudad requerida' });
      if (!formData.address.trim())       errs.push({ field:'address',  message:'Dirección requerida' });
    }
    if (step === 4) {
      if (!formData.password)             errs.push({ field:'password', message:'Contraseña requerida' });
      else if (formData.password.length < 8) errs.push({ field:'password', message:'Mínimo 8 caracteres' });
      if (formData.password !== formData.confirmPassword) errs.push({ field:'confirmPassword', message:'Las contraseñas no coinciden' });
      if (!formData.acceptTerms)          errs.push({ field:'acceptTerms', message:'Debes aceptar los términos' });
    }
    setErrors(errs);
    return errs.length === 0;
  }, [formData]);

  const goNext = useCallback(() => {
    if (!validateStep(currentStep)) return;
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS));
  }, [currentStep, validateStep]);

  const goBack = useCallback(() => {
    setErrors([]);
    setCurrentStep(s => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(TOTAL_STEPS)) return;
    setFormStatus('loading');
    try {
      await new Promise(res => setTimeout(res, 2000));
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }, [validateStep]);

  const progressPercent = useMemo(() => ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100, [currentStep]);
  const passwordStrength = useMemo(() => calcPasswordStrength(formData.password), [formData.password]);

  return {
    currentStep, totalSteps: TOTAL_STEPS, formData, errors, formStatus,
    showPassword, showConfirm, progressPercent, passwordStrength,
    updateField, getFieldError, goNext, goBack, handleSubmit,
    toggleShowPassword: () => setShowPassword(v => !v),
    toggleShowConfirm:  () => setShowConfirm(v => !v),
  };
};