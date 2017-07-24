import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);

    // Other option is to stub
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1,2,3];
    spyOn(service, 'getTodos').and.callFake(() => {
      // return of([])
      return Observable.from([todos])
      // return Observable.from([[
      //   {id: 1, title: 'a'},
      //   {id: 2, title: 'b'},
      //   {id: 3, title: 'c'}
      // ]]);
    });

    component.ngOnInit();

    // To General
    // expect(component.todos.length).toBeGreaterThan(0);
    // To General
    // expect(component.todos.length).toBe(3);
    expect(component.todos).toBe(todos);
  });
});
