import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconStar, IconStarEmpty } from '../../../shared/ui/Icons';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 11 }: StarRatingProps) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(i =>
        i <= Math.round(rating)
          ? <IconStar key={i} size={size} />
          : <IconStarEmpty key={i} size={size} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 1 },
});