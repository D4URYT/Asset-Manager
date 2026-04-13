import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconBriefcase } from '../../../shared/ui/Icons';

interface AuthHeaderProps {
  title: string;
  titleSoft?: string;
  subtitle?: string;
}

export function AuthHeader({ title, titleSoft, subtitle }: AuthHeaderProps) {
  return (
    <View style={styles.wrap}>
      {/* Top row: logo + version */}
      <View style={styles.topRow}>
        <View style={styles.logoBox}>
          <IconBriefcase size={18} color="#fff" strokeWidth={1.8} />
        </View>
        <Text style={styles.brandName}>OdooApp</Text>
        <View style={styles.versionPill}>
          <Text style={styles.versionText}>v2.0</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {title}
        {titleSoft ? '\n' : ''}
        {titleSoft && <Text style={styles.titleSoft}>{titleSoft}</Text>}
      </Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingBottom: 36 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 28,
  },
  logoBox: {
    width: 34, height: 34,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  versionPill: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  versionText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 8,
  },
  titleSoft: {
    color: 'rgba(255,255,255,0.55)',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 0.1,
    lineHeight: 19,
  },
});