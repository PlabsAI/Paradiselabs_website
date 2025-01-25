import bcryptjs from 'bcryptjs';

// In a real app, these would be in a secure database
const ADMIN_EMAIL = 'admin@paradiselabs.com';
const ADMIN_PASSWORD_HASH = '$2a$10$YourHashedPasswordHere'; // We'll update this

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const validateCredentials = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // Email validation
    if (email !== ADMIN_EMAIL) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    // Password validation (temporary for development)
    if (password !== 'admin') {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    // Generate JWT token (we'll implement this later)
    const token = 'temporary-token';

    return {
      success: true,
      message: 'Login successful',
      token,
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      success: false,
      message: 'An error occurred during authentication',
    };
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};
