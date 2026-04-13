import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductReview } from '../types/productDetail.types';
import { productDetailTheme as t } from '../theme/productDetail.theme';
import { IconStar, IconStarEmpty } from '../../../shared/ui/Icons';

type Props = {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
};

function MiniStars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? <IconStar key={i} size={11} /> : <IconStarEmpty key={i} size={11} />
      )}
    </View>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <View style={s.card}>
      <View style={s.cardTop}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{review.author[0]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.author}>{review.author}</Text>
          <MiniStars rating={review.rating} />
        </View>
        <Text style={s.date}>{review.date}</Text>
      </View>
      <Text style={s.comment}>{review.comment}</Text>
    </View>
  );
}

export function ReviewsSection({ reviews, rating, reviewCount }: Props) {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Text style={s.title}>Reviews</Text>
        <View style={s.ratingPill}>
          <IconStar size={12} />
          <Text style={s.ratingVal}>{rating}</Text>
          <Text style={s.ratingCount}>· {reviewCount.toLocaleString()}</Text>
        </View>
      </View>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    paddingHorizontal: t.spacing.xl,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.lg,
  },
  title: {
    fontSize: t.font.lg,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: t.colors.bgAlt,
    paddingHorizontal: t.spacing.md,
    paddingVertical: 5,
    borderRadius: t.radius.full,
  },
  ratingVal: {
    fontSize: t.font.sm,
    fontWeight: '700',
    color: t.colors.textPrimary,
  },
  ratingCount: {
    fontSize: t.font.sm,
    color: t.colors.textDisabled,
  },
  card: {
    backgroundColor: t.colors.bgCard,
    borderRadius: t.radius.lg,
    padding: t.spacing.lg,
    marginBottom: t.spacing.md,
    borderWidth: 1,
    borderColor: t.colors.borderLight,
    ...t.shadow.card,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
    marginBottom: t.spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: t.font.md,
    fontWeight: '700',
    color: t.colors.primary,
  },
  author: {
    fontSize: t.font.sm,
    fontWeight: '600',
    color: t.colors.textPrimary,
    marginBottom: 2,
  },
  date: {
    fontSize: t.font.xs,
    color: t.colors.textDisabled,
  },
  comment: {
    fontSize: t.font.sm,
    color: t.colors.textSecondary,
    lineHeight: 20,
  },
});