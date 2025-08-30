export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  // Add other user properties like role, etc.
}

// Type for the context value that will be provided to components
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, newToken: string) => void;
  logout: () => void;
}