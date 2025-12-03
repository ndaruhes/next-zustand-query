export interface PaginationMetaData {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
}

export interface OptionItemData {
    value: string | number;
    label: string;
}

export interface BaseResponse {
    success: boolean;
    message?: string;
    status?: string;
}

export interface ListResponse<T> extends BaseResponse {
    data: T[];
    meta?: PaginationMetaData;
}

export interface DetailResponse<T> extends BaseResponse {
    data: T;
}

export interface OptionSelectResponse extends BaseResponse {
    data: OptionItemData[];
}

export interface DeleteResponse extends BaseResponse {
    deleted: boolean;
    deleted_at?: string;
    deleted_by?: string;
}
