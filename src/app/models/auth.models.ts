import { User } from './measurement.models';

export interface LoginResponse {
  token: string;
  username: string;
}

export interface SignupResponse {
  // Define based on what the backend returns for signup if needed
  [key: string]: any;
}
