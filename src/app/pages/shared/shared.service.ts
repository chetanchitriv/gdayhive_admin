import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/services/http-requests.service';
import { Sort } from '@angular/material/sort';

export enum EventType {
    PageChange = 1,
    PageSet = 2,
    ViewAll = 3,
    Search = 4,
    Sort = 5
}

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    loggedUserId: number;
    isSector: boolean;
    apiCallDone: boolean;
    mainPagination: Pagination;
    searchVal: string;
    paginationParam: string;
    sortParam: string;
    searchParam: string;

    selectedSectorList = [];
    selectedMemberList = [];
    updateProfile: () => void;
    updateBadgeCount: () => void;
    closeModel: () => void;
    update: (retParam: string) => void;

    constructor(
    ) {
        this.resetPagination();
    }

    /**
     * resetPagination() => pagination param reset
     */
    resetPagination() {
        this.mainPagination = new Pagination();
        this.paginationParam = `?page=${this.mainPagination.currentPage}&limit=${this.mainPagination.perPage}`;
        this.sortParam = '';
        this.searchParam = '';
        this.searchVal = '';
    }

    /**
     * sortList(sort) => sortng data
     * @param sort in sort object
     */
    sortList(sort: Sort) {
        this.sortParam = `&sortColumnName=${sort.active}&sorting=${sort.direction === 'asc' ? 0 : 1}`;
        this.updateList(EventType.Sort);
    }

    /**
     * onSearchKeyUp() => search event when key up
     */
    onSearchKeyUp() {
        if (this.searchVal) {
            if (this.searchVal.length === 1 && this.mainPagination.currentPage !== 1) {
                this.mainPagination.currentPage = 1;
                this.apiCallDone = false;
            }
            this.searchParam = `&search=${this.searchVal}`;
        } else {
            this.searchParam = '';
        }
        this.updateList(EventType.Search);
    }

    /**
     * updateList(eventType) => update list base on param
     * @param eventType in event type
     */
    updateList(eventType: EventType) {
        switch (eventType) {
            case EventType.PageChange:
                this.paginationParam = `?page=${this.mainPagination.currentPage}&limit=${this.mainPagination.perPage}`;
                break;
            case EventType.PageSet:
                this.paginationParam = `?page=${this.mainPagination.currentPage}&limit=${this.mainPagination.perPage}`;
                break;
            case EventType.ViewAll:
                if (this.mainPagination.viewAll) {
                    this.paginationParam = '';
                } else {
                    this.paginationParam = `?page=${this.mainPagination.currentPage}&limit=${this.mainPagination.perPage}`;
                }
                break;
            case EventType.Search:
            case EventType.Sort:
                if (!this.mainPagination.viewAll) {
                    this.paginationParam = `?page=${this.mainPagination.currentPage}&limit=${this.mainPagination.perPage}`;
                }
                break;
        }
        if (this.mainPagination.viewAll) {
            this.searchParam = this.searchParam.replace('&', '?');
            this.sortParam = (this.searchParam ? this.sortParam : this.sortParam.replace('&', '?'));
        } else {
            this.searchParam = this.searchParam.replace('?', '&');
            this.sortParam = (this.searchParam ? this.sortParam : this.sortParam.replace('?', '&'));
        }
        this.update(`${this.paginationParam}${this.searchParam}${this.sortParam}`);
    }

    /**
     * resetInit() => reset & init value
     */
    resetInit() {
    }

    /**
     * getSectors() => fill sector list
     */
    async getSectors() {
    }

    /**
     * getMembers() => fill member list
     */
    async getMembers() {
    }

    /**
     * itemList() => base on is sector value return sector & member list
     */
    get itemList() {
        return [];
    }
}
