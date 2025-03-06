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
export type CreateBundleBadRequestResponse =
  components['schemas']['DirectAwardCreateBundleBadRequestRepsonse'];
export type GetBundleResponse =
  components['schemas']['DirectAwardGetBundleResponse'];
export type DirectAwardDeleteRequest =
  components['schemas']['DirectAwardDeleteRequest'];
export type DirectAwardDeleteResponse =
  components['schemas']['DirectAwardDeleteResponse'];
export type DirectAwardAcceptRequest =
  components['schemas']['DirectAwardAcceptRequest'];
export type DirectAwardAcceptRejectedResponse =
  components['schemas']['DirectAwardAcceptRejectedResponse'];
export type UpdateBundleRequest =
  components['schemas']['DirectAwardUpdateBundleRequest'];
export type UpdateBundleResponse =
  components['schemas']['DirectAwardUpdateSuccessResponse'];

export class DirectAwardApiClient extends BaseApiClient {
  async getBundleRaw(
    entity_id: string,
  ): Promise<FetchResponse<GetBundleResponse>> {
    return this.makeRequest<GetBundleResponse, never>(`bundle/${entity_id}`, {
      method: 'GET',
    });
  }

  async acceptDirectAward(
    entity_id: string,
  ): Promise<DirectAwardAcceptRejectedResponse> {
    const response = await this.acceptDirectAwardRaw({
      entity_id: entity_id,
      accept: true,
    });
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async rejectDirectAward(
    entity_id: string,
  ): Promise<DirectAwardAcceptRejectedResponse> {
    const response = await this.acceptDirectAwardRaw({
      entity_id: entity_id,
      accept: false,
    });
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async acceptDirectAwardRaw(
    data: DirectAwardAcceptRequest,
  ): Promise<FetchResponse<DirectAwardAcceptRejectedResponse>> {
    return this.makeRequest<
      DirectAwardAcceptRejectedResponse,
      DirectAwardAcceptRequest
    >(`accept/${data.entity_id}`, {
      method: 'POST',
      data,
    });
  }

  async getBundle(entity_id: string): Promise<GetBundleResponse> {
    const response = await this.getBundleRaw(entity_id);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async updateBundleRaw(
    data: UpdateBundleRequest,
  ): Promise<FetchResponse<UpdateBundleResponse>> {
    return this.makeRequest<UpdateBundleResponse, UpdateBundleRequest>(
      `edit/${data.entity_id}`,
      {
        method: 'PUT',
        data,
      },
    );
  }

  async updateBundleSuccess(
    data: UpdateBundleRequest,
  ): Promise<UpdateBundleResponse> {
    const response = await this.updateBundleRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    return response.data;
  }

  async createBundleRaw(
    data: CreateBundleRequest,
  ): Promise<FetchResponse<CreateBundleResponse>> {
    return this.makeRequest<CreateBundleResponse, CreateBundleRequest>(
      'create',
      {
        method: 'POST',
        data,
      },
    );
  }

  async createBundle400Raw(
    data: CreateBundleRequest,
  ): Promise<FetchResponse<CreateBundleBadRequestResponse>> {
    return this.makeRequest<
      CreateBundleBadRequestResponse,
      CreateBundleRequest
    >('create', {
      method: 'POST',
      data,
    });
  }

  async createBundleSuccess(
    data: CreateBundleRequest,
  ): Promise<CreateBundleResponse> {
    const response = await this.createBundleRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    return response.data;
  }

  async createBundleFail(
    data: CreateBundleRequest,
  ): Promise<CreateBundleBadRequestResponse> {
    const response = await this.createBundle400Raw(data);
    expect(response).toHaveStatusCode(API_STATUSES.GENERIC_400_STATUS);
    return response.data;
  }

  async deleteDirectAwardsRaw(
    data: DirectAwardDeleteRequest,
  ): Promise<FetchResponse<DirectAwardDeleteResponse>> {
    return this.makeRequest<
      DirectAwardDeleteResponse,
      DirectAwardDeleteRequest
    >(`delete-direct-awards`, {
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
      Authorization: token,
    },
    validateStatus: () => true,
  };
  return new DirectAwardApiClient(config, request);
}
