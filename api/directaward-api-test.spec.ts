import { test } from './fixtures/api.fixture';
import { expect } from '@playwright/test';
import {
  CreateBundleRequest,
  DirectAwardDeleteRequest,
} from './directaward-api-client';

let bundle_entity_id: string;
let first_da_entity_id: string;

test.describe('Create DirectAward API', () => {
  test('should create a directaward', async ({
    directAwardApiClient: client,
  }) => {
    const newDA: CreateBundleRequest = {
      badgeclass: '9yykCyxiQA2j59enkLAQxg',
      direct_awards: [
        {
          eppn: '',
          recipient_email: 'test@edubadges.nl',
        },
      ],
      sis_user_id: 'joseph+wheeler',
      batch_mode: false,
      lti_import: false,
      status: 'Active',
      identifier_type: 'eppn',
      notify_recipients: false,
    };

    const createdDirectAwards = await client.createBundle(newDA);
    expect(createdDirectAwards.entity_id).toBeDefined();
    bundle_entity_id = createdDirectAwards.entity_id;
  });
  test('get bundle information', async ({ directAwardApiClient: client }) => {
    const bundle = await client.getBundle(bundle_entity_id);
    expect(bundle.assertion_count).toEqual(1);
    const firstDA = bundle.direct_awards[0];
    expect(firstDA.entity_id).toBeDefined();
    first_da_entity_id = firstDA.entity_id;
    expect(firstDA.status).toEqual('Active');
  });
  test('directaward deletion scenarios', async ({
    directAwardApiClient: client,
  }) => {
    const daToDelete: DirectAwardDeleteRequest = {
      revocation_reason: 'Test deletion',
      direct_awards: [{ entity_id: first_da_entity_id }],
    };
    // Delete the DA
    const deleteResponse = await client.deleteDirectAwards(daToDelete);
    expect(deleteResponse.result).toBe('ok');

    // Verify the DA is deleted in the bundle
    const getDABundle = await client.getBundle(bundle_entity_id);
    expect(getDABundle.direct_award_deleted_count).toBe(1);

    //const deleteNonExistentPromise = client.deleteRoom(99999);
    //await expect(deleteNonExistentPromise).rejects.toThrow(/404/);
  });
});
