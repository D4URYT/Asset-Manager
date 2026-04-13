import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  RefreshControl, TouchableOpacity,
  ActivityIndicator, FlatList,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useProducts, useProductSearch } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../../../shared/ui/SearchBar';
import { colors } from '../../../shared/theme/colors';
import type { Product } from '../types/product.types';

// ── Inline icons ──────────────────────────────────────────────

function IconBell({ hasNotif = false }: { hasNotif?: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke={colors.text.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {hasNotif && <Circle cx="18" cy="5" r="3" fill={colors.error.default} />}
    </Svg>
  );
}

function IconTrendUp() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M23 6l-9.5 9.5-5-5L1 18" stroke={colors.success.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 6h6v6" stroke={colors.success.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconChevronRight() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={colors.text.disabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ── Stat card ─────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color: string;
}) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {sub && <Text style={styles.statSub}>{sub}</Text>}
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────

interface HomeScreenProps {
  onProductPress?: (product: Product) => void;
  onSeeAllProducts?: () => void;
}

export function HomeScreen({ onProductPress, onSeeAllProducts }: HomeScreenProps) {
  const { user } = useAuth();
  const { products, featured, isLoading, error, refreshing, refresh } = useProducts();
  const { query, setQuery, results } = useProductSearch(products);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const isSearching = query.trim().length > 0;

  return (
    <View style={styles.root}>

      {/* ── Top gradient header ── */}
      <LinearGradient
        colors={['#0F1F4D', '#1E3A8A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Faint circle accent */}
        <View style={styles.headerCircle} />

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>{greeting()},</Text>
            <Text style={styles.userName}>
              {user?.name ?? user?.login ?? 'Usuario'} 👋
            </Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <IconBell hasNotif />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      </LinearGradient>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.brand[500]}
            colors={[colors.brand[500]]}
          />
        }
      >

        {/* Loading state */}
        {isLoading && (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={colors.brand[500]} />
            <Text style={styles.centerText}>Cargando catálogo...</Text>
          </View>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <View style={styles.errorState}>
            <Text style={styles.errorEmoji}>⚠️</Text>
            <Text style={styles.errorTitle}>No se pudo conectar</Text>
            <Text style={styles.errorSub}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Search results ── */}
        {!isLoading && !error && isSearching && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{query}"
            </Text>
            {results.length === 0 ? (
              <View style={styles.emptySearch}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyText}>Sin resultados</Text>
              </View>
            ) : (
              results.map(p => (
                <ProductCard key={p.id} product={p} onPress={onProductPress} variant="list" />
              ))
            )}
          </View>
        )}

        {/* ── Normal view (no search) ── */}
        {!isLoading && !error && !isSearching && (
          <>
            {/* Stats row */}
            <View style={styles.statsRow}>
              <StatCard
                label="Productos"
                value={String(products.length)}
                sub="en catálogo"
                color={colors.brand[500]}
              />
              <StatCard
                label="Destacados"
                value={String(featured.length)}
                sub="top precio"
                color={colors.success.default}
              />
              <StatCard
                label="Disponibles"
                value={products.length > 0 ? '✓' : '—'}
                sub="activos"
                color={colors.warning.default}
              />
            </View>

            {/* Featured horizontal scroll */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Destacados</Text>
                  <View style={styles.trendRow}>
                    <IconTrendUp />
                    <Text style={styles.trendText}>Más solicitados</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.seeAllBtn} onPress={onSeeAllProducts}>
                  <Text style={styles.seeAllText}>Ver todo</Text>
                  <IconChevronRight />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredScroll}
              >
                {featured.map(p => (
                  <ProductCard key={p.id} product={p} onPress={onProductPress} variant="featured" />
                ))}
              </ScrollView>
            </View>

            {/* All products list */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Todo el catálogo</Text>
                <Text style={styles.countBadge}>{products.length}</Text>
              </View>

              {products.map(p => (
                <ProductCard key={p.id} product={p} onPress={onProductPress} variant="list" />
              ))}
            </View>
          </>
        )}

        {/* Bottom padding for tab bar */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.primary },

  // Header
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  headerCircle: {
    position: 'absolute',
    width: 220, height: 220,
    top: -80, right: -60,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 2,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  bellBtn: {
    width: 40, height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    marginBottom: -23,
    zIndex: 10,
  },

  // Body
  body: { flex: 1 },
  bodyContent: {
    paddingTop: 36,
    paddingHorizontal: 20,
  },

  // States
  centerState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  centerText: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  errorState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 8,
  },
  errorEmoji: { fontSize: 40, marginBottom: 4 },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  errorSub: {
    fontSize: 13,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 12,
    backgroundColor: colors.brand[600],
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 13.5,
    fontWeight: '600',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text.disabled,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statSub: {
    fontSize: 10,
    color: colors.text.disabled,
  },

  // Sections
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  trendText: {
    fontSize: 11,
    color: colors.success.default,
    fontWeight: '500',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeAllText: {
    fontSize: 12.5,
    color: colors.brand[500],
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: colors.brand[100],
    color: colors.brand[600],
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredScroll: {
    paddingRight: 4,
  },

  // Search
  emptySearch: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyEmoji: { fontSize: 32 },
  emptyText: {
    fontSize: 14,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
});