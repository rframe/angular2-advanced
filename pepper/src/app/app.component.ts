import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    // Current firebase rules looks like this
    // {
    //   "rules": {
    //     ".read": "auth != null || true",
    //     ".write": "auth != null || true",
    //     "restaurants": {
    //       ".indexOn": ["rating", "address/city"]
    //     },
    //     "cuisines": {
    //       ".indexOn": ".value"
    //     }
    //   }
    // }
    this.cuisines = this.db.list('/cuisines', {
      // Add index on firebase console for ".value"
      query: {
        orderByValue: true,
        equalTo: 'Italian'
      }
    });
    this.restaurants = this.db.list('/restaurants', {
      // to filter you should order by that value first
      query: {
        orderByChild: 'rating',
        equalTo: 5,
        limitToFirst: 50
        // limitToLast: 50
      }
    })
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

    this.exists = this.db.object('/restaurants/1/features/1');

    this.exists.take(1).subscribe(x => {
      if (x && !!x.$value) {
        console.log('EXISTS');
      } else {
        console.log('NOT EXISTS')
      }
    });
  }
}





