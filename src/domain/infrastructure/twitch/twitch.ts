export type Stream = {
  user_id: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
};

export type User = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
};

type ArrayData<T> = {
  data: Array<T>;
};

export type Streams = ArrayData<Stream>;
export type Users = ArrayData<User>;
export type LiveStream = User & { stream?: Stream };
