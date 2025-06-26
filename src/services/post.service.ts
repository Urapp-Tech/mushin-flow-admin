import { unserialize } from 'php-serialize';
import ky from './ky.instance';
import type { PaginatedData, Post } from './post.type';

export function getPost(page = 1, limit = 10, search = '') {
  page = Math.max(page, 1);
  const url = new URL(
    'https://75g.bab.myftpupload.com/wp-json/custom/v1/get-search-post'
  );
  url.searchParams.append('post_type', 'cfkef-entries');
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());
  if (search) url.searchParams.append('search', search);
  url.searchParams.append('timestamp', Date.now().toString());

  return ky
    .get(url)
    .json<PaginatedData<'posts', Post>>()
    .then((response) => ({
      page: response.page,
      limit: response.limit,
      total: response.total,
      data: response.posts.map((post) => {
        const formdataSerialized = post.meta['_cfkef_form_data'];
        const formdata = formdataSerialized
          ? unserialize(formdataSerialized)
          : undefined;
        const test = {
          ...post,
          formdata,
          meta: undefined,
        };
        return test;
      }),
    }))
    .then((response) => {
      console.log('response :>> ', response);
      return response;
    });
}

export function deletePost(postId: string) {
  const url = new URL(
    'https://75g.bab.myftpupload.com/wp-json/custom/v1/update-post-status'
  );
  return ky
    .post(url, { json: { ID: postId, post_status: 'draft' } })
    .json<unknown>();
}
