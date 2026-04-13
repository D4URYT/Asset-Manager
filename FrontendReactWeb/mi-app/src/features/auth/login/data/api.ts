import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  RevokeSessionResponse,
  SessionListResponse,
  SessionResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  ResendCodeResponse,
} from "../types/auth.types";

import { authPath, odooGet, odooPost } from "@/lib/odooApi";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> =>
    odooPost<LoginResponse>(
      authPath("/login"),
      {
        login: payload.username.trim(), // backend espera "login"
        password: payload.password,
      },
      { allowedStatuses: [400, 401] },
    ),
  forgotPassword: (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> =>
    odooPost<ForgotPasswordResponse>(
      authPath("/forgot-password"),
      payload,
      { allowedStatuses: [400, 404, 409, 429] },
    ),
  resetPassword: (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> =>
    odooPost<ResetPasswordResponse>(
      authPath("/reset-password"),
      payload,
      { allowedStatuses: [400, 404, 409, 429] },
    ),
  verifyEmail: (payload: VerifyEmailPayload): Promise<VerifyEmailResponse> =>
    odooPost<VerifyEmailResponse>(
      authPath("/verify-email"),
      payload,
      { allowedStatuses: [400, 404, 409, 429] },
    ),
  resendVerificationCode: (email: string): Promise<ResendCodeResponse> =>
    odooPost<ResendCodeResponse>(
      authPath("/verify-email/resend"),
      { email },
      { allowedStatuses: [400, 404, 409, 429] },
    ),
  getSession: (sessionToken?: string | null): Promise<SessionResponse> =>
    odooGet<SessionResponse>(
      authPath("/session"),
      { sessionToken: sessionToken ?? undefined, allowedStatuses: [401] },
    ),
  logout: (sessionToken?: string | null): Promise<LogoutResponse> =>
    odooPost<LogoutResponse>(
      authPath("/logout"),
      {},
      { sessionToken: sessionToken ?? undefined, allowedStatuses: [401] },
    ),
  listSessions: (sessionToken: string): Promise<SessionListResponse> =>
    odooGet<SessionListResponse>(
      authPath("/sessions"),
      { sessionToken, allowedStatuses: [401] },
    ),
  revokeSession: (sessionToken: string, sessionId: number): Promise<RevokeSessionResponse> =>
    odooPost<RevokeSessionResponse>(
      authPath("/sessions/revoke"),
      { session_id: sessionId },
      { sessionToken, allowedStatuses: [400, 401, 404] },
    ),
};
