import { test } from '../../api/fixtures/api.fixture';
import { expect } from '@playwright/test';
import {
  CreateBundleRequest,
  DirectAwardDeleteRequest,
} from '../../api/directaward-api-client';

let bundle_entity_id: string;
let first_da_entity_id: string;

let badgeclass_id = 'FmNuXeojSp2O_5vpOgbCRw'; // fetch id from previous UI test
const newDA: CreateBundleRequest = {
  badgeclass: badgeclass_id,
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

test.describe.serial('Create DirectAward API', () => {
  test('should create a directaward', async ({
    directAwardApiClient: client,
  }) => {
    const createdDirectAwards = await client.createBundleSuccess(newDA);
    expect(createdDirectAwards.entity_id).toBeDefined();
    bundle_entity_id = createdDirectAwards.entity_id;

    // Try to create duplicate, needs to fail
    const createdDirectAwardsFail = await client.createBundleFail(newDA);
    expect(createdDirectAwardsFail.error).toBe(
      "No valid DirectAwards are created. All of them were rejected: [{'error': 'DirectAward with this eppn/email and status Unaccepted already exists for this badgeclass.', 'eppn': 'student19@university-example.org', 'email': 'test@example.com'}]",
    );
  });
  test('get bundle information', async ({ directAwardApiClient: client }) => {
    const bundle = await client.getBundle(bundle_entity_id);
    expect(bundle.direct_award_count).toBe(1);
    const firstDA = bundle.direct_awards[0];
    expect(firstDA.entity_id).toBeDefined();
    first_da_entity_id = firstDA.entity_id;
    expect(firstDA.status).toBe('Unaccepted');
  });
  test('directaward deletion', async ({ directAwardApiClient: client }) => {
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
  });
  test('recreate direct award, then accept as user', async ({
    directAwardApiClient: client,
  }) => {
    // first create
    const createdDirectAwards = await client.createBundleSuccess(newDA);
    expect(createdDirectAwards.entity_id).toBeDefined();
    bundle_entity_id = createdDirectAwards.entity_id;

    // then get bundle information as we need entity_id
    const bundle = await client.getBundle(bundle_entity_id);
    const firstDA = bundle.direct_awards[0];
    first_da_entity_id = firstDA.entity_id;

    // then accept
    // how to authenticate as user? use previous UI tests?
    //const acceptResponse = await client.acceptDirectAward(first_da_entity_id);
    //expect(acceptResponse.rejected).toBe('false');
  });
  // other test cases: resend, edit, do not accept
});
