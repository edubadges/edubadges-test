import { BaseApiClient } from './base-api-client';
import { FetchConfig, FetchResponse } from './fetch-helpers';
import type { components } from './types/edubadges';
import { APIRequestContext } from '@playwright/test';
import { expect } from './api-expects';
import { API_STATUSES } from './api-statuses';

export type CreateBundleRequest =
  components['schemas']['DirectAwardCreateBundleRequest'];
export type CreateBundleResponse =
  components['schemas']['DirectAwardCreateBundleResponse'];
export type GetBundleResponse =
  components['schemas']['DirectAwardGetBundleResponse'];
export type DirectAwardDeleteRequest =
  components['schemas']['DirectAwardDeleteRequest'];
export type DirectAwardDeleteResponse =
  components['schemas']['DirectAwardDeleteResponse'];

export class DirectAwardApiClient extends BaseApiClient {
  async getBundleRaw(
    entity_id: string,
  ): Promise<FetchResponse<GetBundleResponse>> {
    return this.makeRequest<GetBundleResponse, never>(`/bundle/${entity_id}`, {
      method: 'GET',
    });
  }

  async getBundle(entity_id: string): Promise<GetBundleResponse> {
    const response = await this.getBundleRaw(entity_id);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async createBundleRaw(
    data: CreateBundleRequest,
  ): Promise<FetchResponse<CreateBundleResponse>> {
    return this.makeRequest<CreateBundleResponse, CreateBundleRequest>(
      '/create',
      {
        method: 'POST',
        data,
      },
    );
  }

  async createBundle(data: CreateBundleRequest): Promise<CreateBundleResponse> {
    const response = await this.createBundleRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    return response.data;
  }

  async deleteDirectAwardsRaw(
    data: DirectAwardDeleteRequest,
  ): Promise<FetchResponse<DirectAwardDeleteResponse>> {
    return this.makeRequest<
      DirectAwardDeleteResponse,
      DirectAwardDeleteRequest
    >(`/delete-direct-awards`, {
      method: 'PUT',
      data,
    });
  }

  async deleteDirectAwards(
    data: DirectAwardDeleteRequest,
  ): Promise<DirectAwardDeleteResponse> {
    const response = await this.deleteDirectAwardsRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }
}

export function createDirectAwardApiClient(
  request: APIRequestContext,
  cookies = '',
  token = '',
): DirectAwardApiClient {
  const config: FetchConfig = {
    headers: {
      'X-api-version': '1.0',
      'content-type': 'application/json;charset=UTF-8',
      Cookie: cookies,
      Authorization: token ? `Bearer ${process.env.TOKEN}` : '',
    },
    validateStatus: () => true,
  };
  return new DirectAwardApiClient(config, request);
}
