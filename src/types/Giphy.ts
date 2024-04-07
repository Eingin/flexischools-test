// https://developers.giphy.com/docs/api/schema/

export type GiphyImage = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type GiphyImages = {
  original: GiphyImage;
  fixed_width: GiphyImage;
};

export type GiphyData = {
  type: string;
  id: string;
  title: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
};

export type GiphyPagination = {
  total_count: number;
  count: number;
  offset: number;
};

export type GiphyResponse = {
  data: GiphyData[];
  pagination: GiphyPagination;
  meta: {
    status: number;
    msg: string;
  };
};
