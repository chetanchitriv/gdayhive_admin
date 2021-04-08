import { Component, OnInit } from '@angular/core';
import { SharedService } from '@shared/shared.service';
import { AvailableListService } from '@shared/available-list.service';


@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.scss']
})
export class AvailableListComponent implements OnInit {

  sectorUpadte: boolean;
  showPagination: boolean;
  selectedItem: Map<number, any>;

  constructor(
    public shared: SharedService,
    public availableList: AvailableListService
  ) {
    this.selectedItem = new Map<number, any>();
    this.selectedItem.clear();
    this.sectorUpadte = false;
  }

  /**
   * ngOnInit() => default value set
   */
  ngOnInit() {
    if (this.availableList.isSector) {
      this.shared.mainPagination = this.availableList.sectorParam.itemPagination;
      this.availableList.sectorParam.selectedList.forEach((element: any) => {
        if (!this.selectedItem.has(element.id)) {
          this.selectedItem.set(element, { id: element });
        }
      });
    } else {
      this.shared.mainPagination = this.availableList.memberParam.itemPagination;
      this.availableList.memberParam.selectedList.forEach((element: any) => {
        if (!this.selectedItem.has(element.id)) {
          this.selectedItem.set(element, { id: element });
        }
      });
    }
    this.showPagination = true;
  }

  /**
   * addItem(index) => add or remove item
   * @param index in selected index
   */
  addItem(index) {
    const objItem: any = this.availableList.itemList[index];
    if (this.selectedItem.has(objItem.id)) {
      this.selectedItem.delete(objItem.id);
    } else {
      this.selectedItem.set(objItem.id, objItem);
    }
    if (this.availableList.isSector) {
      this.sectorUpadte = true;
    }
  }

  /**
   * onClose() => close with update value
   */
  onClose() {
    this.showPagination = false;
    if (this.availableList.isSector) {
      this.availableList.sectorParam.selectedList = Array.from(this.selectedItem.values()).map(e => e.id);
      if (this.sectorUpadte) {
        this.availableList.getMembers(this.sectorUpadte);
      }
    } else {
      this.availableList.memberParam.selectedList = Array.from(this.selectedItem.values()).map(e => e.id);
    }
    this.shared.searchParam = '';
    this.shared.searchVal = '';
    this.availableList.closeModel();
  }

}
