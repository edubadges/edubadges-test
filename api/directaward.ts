import { BaseApiClient } from './base-api-client';
import { FetchConfig, FetchResponse } from './fetch-helpers';
import type { components } from './types/edubadges';
import { APIRequestContext } from '@playwright/test';
import { expect } from './api-expects';
import { API_STATUSES } from './api-statuses';

export type Bundle = components['schemas']['DirectAwardBundle'];

export const CREATE_DA_API_URL = new URL(
  '/create/',
  process.env.DA_BASE_URL,
).toString();

export class CreateDAApiClient extends BaseApiClient {
  constructor(config: FetchConfig, request: APIRequestContext) {
    super(config, request, '/create/');
  }

  async getRoomsRaw(params?: Bundle): Promise<FetchResponse<Rooms>> {
    return this.makeRequest<Bundle, never>(this.basePath, {
      method: 'POST',
      params,
    });
  }

  async getRooms(params?: Bundle): Promise<Bundle> {
    const response = await this.getRoomsRaw(params);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async getBundleRaw(id: number): Promise<FetchResponse<Bundle>> {
    return this.makeRequest<Bundle, never>(`${this.basePath}${id}`, {
      method: 'GET',
    });
  }

  async getBundle(id: number): Promise<Room> {
    const response = await this.getBundleRaw(id);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async createRoomRaw(data: Bundle): Promise<FetchResponse<Bundle>> {
    return this.makeRequest<Bundle, Bundle>(this.basePath, {
      method: 'POST',
      data,
    });
  }

  async createRoom(data: Bundle): Promise<Bundle> {
    const response = await this.createRoomRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    return response.data;
  }

  async deleteRoomRaw(id: number): Promise<FetchResponse<null>> {
    return this.makeRequest<null, never>(`${this.basePath}${id}`, {
      method: 'DELETE',
    });
  }

  async deleteRoom(id: number): Promise<void> {
    const response = await this.deleteRoomRaw(id);
    expect(response).toHaveStatusCode(API_STATUSES.ACCEPTED_202_STATUS);
  }
}

export function createDAApiClient(
  request: APIRequestContext,
  cookies = '',
  token = '',
): CreateDAApiClient {
  const config: FetchConfig = {
    baseURL: CREATE_DA_API_URL,
    headers: {
      'X-api-version': '1.0',
      'content-type': 'application/json;charset=UTF-8',
      Cookie: cookies,
      Authorization: token ? `Bearer ${process.env.TOKEN}` : '',
    },
    validateStatus: () => true,
  };
  return new CreateDAApiClient(config, request);
}
