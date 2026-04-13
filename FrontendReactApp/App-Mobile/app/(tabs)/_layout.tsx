import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { Platform } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useAuth } from '../../src/features/auth/hooks/useAuth';
import { colors } from '../../src/shared/theme/colors';

// ── Tab icons as SVG ──────────────────────────────────────────

function TabIcon({
  name, focused,
}: {
  name: 'home' | 'products' | 'orders' | 'profile';
  focused: boolean;
}) {
  const stroke = focused ? colors.brand[600] : colors.text.disabled;
  const fill   = focused ? colors.brand[100]  : 'none';

  if (name === 'home') return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" fill={fill} />
      <Path d="M9 21V12h6v9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  if (name === 'products') return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" fill={fill} />
      <Rect x="14" y="3" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" fill={fill} />
      <Rect x="3" y="14" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" />
      <Rect x="14" y="14" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" />
    </Svg>
  );

  if (name === 'orders') return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" fill={fill} />
      <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );

  // profile
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth="1.8" fill={fill} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

// ── Layout ────────────────────────────────────────────────────

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 82 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8,
          paddingHorizontal: 8,
        },
        tabBarActiveTintColor: colors.brand[600],
        tabBarInactiveTintColor: colors.text.disabled,
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: 2,
        },
        tabBarItemStyle: {
          borderRadius: 12,
        },
        tabBarActiveBackgroundColor: colors.brand[50],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Productos',
          tabBarIcon: ({ focused }) => <TabIcon name="products" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => <TabIcon name="orders" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabIcon name="profile" focused={focused} />,
        }}
      />
<<<<<<< HEAD
=======
      <Tabs.Screen
        name="cart"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="product-detail/[id]"
        options={{
          href: null
        }}
      />
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
    </Tabs>
  );
}