import { Component } from '@angular/core';
import { Pagination } from '@services/http-requests.service';
import { UtilityService } from '@services/utility.service';
import { SharedService,EventType } from '../shared.service';

export class PageEvent {
    page: number;
    itemsPerPage: number;
}

@Component({
    selector: 'app-common-pagination',
    templateUrl: './common-pagination.component.html',
    styleUrls: ['./common-pagination.component.scss']
})
export class CommonPaginationComponent {
    currentPage: string;
    perPage: any;

    constructor(
        public shared: SharedService,
        public utility: UtilityService,
    ) {
    }

    /**
     * pageChanged(event: PageEvent) => page change
     * @param event in event object
     */
    pageChanged(event: PageEvent) {
        if (this.shared.mainPagination.viewAll || !this.shared.apiCallDone) {
            return;
        }
        if (this.shared.mainPagination.currentPage !== +event.page) {
            this.shared.mainPagination.currentPage = +event.page;
            this.utility.setLocalStore('currentPage', this.shared.mainPagination.currentPage);
        }
        this.shared.updateList(EventType.PageChange);
    }

    /**
     * onPageSet(value) => page value set
     * @param value in page value
     */
    onPageSet(value: number) {
        this.shared.mainPagination.currentPage = 1;
        this.shared.mainPagination.perPage = +value;
        this.utility.setLocalStore('currentPage', this.shared.mainPagination.currentPage);
        this.utility.setLocalStore('perPage', this.shared.mainPagination.perPage);
        this.shared.apiCallDone = false;
        this.shared.updateList(EventType.PageSet);
    }

    onPagevalueset() {
        this.currentPage = this.utility.getLocalStore('currentPage');
        this.perPage = this.utility.getLocalStore('perPage');
        const pageData = Number(this.currentPage);
        const perPage = Number(this.perPage);
        // localStorage.removeItem('currentPage');
        return { pageData, perPage };
    }
    onPagevalueRemove() {
        this.utility.clearStorageFor('currentPage');
        this.utility.clearStorageFor('perPage');
    }
    onPageDefaultvalueSet() {
        this.utility.setLocalStore('currentPage', 1);
        this.utility.setLocalStore('perPage', 10);

    }
    /**
     * onViewAll($event) => view all
     * @param $event in event object
     */
    onViewAll($event) {
        if (!this.shared.mainPagination.viewAll) {
            this.shared.mainPagination = new Pagination();
        }
        this.shared.updateList(EventType.ViewAll);
    }

}
