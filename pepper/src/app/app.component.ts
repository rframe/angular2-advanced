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
        restaurants.map(restaurant => {
          restaurant.cuisineType = this.db.object(`/cuisines/${restaurant.cuisine}`);

          restaurant.featureTypes = [];

          for(let f in restaurant.features) {
            restaurant.featureTypes.push(this.db.object(`/features/${f}`))
          }

        });

        console.log('AfterMap', restaurants);
        return restaurants;
      });
  }
}





