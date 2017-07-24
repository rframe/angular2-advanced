/**
 * Created by russell.frame on 7/24/2017.
 */
import {routes} from './app.routes';
import {UsersComponent} from './users/users.component';

describe('routes', () => {
  it('should contain a route for /users', () => {
    expect(routes).toContain({path: 'users', component: UsersComponent});
  })
});
