import {
  useGetDashboardStats,
  getGetDashboardStatsQueryKey,
  useGetDashboardSales,
  getGetDashboardSalesQueryKey,
  useGetDashboardActivity,
  getGetDashboardActivityQueryKey,
  useGetDashboardUserGrowth,
  getGetDashboardUserGrowthQueryKey,
  useGetDashboardProductDistribution,
  getGetDashboardProductDistributionQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Package, Building2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats({ query: { queryKey: getGetDashboardStatsQueryKey() } });
  const { data: sales, isLoading: salesLoading } = useGetDashboardSales({ query: { queryKey: getGetDashboardSalesQueryKey() } });
  const { data: activity, isLoading: activityLoading } = useGetDashboardActivity({ query: { queryKey: getGetDashboardActivityQueryKey() } });
  const { data: userGrowth, isLoading: userGrowthLoading } = useGetDashboardUserGrowth({ query: { queryKey: getGetDashboardUserGrowthQueryKey() } });
  const { data: productDist, isLoading: productDistLoading } = useGetDashboardProductDistribution({ query: { queryKey: getGetDashboardProductDistributionQueryKey() } });

  if (statsLoading) {
    return <div className="h-full w-full flex items-center justify-center"><Spinner className="size-8" /></div>;
  }

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-revenue">${stats?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {stats?.revenueGrowth && stats.revenueGrowth > 0 ? (
                <span className="text-emerald-500 flex items-center"><ArrowUpRight className="size-3 mr-1" />{stats.revenueGrowth}%</span>
              ) : (
                <span className="text-rose-500 flex items-center"><ArrowDownRight className="size-3 mr-1" />{Math.abs(stats?.revenueGrowth || 0)}%</span>
              )}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-users">{stats?.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.activeUsers.toLocaleString()} active users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-products">{stats?.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 text-rose-500">
              {stats?.lowStockProducts} low in stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-customers">{stats?.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats?.newCustomersThisMonth} this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Revenue and orders over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {salesLoading ? (
              <div className="h-full flex items-center justify-center"><Spinner /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sales} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} name="Sales ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users registered per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {userGrowthLoading ? (
              <div className="h-full flex items-center justify-center"><Spinner /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowth} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Users" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {productDistLoading ? (
              <div className="h-full flex items-center justify-center"><Spinner /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="category"
                  >
                    {productDist?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="h-[300px] flex items-center justify-center"><Spinner /></div>
            ) : (
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4">
                {activity?.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                      {item.type === 'user_registered' && <Users className="h-4 w-4 text-primary" />}
                      {item.type === 'product_added' && <Package className="h-4 w-4 text-primary" />}
                      {item.type === 'customer_created' && <Building2 className="h-4 w-4 text-primary" />}
                      {item.type === 'order_placed' && <DollarSign className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.entityName} • {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
                {activity?.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    No recent activity
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
