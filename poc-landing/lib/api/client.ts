import { FETCH_TIMEOUT, FETCH_RETRY_ATTEMPTS } from '@/lib/constants';

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new FetchError(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

async function fetchWithRetry(
  url: string,
  options: FetchOptions = {},
  retries: number
): Promise<Response> {
  const timeout = options.timeout ?? FETCH_TIMEOUT;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);

      if (!response.ok) {
        throw new FetchError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError ?? new Error('Unknown error');
}

export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const retries = options.retries ?? FETCH_RETRY_ATTEMPTS;
  const { timeout, retries: _, ...fetchOptions } = options;

  const response = await fetchWithRetry(url, options, retries);
  const data = await response.json();

  return data as T;
}
