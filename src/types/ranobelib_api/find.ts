export interface IFindTitle {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Meta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
  page: number;
  has_next_page: boolean;
  seed: string;
}

export interface Links {
  first: string;
  last?: any;
  prev?: any;
  next?: any;
}

export interface Datum {
  id: number;
  name: string;
  rus_name: string;
  eng_name: string;
  model: string;
  slug: string;
  slug_url: string;
  cover: Cover;
  ageRestriction: AgeRestriction;
  site: number;
  type: AgeRestriction;
  rating: Rating;
  is_licensed: boolean;
  status: AgeRestriction;
  releaseDateString: string;
}

export interface Rating {
  average: string;
  averageFormated: string;
  votes: number;
  votesFormated: string;
  user: number;
}

export interface AgeRestriction {
  id: number;
  label: string;
}

export interface Cover {
  filename: string;
  thumbnail: string;
  default: string;
  md: string;
}