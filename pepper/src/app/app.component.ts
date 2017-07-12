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

    //Insert Object into multiple places
    // this.db.list('/restaurants').push({})
    //   .then(x => {
    //     // x.key
    //     let restaurant ={ name: 'My New Restaurant'};
    //     console.log(x.key);
    //     let update = {};
    //     //update.firstName = '';
    //     update[`restaurants/${x.key}`] = restaurant;
    //     update[`restaurants-by-city/camberwell/${x.key}`] = restaurant;
    //     // update[`restaurants-by-city/camberwell/${x.key}`] = true;
    //     this.db.object('/').update(update);
    //   })

    //Remove object from multiple places
    // let update = {}
    // let key = '-KooARqPnrrky7r1OC6d';
    // update[`restaurants/${key}`] = null;
    // update[`restaurants-by-city/camberwell/${key}`] = null;
    // this.db.object('/').update(update);

  }
}





