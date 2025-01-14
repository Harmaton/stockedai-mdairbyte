
interface JWTPayload {
  sub?: string;
  iat?: number;
  exp?: number;
  email?: string;
  name?: string;
}

export function parseJwt(token: string): JWTPayload {
  try {
    // Verify token format
    if (!token || !token.includes('.')) {
      throw new Error('Invalid token format');
    }

    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token payload');
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Fix the padding properly
    const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

    const jsonPayload = decodeURIComponent(
      atob(paddedBase64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as JWTPayload;
  } catch (error) {
    console.error('Error parsing JWT:', error);
    throw new Error('Failed to parse JWT token');
  }
}