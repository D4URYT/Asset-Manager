import { useRouter } from 'expo-router';
import { AuthScreen } from '../../src/features/auth/screens/AuthScreen';

export default function AuthPage() {
  const router = useRouter();

  return (
    <AuthScreen
      onLoginSuccess={() => {
        router.replace('/'); // o '/home' o '/(app)' dependiendo tu estructura
      }}
    />
  );
}