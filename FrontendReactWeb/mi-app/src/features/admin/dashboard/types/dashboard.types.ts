export type UserRole = 'admin' | 'moderator' | 'user';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type StatType = 'users' | 'revenue' | 'invoices' | 'pending' | 'moderators' | 'overdue';
export type Period = 'week' | 'month' | 'year';
export type ActivityType =
  | 'user_created'
  | 'invoice_paid'
  | 'invoice_overdue'
  | 'moderator_added'
  | 'report_flagged';

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  type: StatType;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
}

export interface RecentActivity {
  id: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: string;
}

export interface ChartDataPoint {
  label: string;
  sales: number;
  collections: number;
  pending: number;
}

export interface DashboardData {
  stats: StatCard[];
  recentUsers: RecentUser[];
  recentActivity: RecentActivity[];
  chartData: ChartDataPoint[];
  totalUsers: number;
  totalModerators: number;
  systemHealth: number;
}