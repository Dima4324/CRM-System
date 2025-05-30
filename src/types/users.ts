export interface UserRegistration { 
  username: string;
  login: string; 
  password: string; 
  email: string; 
  phoneNumber?: string; 
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string; 
}

export interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  roles: Role[]; 
  phoneNumber?: string; 
}

export interface ProfileRequest { 
  username: string; 
  email: string; 
  phoneNumber: string; 
}

export interface PasswordRequest { 
  password: string; 
}

export interface Token {
 accessToken: string
 refreshToken: string
}

type ADMIN = "ADMIN"
type USER = "USER"
type MODERATOR = "MODERATOR"

export type Role = ADMIN | USER | MODERATOR