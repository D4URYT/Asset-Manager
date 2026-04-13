import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../src/shared/theme/colors';

export default function OrdersTab() {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos</Text>
        <Text style={styles.subtitle}>Historial de tus órdenes</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>📋</Text>
        <Text style={styles.emptyTitle}>Sin pedidos aún</Text>
        <Text style={styles.emptySub}>
          Tus pedidos aparecerán aquí cuando realices una compra
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    backgroundColor: '#fff',
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20,
    borderBottomWidth: 1, borderBottomColor: colors.border.light,
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.4 },
  subtitle: { fontSize: 13, color: colors.text.tertiary, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 10 },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.text.primary },
  emptySub: { fontSize: 13.5, color: colors.text.tertiary, textAlign: 'center', lineHeight: 20 },
});