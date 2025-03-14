import { TTokenResponse } from "./api-types";
import { api } from "./burger-api";

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function setTokens(response: TTokenResponse): void {
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
}

export function removeTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function updateTokens(): Promise<void> {
  const refreshToken = getAccessToken();
  if (refreshToken) {
    try {
      const response: TTokenResponse = await api.updateToken(refreshToken);
      setTokens(response);
    }
    catch {
      removeTokens();
    }
  }
}