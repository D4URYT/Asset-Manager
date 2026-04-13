'use client';
import React from 'react';
import { C } from '../theme/companyRegisterTheme';
import { FormStep } from '../types/companyRegister.types';

interface StepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
  progressPercent: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, progressPercent }) => (
  <div style={{
    backgroundColor: C.bgSecondary,
    borderBottom: `1px solid ${C.borderDefault}`,
    padding: '16px 24px 12px',
  }}>
    {/* Progress bar */}
    <div style={{
      height: 5, backgroundColor: C.bgAlt, borderRadius: 9999,
      marginBottom: 20, overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', backgroundColor: C.brand600, borderRadius: 9999,
        width: `${progressPercent}%`, transition: 'width 0.5s ease',
      }} />
    </div>

    {/* Bubbles */}
    <div style={{ display:'flex', justifyContent:'space-between' }}>
      {steps.map(step => {
        const done   = step.id < currentStep;
        const active = step.id === currentStep;
        const Icon = step.icon;
        return (
          <div key={step.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 6,
              border: `2px solid ${done ? C.brand600 : active ? C.brand600 : 'transparent'}`,
              backgroundColor: done ? C.brand600 : active ? '#EEF4FF' : C.bgAlt,
              transition: 'all 0.3s',
            }}>
              {done
                ? <span style={{ color:'white', fontWeight:'bold', fontSize:14 }}>✓</span>
                : (
                  <Icon
                    size={18}
                    color={active ? C.brand600 : C.textDisabled}
                    style={{ opacity: active ? 1 : 0.6 }}
                  />
                )
              }
            </div>
            <span style={{
              fontSize: 10, fontWeight: 500, textAlign: 'center',
              color: active ? C.brand600 : done ? C.success : C.textDisabled,
            }}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>

    <p style={{ textAlign:'center', fontSize:12, color:C.textSecondary, margin:'10px 0 0' }}>
      Paso {currentStep} de {steps.length} —{' '}
      <strong>{steps[currentStep - 1]?.subtitle}</strong>
    </p>
  </div>
);