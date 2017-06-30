import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  cuisines: FirebaseListObservable<any[]>;
  restaurant: FirebaseObjectObservable<any>;
  // private subscriptions: Array<Subscription> = [];

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines = this.db.list('/cuisines');
    this.restaurant = this.db.object('/restaurant');
    // this.subscriptions.push(this.db.list('/cuisines').subscribe(x => this.cuisines = x));
  }
  add() {
    this.cuisines.push({name: 'Asian', details: {description: '...'}});
  }
  update() {
    //non destructive
    // this.db.object('/restaurant').update({
    //   name: 'New Name2',
    //   rating: 5
    // });
    //Destructive updates
    //overwrite existing object
    //will also create if not there
    // this.db.object('/restaurant').set({
    //   name: 'New Name',
    //   rating: 5
    // });
    // favorites/{userId}/{restaurantId}
    // this.db.object('favorites/1/10').set(true);
    this.db.object('/favorites/1/10').set(null);
  }
  remove() {
    this.db.object('/restaurant').remove()
      .then(x => console.log('SUCCESS'))
      .catch(error => console.log('Error', error));
  }
  ngOnDestroy(): void {
    // this.subscriptions.forEach(x => x.unsubscribe());
  }
}





