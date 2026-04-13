import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, TextInputProps, ViewStyle,
} from 'react-native';
import { IconEye, IconEyeOff, IconWarning } from './Icons';
import { colors } from '../theme/colors';

interface InputProps extends TextInputProps {
  label: string;
  LeftIcon?: React.ComponentType<{ color?: string; size?: number }>;
  error?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({
  label, LeftIcon, error, isPassword, containerStyle, ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const anim = useRef(new Animated.Value(1)).current;

  const onFocus = () => {
    setFocused(true);
    Animated.spring(anim, { toValue: 1.005, useNativeDriver: true, tension: 400 }).start();
  };
  const onBlur = () => {
    setFocused(false);
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, tension: 400 }).start();
  };

  const iconColor = error ? colors.error.default : focused ? colors.brand[500] : '#8896B0';
  const borderColor = error ? colors.error.default : focused ? colors.brand[500] : colors.border.light;
  const shadow = focused && !error
    ? { shadowColor: colors.brand[500], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 }
    : {};

  return (
    <View style={[styles.wrap, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={{ transform: [{ scale: anim }] }}>
        <View style={[styles.row, { borderColor }, shadow]}>
          {LeftIcon && (
            <View style={styles.leftIcon}>
              <LeftIcon color={iconColor} size={16} />
            </View>
          )}
          <TextInput
            style={[styles.input, !LeftIcon && styles.inputNoPad]}
            placeholderTextColor="#C5CFDF"
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={isPassword && !showPass}
            {...rest}
          />
          {isPassword && (
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(v => !v)}>
              {showPass
                ? <IconEyeOff size={16} />
                : <IconEye size={16} />}
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      {error && (
        <View style={styles.errRow}>
          <IconWarning size={11} />
          <Text style={styles.errText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: '#3D4A63',
    marginBottom: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    height: 46,
    paddingHorizontal: 13,
  },
  leftIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 13.5,
    color: '#0B1120',
    fontWeight: '400',
    paddingVertical: 0,
  },
  inputNoPad: { paddingLeft: 0 },
  eyeBtn: { padding: 4, marginLeft: 4 },
  errRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  errText: { fontSize: 11, color: colors.error.default },
});