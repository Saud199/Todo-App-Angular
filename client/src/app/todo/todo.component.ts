import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  todoArray :any[] = [];

  constructor() { }

  ngOnInit(): void {
    axios.get('/api/todoDB/')
             .then(res => {

                for(let i=0;i<res.data.length;i++) {
                    let obj = {
                        id : res.data[i]._id,
                        name : res.data[i].name,
                        date : res.data[i].added_date
                    }
                    this.todoArray.push(obj);
                    //alert(this.todoArray[0].name)
                }

             })
             .catch(err => {
                 console.log(err);
             })
  }


  addTodo() : void {
    let todo = (<HTMLInputElement> document.getElementById('taskName')).value;

    if(todo.length > 0) {

      const newTodo = {
          name : todo
      }

      axios.post('/api/todoDB/' , newTodo)
           .then(function (res) {
              Swal.fire({
                title: 'Success',
                text: "Task has been added",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                  if (result.value) {
                    window.location.href = '/';
                  }
                })
            })
    }
    else {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please type something'
      })
    }
  }


  deleteTodo(i : any) : void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

          axios.delete('/api/todoDB/'+this.todoArray[i].id);
          this.todoArray = this.todoArray.filter(todo => todo.id != this.todoArray[i].id);

          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )

        }
      })
  }


  updateTodo(i : any) : void {
    const todo = prompt("Enter Task...");

    const updatedTodo = {
      name : todo
    } 

    if(updatedTodo.name != null) {
      axios.put('/api/todoDB/'+this.todoArray[i].id , updatedTodo)
           .then( function (res) {
              Swal.fire({
                  title: 'Success',
                  text: "Task has been updated",
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ok'
              }).then((result) => {
                  if (result.value) {
                    window.location.href = '/';
                  }
                 })
            })
    } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please type something'
        })
  }

  }

}