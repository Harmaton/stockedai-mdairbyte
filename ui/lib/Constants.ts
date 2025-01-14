export function parseJwt(token: string): Record<string, any> {
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
    
    // Create the base64 padding if needed
    const pad = base64.length % 4;
    if (pad) {
      base64 + '='.repeat(4 - pad);
    }

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    throw new Error('Failed to parse JWT token');
  }
}