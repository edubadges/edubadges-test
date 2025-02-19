import { test as base } from '@playwright/test';
import {
  createDirectAwardApiClient,
  DirectAwardApiClient,
} from '../directaward-api-client';

interface ApiFixtures {
  directAwardApiClient: DirectAwardApiClient;
}

export const test = base.extend<ApiFixtures>({
  directAwardApiClient: async ({ request }, use) => {
    const directAwardApiClient = createDirectAwardApiClient(
      request,
      '',
      `Bearer ${process.env.TOKEN}`,
    );
    await use(directAwardApiClient);
  },
});
