import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines = this.db.list('/cuisines');
    this.restaurants = this.db.list('/restaurants')
      .map(restaurants => {
        console.log('Before Map', restaurants);
        restaurants.map(x => {
          x.cuisineType = this.db.object(`/cuisines/${x.cuisine}`);
        });
        console.log('AfterMap', restaurants);
        return restaurants;
      });
  }
}





