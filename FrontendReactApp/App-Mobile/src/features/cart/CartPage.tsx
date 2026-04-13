import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { useCart } from './hooks/useCart';
import { cartTheme as t } from './theme/cart.theme';

import { CartItemCard } from './ui/CartItemCard';
import { EmptyCart } from './ui/EmptyCart';
import { CheckoutBar } from './ui/CheckoutBar';
import { FreeShippingBanner } from './sections/FreeShippingBanner';
import { PromoCodeInput } from './sections/PromoCodeInput';
import { OrderSummary } from './sections/OrderSummary';

import {
  IconChevronRight,
  IconShoppingBag,
} from '../../shared/ui/Icons';

type Props = {
  navigation?: { goBack: () => void };
};

export function CartPage({ navigation }: Props) {
  const {
    items,
    promoInput, setPromoInput,
    appliedPromo, promoError,
    removingId,
    increment, decrement, removeItem,
    applyPromo, removePromo,
    subtotal, promoSaving, shipping, tax, total,
    totalItems, freeShippingRemaining, SHIPPING_THRESHOLD,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={t.colors.bgCard} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          activeOpacity={0.75}
          style={s.headerBtn}
        >
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <IconChevronRight size={20} color={t.colors.textPrimary} strokeWidth={2.2} />
          </View>
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>My Cart</Text>
          {!isEmpty && (
            <View style={s.countBadge}>
              <Text style={s.countText}>{totalItems}</Text>
            </View>
          )}
        </View>

        <View style={s.headerBtn}>
          <IconShoppingBag size={20} color={t.colors.primaryLight} />
        </View>
      </View>

      {isEmpty ? (
        <EmptyCart onContinue={() => navigation?.goBack()} />
      ) : (
        <>
          <ScrollView
            style={s.scroll}
            contentContainerStyle={s.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Free shipping progress */}
            <FreeShippingBanner
              remaining={freeShippingRemaining}
              threshold={SHIPPING_THRESHOLD}
            />

            {/* Cart items */}
            <Text style={s.sectionLabel}>
              {items.length} item{items.length !== 1 ? 's' : ''}
            </Text>

            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
                onRemove={() => removeItem(item.id)}
                isRemoving={removingId === item.id}
              />
            ))}

            {/* Promo code */}
            <View style={s.promoWrap}>
              <Text style={s.sectionLabel}>Promo Code</Text>
              <PromoCodeInput
                value={promoInput}
                onChange={setPromoInput}
                onApply={applyPromo}
                onRemove={removePromo}
                applied={appliedPromo}
                error={promoError}
              />
            </View>

            {/* Order summary */}
            <OrderSummary
              subtotal={subtotal}
              promoSaving={promoSaving}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </ScrollView>

          {/* Sticky checkout */}
          <CheckoutBar
            total={total}
            totalItems={totalItems}
            onCheckout={() => console.log('Proceed to checkout')}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.colors.bgCard,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.md,
    backgroundColor: t.colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: t.colors.borderLight,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  headerTitle: {
    fontSize: t.font.lg,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  countText: {
    fontSize: t.font.xs,
    fontWeight: '700',
    color: t.colors.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: t.colors.bgMain,
  },
  scrollContent: {
    padding: t.spacing.xl,
    paddingBottom: 120,
  },
  sectionLabel: {
    fontSize: t.font.sm,
    fontWeight: '600',
    color: t.colors.textDisabled,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: t.spacing.md,
  },
  promoWrap: {
    marginTop: t.spacing.lg,
    marginBottom: t.spacing.lg,
    gap: t.spacing.md,
  },
});