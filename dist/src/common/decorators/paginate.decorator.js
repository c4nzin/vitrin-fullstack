"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginate = void 0;
const common_1 = require("@nestjs/common");
exports.Paginate = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const defaultPaginationParams = {
        skip: 0,
        limit: 10,
        sort: [],
        search: [],
    };
    defaultPaginationParams.limit = request.query.limit
        ? parseInt(request.query.limit.toString())
        : 10;
    defaultPaginationParams.skip = request.query.skip
        ? parseInt(request.query.skip.toString())
        : 0;
    if (request.query.sort) {
        const sortArray = request.query.sort.toString().split(',');
        defaultPaginationParams.sort = sortArray.map((sortItem) => {
            switch (sortItem[0]) {
                case '-':
                    return {
                        field: sortItem.slice(1),
                        by: 'DESC',
                    };
                case '+':
                    return {
                        field: sortItem.slice(1),
                        by: 'ASC',
                    };
                default: {
                    return {
                        field: sortItem.trim(),
                        by: 'ASC',
                    };
                }
            }
        });
    }
    if (request.query.search) {
        const searchArray = request.query.search.toString().split(',');
        defaultPaginationParams.search = searchArray.map((searchItem) => {
            const field = searchItem.split(':')[0];
            const value = searchItem.split(':')[1];
            return {
                field,
                value,
            };
        });
    }
    return defaultPaginationParams;
});
//# sourceMappingURL=paginate.decorator.js.map