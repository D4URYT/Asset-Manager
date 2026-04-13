import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

interface PromoBannerProps {
  onPress?: () => void;
}

export function PromoBanner({ onPress }: PromoBannerProps) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[colors.brand[900], colors.brand[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.circle} />
        <View style={styles.info}>
          <Text style={styles.tag}>Servicio Premium</Text>
          <Text style={styles.title}>Soporte técnico{'\n'}empresarial 24/7</Text>
          <Text style={styles.sub}>Para empresas y PYMES</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.btnText}>Ver más</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, marginBottom: 4 },
  banner: {
    borderRadius: radius.xl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute', width: 140, height: 140,
    top: -40, right: 60, borderRadius: 70,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  info: { flex: 1 },
  tag: { fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 5 },
  title: { fontSize: 15, fontWeight: '700', color: '#fff', lineHeight: 21 },
  sub: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 3 },
  btn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: radius.full,
    paddingHorizontal: 14, paddingVertical: 8, flexShrink: 0,
  },
  btnText: { fontSize: 11.5, fontWeight: '600', color: '#fff' },
});