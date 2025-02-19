import {
  FetchConfig,
  FetchOptions,
  FetchResponse,
  fetchWithConfig,
} from './fetch-helpers';
import { APIRequestContext } from '@playwright/test';

export type RequestParams<TData = unknown> = Omit<
  FetchOptions<TData>,
  'data'
> & {
  data?: TData;
};

export class BaseApiClient {
  protected request: APIRequestContext;
  protected config: FetchConfig;

  constructor(config: FetchConfig, request: APIRequestContext) {
    this.config = config;
    this.request = request;
  }

  // So D (request) is extended with T (response).
  protected async makeRequest<T, D>(
    endpoint: string,
    options: RequestParams<D> = {},
  ): Promise<FetchResponse<T>> {
    const url = new URL(endpoint, process.env.DA_BASE_URL).toString();
    return fetchWithConfig<T, D>(this.request, url, {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    });
  }
}
