const AUTH_KEY = 'buhari_hotel_auth';

export type Credentials = { username: string; password: string };

export const DEMO_CREDENTIALS: Credentials = {
  username: 'demo@buhari.com',
  password: 'demo123',
};


/**
 * Checks if the user is logged in.
 * If the user is logged in, window.localStorage.getItem(AUTH_KEY) will return '1'.
 * If the user is not logged in, window.localStorage.getItem(AUTH_KEY) will return null.
 * If the browser does not support localStorage, this function will return false.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(AUTH_KEY) === '1';
  } catch {
    return false;
  }
}


/**
 * Logs the user in if the credentials are valid.
 * @param {Credentials} credentials - The username and password to log in with.
 * @returns {{ success: boolean; message: string }} - An object containing a boolean indicating whether the login was successful and a string containing an error message if the login was not successful.
 */

export function login({ username, password }: Credentials): { success: boolean; message: string } {
  if (typeof window === 'undefined') return { success: false, message: 'Unavailable' };

  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    window.localStorage.setItem(AUTH_KEY, '1');
    return { success: true, message: 'Logged in' };
  }
  return { success: false, message: 'Invalid credentials' };
}


/**
 * Logs the user out by removing the authentication key from local storage.
 * Does nothing if the application is running in a server-side environment.
 */

export function logout(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(AUTH_KEY);
  } catch {}
}


