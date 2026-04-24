import { APIRequestContext, BrowserContext } from '@playwright/test';

type GraphQlErrorShape = {
  message?: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
};

type BadgeclassTermsResult = {
  badgeclassEntityId: string;
  termsEntityId: string;
};

const CSRF_COOKIE_NAME = 'csrftoken';

function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('Missing BASE_URL env var for Playwright GraphQL calls.');
  }
  return baseUrl;
}

function getOrigin(baseUrl: string): string {
  return new URL(baseUrl).origin;
}

async function getCsrfTokenFromContext(context: BrowserContext): Promise<string> {
  const cookies = await context.cookies();
  const csrfCookie = cookies.find((c) => c.name === CSRF_COOKIE_NAME);
  if (!csrfCookie) {
    throw new Error(
      `CSRF cookie "${CSRF_COOKIE_NAME}" not found. Ensure the session is authenticated and CSRF cookie is set.`,
    );
  }
  return csrfCookie.value;
}

async function graphqlPost<T>(
  request: APIRequestContext,
  context: BrowserContext,
  query: string,
  variables?: unknown
): Promise<T> {
  const baseUrl = getBaseUrl();
  const csrfToken = await getCsrfTokenFromContext(context);
  const origin = getOrigin(baseUrl);

  const response = await request.post(`${baseUrl}/graphql`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRFToken': csrfToken,
      Origin: origin,
      Referer: `${baseUrl}/`,
    },
    data: {
      query,
      variables,
    },
  });

  const json = (await response.json()) as { data?: T; errors?: GraphQlErrorShape[] };
  if (json.errors && json.errors.length > 0) {
    throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);
  }
  if (!json.data) {
    throw new Error('GraphQL response missing "data" payload.');
  }

  return json.data;
}

export async function getBadgeclassEntityIdAndTermsEntityId(
  request: APIRequestContext,
  context: BrowserContext,
  badgeclassName: string,
): Promise<BadgeclassTermsResult> {
  const query = `
    query GetBadgeClassesForTerms {
      badgeClasses {
        entityId
        name
        terms {
          entityId
        }
      }
    }
  `;

  const data = await graphqlPost<{
    badgeClasses: Array<{
      entityId: string;
      name: string;
      terms: { entityId: string } | null;
    }>;
  }>(request, context, query);

  const match = data.badgeClasses.find((bc) => bc.name === badgeclassName);
  if (!match) {
    throw new Error(`Badgeclass "${badgeclassName}" not found via GraphQL badgeClasses[].name`);
  }
  if (!match.terms?.entityId) {
    throw new Error(`Badgeclass "${badgeclassName}" missing terms.entityId in GraphQL response`);
  }

  return {
    badgeclassEntityId: match.entityId,
    termsEntityId: match.terms.entityId,
  };
}
