// GET https://api.cdnlibs.org/api/manga/6689--ascendance-of-a-bookworm-novel/chapters

export interface IChapters {
    data: Datum[];
}

export interface Datum {
    id: number;
    index: number;
    item_number: number;
    volume: string;
    number: string;
    number_secondary: string;
    name: string;
    branches_count: number;
    branches: Branch[];
    bundle_id?: any;
}

export interface Branch {
    id: number;
    branch_id: number;
    created_at: string;
    teams: Team[];
    expired_type: number;
    user: User;
}

export interface User {
    username: string;
    id: number;
}

export interface Team {
    id: number;
    slug: string;
    slug_url: string;
    model: string;
    name: string;
    cover: Cover;
}

export interface Cover {
    filename: string;
    thumbnail: string;
    default: string;
    md: string;
}
