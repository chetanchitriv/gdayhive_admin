import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqsService } from './faqs.service';
import { Observable, of, Subject } from 'rxjs';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
faqlist=[]
  constructor(private httpClient: HttpClient ,private faqs:FaqsService ) { }

  ngOnInit(): void {

    // this.httpClient.get<[]>('https://60476f3cb801a40017ccc257.mockapi.io/data')
    //   .subscribe(data => {
    //  console.log(data);
    //      this.faqlist=data;
    //   });

    this.getSubcriptionList()

  }

  async getSubcriptionList(){
    const response:any = await this.faqs.getFaqs();
    if(response.msg=="Success"){
      this.faqs=response.data;
      console.log(response.data)
    }
  }
    

}
