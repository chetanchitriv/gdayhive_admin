/**
 * Representing of pagination object
 */
export class APIResponse {
    /**
     * api response success true & false
     */
    success: boolean;
    /**
     * message of error & success
     */
    message: string;
    /**
     * api return information
     */
    data: any;
    /**
     * pagination object
     */
    pagination?: Pagination;
}

/**
 * Representing of pagination object
 */
export class Pagination {
    /**
     * current page number
     */
    currentPage: number;
    /**
     * offset
     */
    offset: number;
    /**
     * per page count
     */
    perPage: number;
    /**
     * total pages
     */
    totalPages: number;

    constructor() {
        this.currentPage = 1;
        this.perPage = 10;
    }
}