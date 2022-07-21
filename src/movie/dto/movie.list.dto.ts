import { PaginationListAbstract } from 'src/pagination/pagination.abstract';
import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSort,
} from 'src/pagination/pagination.decorator';
import { IPaginationSort } from 'src/pagination/pagination.interface';
import {
    MOVIE_DEFAULT_AVAILABLE_SEARCH,
    MOVIE_DEFAULT_AVAILABLE_SORT,
    MOVIE_DEFAULT_PAGE,
    MOVIE_DEFAULT_PER_PAGE, MOVIE_DEFAULT_SORT,
} from '../movie.constant';


export class MovieListDto implements PaginationListAbstract {
    @PaginationSearch()
    readonly search: string;

    @PaginationAvailableSearch(MOVIE_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(MOVIE_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(MOVIE_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(MOVIE_DEFAULT_SORT, MOVIE_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(MOVIE_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];
}
