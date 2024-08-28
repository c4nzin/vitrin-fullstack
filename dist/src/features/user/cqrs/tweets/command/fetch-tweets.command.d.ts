import { Pagination } from 'src/common/decorators/types/pagination.interface';
export declare class FetchTweetsCommand {
    id: string;
    pagination: Pagination;
    constructor(id: string, pagination: Pagination);
}
