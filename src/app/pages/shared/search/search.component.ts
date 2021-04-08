import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchEmit = new EventEmitter();
  searchText;
  constructor() { }

  ngOnInit() {
  }

  search(event) {
    this.searchEmit.emit(event.target.value);
  }
}
