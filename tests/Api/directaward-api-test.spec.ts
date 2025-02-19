import { test } from '../../api/fixtures/api.fixture';
import { expect } from '@playwright/test';
import {
  CreateBundleRequest,
  DirectAwardDeleteRequest,
} from '../../api/directaward-api-client';

let bundle_entity_id: string;
let first_da_entity_id: string;

test.describe.serial('Create DirectAward API', () => {
  test('should create a directaward', async ({
    directAwardApiClient: client,
  }) => {
    const newDA: CreateBundleRequest = {
      badgeclass: 'xsKfN1rlRdCRh3X8S3yk-w',
      direct_awards: [
        {
          eppn: 'student19@university-example.org',
          recipient_email: 'test@example.com',
        },
      ],
      sis_user_id: 'joseph+weeler',
      batch_mode: false,
      lti_import: false,
      status: 'Active',
      identifier_type: 'eppn',
      notify_recipients: false,
    };

    const createdDirectAwards = await client.createBundle(newDA);
    expect(createdDirectAwards.entity_id).toBeDefined();
    bundle_entity_id = createdDirectAwards.entity_id;

    // Try to create duplicate, needs to fail
    //const createdDirectAwardsFail = await client.createBundle(newDA);
    //await expect(createdDirectAwardsFail).rejects.toThrow(/400/);
  });
  test('get bundle information', async ({ directAwardApiClient: client }) => {
    console.log(bundle_entity_id);
    const bundle = await client.getBundle(bundle_entity_id);
    console.log(bundle);
    expect(bundle.direct_award_count).toBe(1);
    const firstDA = bundle.direct_awards[0];
    expect(firstDA.entity_id).toBeDefined();
    first_da_entity_id = firstDA.entity_id;
    console.log(firstDA);
    expect(firstDA.status).toBe('Unaccepted');
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
