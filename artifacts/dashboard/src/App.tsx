import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/use-auth";

import DashboardPage from "@/pages/dashboard";
import UsersPage from "@/pages/users";
import ProductsPage from "@/pages/products";
import CustomersPage from "@/pages/customers";
import PostsPage from "@/pages/posts";
import SettingsPage from "@/pages/settings";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import { AppLayout } from "@/components/layout/app-layout";
import { Spinner } from "@/components/ui/spinner";
import { canAccessRoute, getDefaultRouteForRole } from "@/lib/role-routing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

function ProtectedRoute({ component: Component, path, ...rest }: any) {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center"><Spinner className="w-8 h-8" /></div>;
  }
  
  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (path && !canAccessRoute(user?.role, path)) {
    window.location.href = getDefaultRouteForRole(user?.role);
    return null;
  }
  
  return <Component {...rest} />;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center"><Spinner className="w-8 h-8" /></div>;
  }

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      
      <Route path="/" nest>
        <AppLayout>
          <Switch>
            <Route path="/" component={() => <ProtectedRoute component={DashboardPage} path="/" />} />
            <Route path="/users" component={() => <ProtectedRoute component={UsersPage} path="/users" />} />
            <Route path="/products" component={() => <ProtectedRoute component={ProductsPage} path="/products" />} />
            <Route path="/customers" component={() => <ProtectedRoute component={CustomersPage} path="/customers" />} />
            <Route path="/posts" component={() => <ProtectedRoute component={PostsPage} path="/posts" />} />
            <Route path="/settings" component={() => <ProtectedRoute component={SettingsPage} path="/settings" />} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
        <SonnerToaster richColors closeButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
