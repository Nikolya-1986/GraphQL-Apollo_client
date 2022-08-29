import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from 'src/app/modules/graphql/graphql.queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: any[] = [];
  error: any;

  constructor(
    private _apollo: Apollo
  ) { }

  ngOnInit(): void {
    this._getTodos();
  }

  public todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  public addTodo() {
    this._apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
    },
    (error) => {
      this.error = error;
    });
  };

  public onDeleteTodo(id: string) {
    this._apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.deleteTodo;
    },
    (error) => {
      this.error = error;
    });
  };

  private _getTodos() {
    this._apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;
    });
  };

}
