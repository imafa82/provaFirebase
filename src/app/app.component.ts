import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;
  displayName;
  photoUrl;

  constructor(private af: AngularFire){
    console.log(af);
   
  }
  ngOnInit(){
      this.af.auth.subscribe(authState => {
        if(!authState){
          console.log("NOT LOGGED IN");
          this.displayName= null;
          this.photoUrl= null;
        }
          
        else{
          console.log("LOGGED IN", authState);
          this.displayName = authState.auth.displayName;
          this.photoUrl = authState.auth.photoURL;
        }
          
      });
     this.cuisines = this.af.database.list('/cuisines', {
       query:{
         orderByValue: true
       }
     });
     this.restaurants = this.af.database.list('/restaurants', {
       query:{
         orderByChild: 'rating',
         equalTo:5,
         limitToLast: 50
       }
     })
       .map(
         restaurants => {
           console.log("BEFORE MAP", restaurants);
            restaurants.map(
              restaurant =>{
                restaurant.featureTypes=[];
                for (var f in restaurant.features)
                  restaurant.featureTypes.push(this.af.database.object('/features/'+f))
                restaurant.cuisineType = this.af.database.object('/cuisines/' + restaurant.cuisine);
                console.log(restaurant);
              }
            )
           return restaurants;
         }
       );
     this.exists = this.af.database.object('/restaurants/1/features/1');
  }
  
  add(){
    // this.cuisines.push({
    //   name: 'Asian',
    //   details:{
    //     description: '...'
    //   }
    // });
    this.af.database.list('/restaurants').push({name: ''})
    .then(x=>{
      console.log(x);
      //x.key
      let restaurant = { name: 'My New Restaurant'};
      let update = {};
      update['restaurants/'+x.key] = restaurant;
      update['restaurants-by-city/camberwell/'+x.key] = restaurant;
      this.af.database.object('/').update(update);
    });
  }

  update(){
    this.af.database.object('/restaurant').set(
      {
        name: 'new Name',
        rating: 5

      }
    )
  }

  remove(){
    this.af.database.object('/restaurant').remove()
    .then(x=> console.log("SUCCESS"))
    .catch(error => console.log("error", error));
  }

  login(){
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(authState =>{
      console.log("After login", authState);
    });
  }
  
  logout(){
     this.af.auth.logout();
  }

}
