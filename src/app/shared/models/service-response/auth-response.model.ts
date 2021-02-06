export interface SignInResponse {
  user: User;
  token: string;
}
export interface User {
  name: string;
  email: string;
  role: string;
  mess: string;
}
