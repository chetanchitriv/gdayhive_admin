import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  todoArray=[];
  todoArray1=[];
  todoArray2=[];
  todo;

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(value){
    if(value!==""){
     this.todoArray.push(value)
   
  }else{
    console.log('Field required **')
  }
    
  }

  addTodo1(value){
    if(value!==""){
     this.todoArray1.push(value)
    // todoForm.resetForm()
    //console.log(this.todos) 
  }else{
    console.log('Field required **')
  }
    
  }


  addTodo2(value){
    if(value!==""){
     this.todoArray2.push(value)
    // todoForm.resetForm()
    //console.log(this.todos) 
      
  }else{
    console.log('Field required **')
  }
    
  }



    /*delete item*/
    deleteItem(todo){
      for(let i=0 ;i<= this.todoArray.length ;i++){
        if(todo== this.todoArray[i]){
          this.todoArray.splice(i,1)
        }
      }
    }

      /*delete item*/
      deleteItem1(todo){
        for(let i=0 ;i<= this.todoArray1.length ;i++){
          if(todo== this.todoArray1[i]){
            this.todoArray1.splice(i,1)
          }
        }
      }

      /*delete item*/
      deleteItem2(todo){
        for(let i=0 ;i<= this.todoArray2.length ;i++){
          if(todo== this.todoArray2[i]){
            this.todoArray2.splice(i,1)
          }
        }
      }
  
    // submit Form
    todoSubmit(value:any){
       if(value!==""){
      this.todoArray.push(value.todo)
      console.log(value.todo)
       //this.todoForm.reset()
      }else{
        console.log('Field required **')
      }
      
    }

}
