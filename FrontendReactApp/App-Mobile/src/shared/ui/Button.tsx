import React, { useRef } from 'react';
import {
  TouchableOpacity, Text, ActivityIndicator,
  StyleSheet, Animated, ViewStyle, View,
} from 'react-native';
import { IconArrowRight, IconGoogle } from './Icons';
import { colors } from '../theme/colors';

type Variant = 'primary' | 'google' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', isLoading, disabled, style }: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn  = () => Animated.spring(scale, { toValue: 0.975, useNativeDriver: true, tension: 350 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1,     useNativeDriver: true, tension: 350 }).start();

  const isDisabled = disabled || isLoading;

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}
        disabled={isDisabled} activeOpacity={1}
        style={[
          styles.base,
          variant === 'primary' && styles.primary,
          variant === 'google'  && styles.google,
          variant === 'ghost'   && styles.ghost,
          isDisabled && styles.disabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={variant === 'primary' ? '#fff' : colors.brand[600]} size="small" />
        ) : variant === 'google' ? (
          <>
            <IconGoogle size={18} />
            <Text style={styles.googleLabel}>{label}</Text>
          </>
        ) : variant === 'primary' ? (
          <>
            <Text style={styles.primaryLabel}>{label}</Text>
            <View style={styles.arrowBox}>
              <IconArrowRight size={12} color="#fff" strokeWidth={2.2} />
            </View>
          </>
        ) : (
          <Text style={styles.ghostLabel}>{label}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.brand[600],
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  google: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border.light,
    height: 46,
  },
  ghost: { backgroundColor: 'transparent', height: 42 },
  disabled: { opacity: 0.5 },
  primaryLabel: { color: '#fff', fontSize: 14, fontWeight: '600', letterSpacing: 0.2 },
  googleLabel:  { color: '#3D4A63', fontSize: 13.5, fontWeight: '500' },
  ghostLabel:   { color: colors.brand[500], fontSize: 13.5, fontWeight: '500' },
  arrowBox: {
    width: 22, height: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
});