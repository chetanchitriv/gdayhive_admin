import { Component, OnInit ,TemplateRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inquires',
  templateUrl: './inquires.component.html',
  styleUrls: ['./inquires.component.scss']
})
export class InquiresComponent implements OnInit {

  modalRef: BsModalRef;
 
  dtOptions: DataTables.Settings = {};
  persons: any;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient ,private modalService: BsModalService ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }
 

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.httpClient.get<[]>('https://60476f3cb801a40017ccc257.mockapi.io/data')
    .subscribe(data => {
      this.persons = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  }


