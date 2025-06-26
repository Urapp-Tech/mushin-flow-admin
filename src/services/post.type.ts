export type PaginatedData<K extends string, T> = {
  page: number;
  limit: number;
  offset: number;
  total: number;
} & {
  [key in K]: T[];
};

export type Post = {
  ID: string;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: string;
  guid: string;
  menu_order: string;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  meta: {
    _cfkef_form_action_count: string;
    _cfkef_form_entry_id: string;
    _cfkef_form_name: string;
    _cfkef_element_id: string;
    _cfkef_form_meta: string;
    _cfkef_form_post_id: string;
    _cfkef_entry_view_status: string;
    _cfkef_form_data: string;
    _cfkef_user_email: string;
  };
};
