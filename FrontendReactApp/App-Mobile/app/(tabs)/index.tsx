import { useRouter } from 'expo-router';
import { HomeScreen } from '../../src/features/home/HomeScreen';
<<<<<<< HEAD
=======
import { useCart } from '../../src/features/cart/hooks/useCart';
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
import type { Product } from '../../src/features/home/types/home.types';

export default function HomeTab() {
  const router = useRouter();
<<<<<<< HEAD

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/products',
      params: { id: product.id },
    });
=======
  const { addToCart } = useCart();

  const handleProductPress = (product: Product) => {
    router.push(`./product-detail/${product.id}`);
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
  };

  const handleSeeAllProducts = () => {
    router.push('/products');
  };

  const handleAddToCart = (product: Product) => {
<<<<<<< HEAD
    console.log('Add to cart:', product.id);
=======
    addToCart({ product, quantity: 1 });
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
  };

  return (
    <HomeScreen
      onProductPress={handleProductPress}
      onSeeAllProducts={handleSeeAllProducts}
      onAddToCart={handleAddToCart}
    />
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
