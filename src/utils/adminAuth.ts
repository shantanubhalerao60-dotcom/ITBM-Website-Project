import type { AdminSession } from '../types/admin';

export const DEMO_ADMIN_EMAIL = 'admin@hyuga-demo.com';
export const DEMO_ADMIN_PASSWORD = 'admin2026';

const ADMIN_SESSION_STORAGE_KEY = 'nutritrust_admin_session';

/**
 * Retrieve active admin session from localStorage
 */
export function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (session && session.email && session.token) {
      return session;
    }
    return null;
  } catch (err) {
    console.error('Failed to parse admin session:', err);
    return null;
  }
}

/**
 * Persist admin session in localStorage
 */
export function setStoredAdminSession(session: AdminSession): void {
  try {
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to persist admin session:', err);
  }
}

/**
 * Clear admin session from localStorage
 */
export function clearStoredAdminSession(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove admin session:', err);
  }
}

/**
 * Validate admin credentials and return session payload if correct
 */
export function validateAdminCredentials(
  email: string,
  password: string
): { success: boolean; session?: AdminSession; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return {
      success: false,
      error: 'Please enter both your work email and password.',
    };
  }

  if (
    normalizedEmail === DEMO_ADMIN_EMAIL.toLowerCase() &&
    normalizedPassword === DEMO_ADMIN_PASSWORD
  ) {
    const session: AdminSession = {
      email: DEMO_ADMIN_EMAIL,
      name: 'Operations Director',
      role: 'Staff Lead',
      token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      loginTime: new Date().toISOString(),
    };
    return { success: true, session };
  }

  return {
    success: false,
    error: 'Invalid admin credentials. Use the 1-click "Demo Fill" button or verify credentials.',
  };
}
