import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-test',
  templateUrl: './todo-test.component.html',
  styleUrls: ['./todo-test.component.scss']
})
export class TodoTestComponent implements OnInit {

  public status: string = ""; 
  public todos: Array<Todo> = [];
  public formControl: FormControl = new FormControl();
  public newTodo: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string>('http://localhost:8000/').subscribe((status: string) => this.status = status);
    this.http.get<Array<Todo>>('http://localhost:8000/todo').subscribe((todos: Array<Todo>) => this.todos = todos);
  }

  public getTodos(): void {
    this.http.get<Array<Todo>>('http://localhost:8000/todo').subscribe((todos: Array<Todo>) => this.todos = todos);
  }

  public postTodo(title: string): void {
    if (! this.newTodo) return;
    this.http.post<Todo>('http://localhost:8000/todo', { title: title, due_soon: false, important: false, archived: false }).subscribe(
      () => {
        this.newTodo = "";
        this.getTodos();
      },
      (err: any) => console.error(err));
  }

}
