import { Pagination } from 'src/common/decorators/types/pagination.interface';
export declare class FetchFollowersCommand {
    id: string;
    pagination: Pagination;
    constructor(id: string, pagination: Pagination);
}
