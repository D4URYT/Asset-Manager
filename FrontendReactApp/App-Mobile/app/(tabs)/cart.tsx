import React from "react";
import { useRouter } from "expo-router";
import { CartPage } from "../../src/features/cart/CartPage";

export default function CartRoute() {
  const router = useRouter();

  return (
    <CartPage
      navigation={{
        goBack: () => router.back(),
      }}
    />
  );
}