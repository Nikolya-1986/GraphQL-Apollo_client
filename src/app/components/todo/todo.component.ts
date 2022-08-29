import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: any;
  @Output() deleteTodo = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public deleteCurrentTodo(id: string) {
    this.deleteTodo.emit(id);
  };

}
