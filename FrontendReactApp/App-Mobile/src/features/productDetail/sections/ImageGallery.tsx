import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ProductImage } from '../types/productDetail.types';
import { productDetailTheme as t } from '../theme/productDetail.theme';

const { width } = Dimensions.get('window');
const MAIN_H = width * 0.78;

type Props = {
  images: ProductImage[];
  selectedIndex: number;
  onSelect: (i: number) => void;
};

export function ImageGallery({ images, selectedIndex, onSelect }: Props) {
  return (
    <View style={s.root}>
      <Image source={{ uri: images[selectedIndex].uri }} style={s.main} resizeMode="cover" />

      {/* Thumbnails */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.thumbRow}
      >
        {images.map((img, i) => (
          <TouchableOpacity
            key={img.id}
            onPress={() => onSelect(i)}
            activeOpacity={0.8}
            style={[s.thumb, i === selectedIndex && s.thumbActive]}
          >
            <Image source={{ uri: img.uri }} style={s.thumbImg} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: t.colors.bgAlt,
  },
  main: {
    width,
    height: MAIN_H,
  },
  thumbRow: {
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
    gap: t.spacing.sm,
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: t.radius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbActive: {
    borderColor: t.colors.primary,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
});