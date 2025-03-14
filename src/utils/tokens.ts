import { api } from "./burger-api";

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function setTokens(response: TokensResponse): void {
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
}

export function removeTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function updateTokens() {
  const refreshToken = getAccessToken();
  if (refreshToken) {
    const response: TokensResponse = await api.updateToken(refreshToken) as TokensResponse;
    setTokens(response);
  }
}