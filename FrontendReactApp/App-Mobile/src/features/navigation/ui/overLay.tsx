import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Animated } from 'react-native';

interface DrawerOverlayProps {
  visible: boolean;
  onPress: () => void;
}

export function DrawerOverlay({ visible, onPress }: DrawerOverlayProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.overlay, { opacity }]} />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 150,
  },
});