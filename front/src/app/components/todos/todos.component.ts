import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TodosService} from "../../services/todos/todos.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Moment} from "moment";
import {MatCalendar} from "@angular/material/datepicker";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {



  todoName = new FormControl(null);
  todos: any[] = [];
  constructor(
    private todosService: TodosService
  ) {
  }

  ngOnInit() {
    this.todosService.getTodos()
      .subscribe({
        next: value => {
          this.todos = value;
        }
      })
  }

  createTodo() {
    if (this.todoName.value.trim() === '') {
      return;
    }
    this.todosService.createTodo(this.todoName.value)
      .subscribe({
        next: value => {
          this.todos = value;
        }
      })
    this.todoName.reset();
  }

  removeTodo(id: string) {
    this.todosService.removeTodo(id)
      .subscribe({
        next: value => {
          this.todos = value
        }
      })
  }
  changeStatus(id: string) {
    const todo =  this.todos.find(todo => todo._id === id );
    switch (todo.status) {
      case 'new':
        this.todosService.changeStatus(todo._id, 'done')
          .subscribe({
            next: value => {
              this.todos[this.todos.indexOf(todo)] = value;
            }
          })
        break;
      case 'done':
        this.todosService.changeStatus(todo._id, 'new')
          .subscribe({
            next: value => {
              this.todos[this.todos.indexOf(todo)] = value;
            }
          })
        break;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
