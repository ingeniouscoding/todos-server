export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
  refreshToken?: string;
}
