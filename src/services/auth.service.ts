import type { User } from '@/types/user.type';
import ky from './ky.instance';

export function authLogin(payload: unknown) {
  const url = new URL(
    'https://75g.bab.myftpupload.com/wp-json/custom/v1/login'
  );
  return ky.post(url, { json: payload }).json<{
    success: boolean;
    message: string;
    user: User;
  }>();
}
