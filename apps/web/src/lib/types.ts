export type ClashFormType = {
    title?: string;
    description?: string;
};

export type ClashFormErrorType = {
    title?: string;
    description?: string;
    image?: string;
    expire_at?: string;
};

export type ClashType = {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    image?: string;
    created_at: string;
    ClashItem?: Array<ClashItemType>;
    ClashComments?: Array<ClashCommentType>;
    expire_at: string;
};

type ClashItemType = {
    id: number;
    image: string;
    count: number;
};
type ClashCommentType = {
    id: number;
    comment: string;
    created_at: string;
};

export type ClashItemForm = {
    image: File | null;
};