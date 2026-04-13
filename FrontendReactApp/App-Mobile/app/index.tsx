import { Redirect } from 'expo-router';
import { useAuthContext } from '../src/core/providers/AuthProvider';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return null; // puedes poner un spinner aquí

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}