import { APIRequestContext, APIResponse, BrowserContext } from '@playwright/test';

const CSRF_COOKIE_NAME = 'csrftoken';

function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('Missing BASE_URL env var for Playwright API tests.');
  }
  return baseUrl;
}

function getOrigin(baseUrl: string): string {
  return new URL(baseUrl).origin;
}

export async function getCsrfTokenFromContext(context: BrowserContext): Promise<string> {
  const cookies = await context.cookies();
  const csrfCookie = cookies.find((c) => c.name === CSRF_COOKIE_NAME);
  if (!csrfCookie) {
    throw new Error(
      `CSRF cookie "${CSRF_COOKIE_NAME}" not found. Ensure the session is authenticated and CSRF cookie is set.`,
    );
  }
  return csrfCookie.value;
}

export async function postJsonWithCsrf(
  request: APIRequestContext,
  context: BrowserContext,
  path: string,
  body: unknown,
): Promise<APIResponse> {
  const baseUrl = getBaseUrl();
  const csrfToken = await getCsrfTokenFromContext(context);
  const origin = getOrigin(baseUrl);

  return request.post(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRFToken': csrfToken,
      Origin: origin,
      Referer: `${baseUrl}/`,
    },
    data: body,
  });
}

export async function putJsonWithCsrf(
  request: APIRequestContext,
  context: BrowserContext,
  path: string,
  body: unknown,
): Promise<APIResponse> {
  const baseUrl = getBaseUrl();
  const csrfToken = await getCsrfTokenFromContext(context);
  const origin = getOrigin(baseUrl);

  return request.put(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRFToken': csrfToken,
      Origin: origin,
      Referer: `${baseUrl}/`,
    },
    data: body,
  });
}

export async function postJson(
  request: APIRequestContext,
  path: string,
  body: unknown,
): Promise<APIResponse> {
  const baseUrl = getBaseUrl();
  return request.post(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: body,
  });
}

