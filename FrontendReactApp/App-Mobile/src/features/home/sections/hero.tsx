import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconZap, IconArrowRight } from '../../../shared/ui/Icons';
import { colors } from '../../../shared/theme/colors';
import { radius } from '../../../shared/theme/spacing';

interface HeroSectionProps {
  onPress?: () => void;
}

export function HeroSection({ onPress }: HeroSectionProps) {
  return (
    <LinearGradient
      colors={[colors.brand[900], colors.brand[600], colors.brand[400]]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      {/* Decorative circles */}
      <View style={styles.circleA} />
      <View style={styles.circleB} />

      {/* Tag */}
      <View style={styles.tag}>
        <IconZap size={10} color="rgba(255,255,255,0.75)" fill="none" />
        <Text style={styles.tagText}>Ofertas de la semana</Text>
      </View>

      <Text style={styles.title}>
        Los mejores{'\n'}
        <Text style={styles.titleSoft}>productos y servicios</Text>
      </Text>
      <Text style={styles.sub}>
        Catálogo completo desde tu móvil.{'\n'}Entrega rápida garantizada.
      </Text>

      <TouchableOpacity style={styles.cta} onPress={onPress} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Ver catálogo</Text>
        <IconArrowRight size={14} color={colors.brand[600]} strokeWidth={2.2} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 28, position: 'relative', overflow: 'hidden' },
  circleA: {
    position: 'absolute', width: 220, height: 220,
    top: -70, right: -60, borderRadius: 110,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  circleB: {
    position: 'absolute', width: 110, height: 110,
    top: 10, right: 20, borderRadius: 55,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.full,
    paddingHorizontal: 12, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 12,
  },
  tagText: {
    fontSize: 10, fontWeight: '600', letterSpacing: 1.2,
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
  },
  title: {
    fontSize: 24, fontWeight: '800',
    color: '#fff', lineHeight: 30, marginBottom: 8,
    letterSpacing: -0.4,
  },
  titleSoft: {
    fontWeight: '300', color: 'rgba(255,255,255,0.55)',
    fontStyle: 'italic',
  },
  sub: {
    fontSize: 12, fontWeight: '300',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 18, marginBottom: 18,
  },
  cta: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: '#fff', alignSelf: 'flex-start',
    borderRadius: radius.full, paddingHorizontal: 20, paddingVertical: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  ctaText: { fontSize: 13, fontWeight: '600', color: colors.brand[600] },
});