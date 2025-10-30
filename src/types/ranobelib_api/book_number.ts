// GET https://api.cdnlibs.org/api/manga/6689--ascendance-of-a-bookworm-novel/chapter?branch_id=12003&number=690&volume=30

export interface IBookNumber {
    data: Data;
}

export interface Data {
    id: number;
    model: string;
    volume: string;
    number: string;
    number_secondary: string;
    name: string;
    slug: string;
    branch_id: number;
    manga_id: number;
    created_at: string;
    expired_at?: any;
    moderated: Moderated;
    likes_count: number;
    is_liked: boolean;
    is_viewed: boolean;
    expired_type: number;
    teams: Team[];
    bundle_id?: any;
    bundle?: any;
    publish_at?: any;
    type: "doc" | "chapter";
    content: string | DocContent;
    attachments: any[];
}

export type DocContent = DocContentPice[];
export interface DocContentPice {
    type: string | "paragraph" | "image";
    attrs?: {
        images: {
            image: string;
        }[];
    };
    content?: {
        type: string | "hardBreak" | "text";
        marks: { type: "bold" | "italic" }[];
        text?: string;
    }[];
}

export interface Team {
    id: number;
    slug: string;
    slug_url: string;
    model: string;
    name: string;
    cover: Cover;
    vk: string;
    discord?: any;
    donate_enabled: boolean;
}

export interface Cover {
    filename: string;
    thumbnail: string;
    default: string;
    md: string;
}

export interface Moderated {
    id: number;
    label: string;
}
