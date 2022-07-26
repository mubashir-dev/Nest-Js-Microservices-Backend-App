export const MOVIE_DEFAULT_SORT = 'name@asc';
export const MOVIE_DEFAULT_PAGE = 1;
export const MOVIE_DEFAULT_PER_PAGE = 10;
export const MOVIE_DEFAULT_AVAILABLE_SORT = ['name', 'createdAt'];
export const MOVIE_DEFAULT_AVAILABLE_SEARCH = ['name'];

export enum ENUM_MOVIE_STATUS_CODE_ERROR {
    MOVIE_IS_INACTIVE_ERROR = 5500,
    MOVIE_NOT_FOUND_ERROR = 5501,
    MOVIE_EXIST_ERROR = 5502,
    MOVIE_ACTIVE_ERROR = 5503,
    MOVIE_USED_ERROR = 5504,
}
