import { APIRequestContext, BrowserContext, expect } from '@playwright/test';
import { test } from '../../../fixtures/directAwardApiFixture';
import { postJsonWithCsrf, putJsonWithCsrf } from '../../../util/apiRequestHelpers';
import { getBadgeclassEntityIdAndTermsEntityId } from '../../../util/graphQlHelpers';

const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error('Missing BASE_URL env var for DirectAward API tests.');
}

const badgeclassName = 'Circulation and Breathing';
const revocationReason = 'Playwright DirectAward API test revocation reason';

async function createDirectAwardBundle(params: {
  staffRequest: APIRequestContext;
  staffContext: BrowserContext;
  badgeclassEntityId: string;
  recipientEmail: string;
  recipientEppn: string;
}) {
  const { staffRequest, staffContext, badgeclassEntityId, recipientEmail, recipientEppn } = params;
  return postJsonWithCsrf(staffRequest, staffContext, '/directaward/create', {
    badgeclass: badgeclassEntityId,
    direct_awards: [{ recipient_email: recipientEmail, eppn: recipientEppn }],
    batch_mode: true,
    notify_recipients: true,
    identifier_type: 'eppn',
  });
}

async function deleteDirectAward(params: {
  staffRequest: APIRequestContext;
  staffContext: BrowserContext;
  directAwardEntityId: string;
}) {
  const { staffRequest, staffContext, directAwardEntityId } = params;
  return putJsonWithCsrf(staffRequest, staffContext, '/directaward/delete-direct-awards', {
    revocation_reason: revocationReason,
    direct_awards: [{ entity_id: directAwardEntityId }],
  });
}

test.describe.serial('DirectAward REST API', () => {
  test('create: success + failure when all direct awards conflict', async ({ directAwardApi }) => {
    const { staffRequest, staffContext, studentAccount } = directAwardApi;
    const { badgeclassEntityId } = await getBadgeclassEntityIdAndTermsEntityId(staffRequest, staffContext, badgeclassName);

    const create1 = await createDirectAwardBundle({
      staffRequest,
      staffContext,
      badgeclassEntityId,
      recipientEmail: studentAccount.email,
      recipientEppn: studentAccount.EPPN,
    });
    expect(create1.status()).toBe(201);
    const create1Json = await create1.json();
    const bundleEntityId = create1Json.entity_id as string;
    expect(bundleEntityId).toBeTruthy();

    const bundle1 = await staffRequest.get(`${baseUrl}/directaward/bundle/${bundleEntityId}`);
    expect(bundle1.status()).toBe(200);
    const bundle1Json = await bundle1.json();
    const directAwardEntityId = bundle1Json.direct_awards[0].entity_id as string;
    expect(directAwardEntityId).toBeTruthy();

    const create2 = await postJsonWithCsrf(staffRequest, staffContext, '/directaward/create', {
      badgeclass: badgeclassEntityId,
      direct_awards: [
        { recipient_email: studentAccount.email, eppn: studentAccount.EPPN },
        { recipient_email: studentAccount.email, eppn: studentAccount.EPPN },
      ],
      batch_mode: true,
      notify_recipients: true,
      identifier_type: 'eppn',
    });
    expect(create2.status()).toBe(400);

    const deleteRes = await deleteDirectAward({
      staffRequest,
      staffContext,
      directAwardEntityId,
    });
    expect(deleteRes.status()).toBe(200);
  });

  test('bundle: accept requires terms, then accept succeeds', async ({ directAwardApi }) => {
    const { staffRequest, staffContext, studentRequest, studentContext, studentAccount } = directAwardApi;
    const { badgeclassEntityId, termsEntityId } = await getBadgeclassEntityIdAndTermsEntityId(
      staffRequest,
      staffContext,
      badgeclassName,
    );

    const create = await createDirectAwardBundle({
      staffRequest,
      staffContext,
      badgeclassEntityId,
      recipientEmail: studentAccount.email,
      recipientEppn: studentAccount.EPPN,
    });
    expect(create.status()).toBe(201);
    const createJson = await create.json();
    const bundleEntityId = createJson.entity_id as string;

    const bundleRes1 = await staffRequest.get(`${baseUrl}/directaward/bundle/${bundleEntityId}`);
    expect(bundleRes1.status()).toBe(200);
    const bundleJson1 = await bundleRes1.json();
    const directAwardEntityId = bundleJson1.direct_awards[0].entity_id as string;
    expect(bundleJson1.direct_awards[0].status).toBe('Unaccepted');

    const acceptWithoutTerms = await postJsonWithCsrf(
      studentRequest,
      studentContext,
      `/directaward/accept/${directAwardEntityId}`,
      { accept: true },
    );
    expect(acceptWithoutTerms.status()).toBe(422);

    const acceptTerms = await postJsonWithCsrf(studentRequest, studentContext, '/user/terms/accept', [
      { terms_entity_id: termsEntityId, accepted: true },
    ]);
    expect(acceptTerms.status()).toBe(201);

    const acceptWithTerms = await postJsonWithCsrf(
      studentRequest,
      studentContext,
      `/directaward/accept/${directAwardEntityId}`,
      { accept: true },
    );
    expect(acceptWithTerms.status()).toBe(201);
    const acceptJson = await acceptWithTerms.json();
    expect(acceptJson.entity_id).toBeTruthy();

    const bundleRes2 = await staffRequest.get(`${baseUrl}/directaward/bundle/${bundleEntityId}`);
    expect(bundleRes2.status()).toBe(200);
    const bundleJson2 = await bundleRes2.json();
    expect(bundleJson2.direct_awards.length).toBe(0);
    expect(bundleJson2.direct_award_count).toBe(0);
  });

  test('revoke + delete: direct award status transitions', async ({ directAwardApi }) => {
    const { staffRequest, staffContext, studentAccount } = directAwardApi;
    const { badgeclassEntityId } = await getBadgeclassEntityIdAndTermsEntityId(staffRequest, staffContext, badgeclassName);

    const createForRevoke = await createDirectAwardBundle({
      staffRequest,
      staffContext,
      badgeclassEntityId,
      recipientEmail: studentAccount.email,
      recipientEppn: studentAccount.EPPN,
    });
    expect(createForRevoke.status()).toBe(201);
    const revokeBundleEntityId = (await createForRevoke.json()).entity_id as string;

    const revokeBundleRes1 = await staffRequest.get(`${baseUrl}/directaward/bundle/${revokeBundleEntityId}`);
    expect(revokeBundleRes1.status()).toBe(200);
    const directAwardEntityIdToRevoke = (await revokeBundleRes1.json()).direct_awards[0].entity_id as string;

    const revokeRes = await postJsonWithCsrf(staffRequest, staffContext, '/directaward/revoke-direct-awards', {
      revocation_reason: revocationReason,
      direct_awards: [{ entity_id: directAwardEntityIdToRevoke }],
    });
    expect(revokeRes.status()).toBe(200);

    const revokeBundleRes2 = await staffRequest.get(`${baseUrl}/directaward/bundle/${revokeBundleEntityId}`);
    expect(revokeBundleRes2.status()).toBe(200);
    const revokeBundleJson2 = await revokeBundleRes2.json();
    expect(revokeBundleJson2.direct_awards[0].status).toBe('Revoked');

    const createForDelete = await createDirectAwardBundle({
      staffRequest,
      staffContext,
      badgeclassEntityId,
      recipientEmail: studentAccount.email,
      recipientEppn: studentAccount.EPPN,
    });
    expect(createForDelete.status()).toBe(201);
    const deleteBundleEntityId = (await createForDelete.json()).entity_id as string;

    const deleteBundleRes1 = await staffRequest.get(`${baseUrl}/directaward/bundle/${deleteBundleEntityId}`);
    expect(deleteBundleRes1.status()).toBe(200);
    const directAwardEntityIdToDelete = (await deleteBundleRes1.json()).direct_awards[0].entity_id as string;

    const deleteRes = await deleteDirectAward({
      staffRequest,
      staffContext,
      directAwardEntityId: directAwardEntityIdToDelete,
    });
    expect(deleteRes.status()).toBe(200);

    const deleteBundleRes2 = await staffRequest.get(`${baseUrl}/directaward/bundle/${deleteBundleEntityId}`);
    expect(deleteBundleRes2.status()).toBe(200);
    const deleteBundleJson2 = await deleteBundleRes2.json();
    expect(deleteBundleJson2.direct_awards[0].status).toBe('Deleted');
  });

  test('audittrail: requires superuser', async ({ directAwardApi }) => {
    const { staffRequest } = directAwardApi;
    const auditRes = await staffRequest.get(`${baseUrl}/directaward/audittrail`);
    expect(auditRes.status()).toBe(403);
  });
});
