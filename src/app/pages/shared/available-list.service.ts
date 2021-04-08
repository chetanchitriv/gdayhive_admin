import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpRequestsService, JReponse, Pagination } from 'src/app/services/http-requests.service';
import { Constants } from 'src/app/constants/constants';
import { SharedService } from '@shared/shared.service';
export class Sector {
    id: number;
    sectorname: string;
    userId: number;
    createdAt: Date;
    createdBy: string;
}

export class Member {
    id: number;
    fullName: string;
    userName: string;
    createdAt: Date;
    createdBy: string;
    lastLoggingDate: Date;
    sectorIds: string;
    sectorNames: string;
}
export class SMParam<T> {
    reqParam: string;
    itemPagination: Pagination;
    selectedList: number[] = [];
    itemList: T[] = [];
    constructor() {
        this.itemPagination = new Pagination();
        this.reqParam = `?page=${this.itemPagination.currentPage}&limit=${this.itemPagination.perPage}`;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AvailableListService {

    isSector: boolean;
    sectorParam: SMParam<Sector> = new SMParam<Sector>();
    memberParam: SMParam<Member> = new SMParam<Member>();
    closeModel: () => void;

    constructor(
        public shared: SharedService,
        public utility: UtilityService,
        private httpRequest: HttpRequestsService
    ) {
        this.resetParam();
    }

    /**
     * resetParam() => reset param
     */
    resetParam() {
        this.sectorParam = new SMParam<Sector>();
        this.memberParam = new SMParam<Member>();
        this.isSector = true;
        this.shared.update = this.pssChanges.bind(this);
    }

    /**
     * getSectors() => fill sector list
     */
    async getSectors(): Promise<boolean> {
        try {
            this.utility.showLoading();
            const viewAll: boolean = this.sectorParam.itemPagination.viewAll;
            const resSector = await this.httpRequest
                .get(`${Constants.sectorRoutes.getSectors}${this.sectorParam.reqParam}`) as JReponse<Sector>;
            this.sectorParam.itemList = resSector.data.list;
            this.sectorParam.itemPagination = resSector.data.pagination;
            this.sectorParam.itemPagination.viewAll = viewAll;
            this.shared.mainPagination = this.sectorParam.itemPagination;
            setTimeout(() => this.shared.apiCallDone = true, 1);
            this.utility.hideLoading();
            return true;
        } catch (err) {
            this.utility.hideLoading();
            return false;
        }
    }

    /**
     * getMembers() => fill member list
     */
    async getMembers(updateMembers: boolean = false): Promise<boolean> {
        try {
            if (this.sectorParam.selectedList.length > 0) {
                this.utility.showLoading();
                const viewAll: boolean = this.memberParam.itemPagination.viewAll;
                // const formData = new FormData();
                // formData.append('sectorIds', JSON.stringify(this.selectedSectorList));
                // const resMember = await this.httpRequest.post(`${Constants.memberRoutes.setorWiseMember}`, formData) as JReponse<Member>;
                const resMember = await this.httpRequest
                    .post(`${Constants.memberRoutes.setorWiseMember}${(updateMembers ? '' : this.memberParam.reqParam)}`, {
                        sectorIds: this.sectorParam.selectedList.join(',')
                    }) as JReponse<Member>;
                this.memberParam.itemList = resMember.data.list;
                this.memberParam.itemPagination = resMember.data.pagination;
                this.memberParam.itemPagination.viewAll = viewAll;
                this.shared.mainPagination = this.memberParam.itemPagination;
                if (updateMembers) {
                    this.memberParam.selectedList = this.memberParam.itemList.map(e => e.id);
                }
                setTimeout(() => this.shared.apiCallDone = true, 1);
                this.utility.hideLoading();
                return true;
            }
            this.utility.hideLoading();
            this.utility.showInfoToast('Please select first sector.');
            return false;
        } catch (err) {
            this.utility.hideLoading();
            return false;
        }
    }

    /**
     * pssChanges(reqParam) => update req param from Pagination, Search, Sort
     * @param reqParam in url request param
     */
    pssChanges(reqParam) {
        if (this.isSector) {
            this.sectorParam.reqParam = reqParam;
            this.getSectors();
        } else {
            this.memberParam.reqParam = reqParam;
            this.getMembers();
        }
    }

    /**
     * itemList() => base on is sector value return sector & member list
     */
    get itemList() {
        return ((this.isSector ? this.sectorParam.itemList : this.memberParam.itemList) || []);
    }
}
