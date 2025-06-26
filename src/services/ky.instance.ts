/* eslint-disable @typescript-eslint/no-explicit-any */

import { getItem as localGetItem } from '@/utilities/local-storage';
import { getItem as sessionGetItem } from '@/utilities/session-storage';
import ky, { HTTPError } from 'ky';

export type ExtendedHTTPError<T = any> = HTTPError & {
  data?: T;
};

const instance = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        const isAccountSaved = localGetItem<boolean>('IS_ACCOUNT_SAVED');
        const token = isAccountSaved
          ? localGetItem<string>('TOKEN')
          : sessionGetItem<string>('TOKEN');

        if (token) {
          request.headers.set('Authorization', 'Bearer ' + token);
        }
        return request;
      },
    ],
    beforeError: [
      async (error: ExtendedHTTPError) => {
        if (
          error.response?.headers
            .get('Content-Type')
            ?.includes('application/json')
        ) {
          try {
            error.data = await error.response.json();
          } catch (jsonError) {
            // Handle cases where the error response is not valid JSON
            console.error('Failed to parse error response as JSON:', jsonError);
            error.data = await error.response.text(); // Fallback to text
          }
        } else if (error.response) {
          error.data = await error.response.text(); // Get text for non-JSON errors
        }
        return error;
      },
    ],
  },
});

export default instance;
