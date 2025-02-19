import { FullConfig, request } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  const baseURL = process.env.AUTH_URL;

  const requestContext = await request.newContext();
  const response = await requestContext.post(`${baseURL}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`osiris.demo.edubadges.nl:nmUHSDgjuWC5OghPpipo`).toString('base64')}`,
    },
    data: 'grant_type=client_credentials&scope=edubadges.nl/sis',
  });

  const body = await response.json();
  process.env.TOKEN = body.access_token;
}

export default globalSetup;
