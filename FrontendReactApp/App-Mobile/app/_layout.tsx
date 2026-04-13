import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

<<<<<<< HEAD
=======
import { CartProvider } from '../src/features/cart/context/CartContext';
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
import { AuthProvider } from '../src/core/providers/AuthProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
<<<<<<< HEAD
        <Stack screenOptions={{ headerShown: false }}>
          {/* Grupo de autenticación */}
          <Stack.Screen name="(auth)" />

          {/* Tabs principales */}
          <Stack.Screen name="(tabs)" />

          {/* Modal de registro */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Registro',
              headerShown: true,
            }}
          />
        </Stack>
=======
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Grupo de autenticación */}
            <Stack.Screen name="(auth)" />

            {/* Tabs principales */}
            <Stack.Screen name="(tabs)" />

            {/* Modal de registro */}
            <Stack.Screen
              name="modal"
              options={{
                presentation: 'modal',
                title: 'Registro',
                headerShown: true,
              }}
            />
          </Stack>
        </CartProvider>
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
      </AuthProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
