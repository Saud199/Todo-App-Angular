import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoArray :any[] = [];

  constructor() { }

  ngOnInit(): void {
    axios.get('http://localhost:8080/api/todoDB/')
             .then(res => {

                //todoArray.push(res.data.map(todo => todo.name))
                //this.setState({todoArray})
                //alert(todoArray);

                for(var i=0;i<res.data.length;i++) {
                    var obj = {
                        id : res.data[i]._id,
                        name : res.data[i].name,
                        date : res.data[i].added_date
                    }
                    //this.todoArray.push(obj)
                    this.todoArray.push(obj);
                    //alert(this.todoArray[0].name)
                    //this.setState({todoArray})
                }

             })
             .catch(err => {
                 console.log(err);
             })
  }

}
