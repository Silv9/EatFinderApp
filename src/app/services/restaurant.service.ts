import { Restaurant } from './../interfaces/restaurant';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  private api="http://localhost:9000/api";
  
  getAllRestaurant(){
    const path=`${this.api}/restaurant`;
    return this.httpclient.get<Restaurant[]>(path);
  }

  getRestaurant(id:string){
    const path=`${this.api}/restaurant/${id}`;
    return this.httpclient.get<Restaurant[]>(path);
  }

  getRestaurantbyName(name:string){
    const path=`${this.api}/restaurant/e/${name}`;
    return this.httpclient.get<Restaurant[]>(path);
  }

  createRestaurant(restaurant:Restaurant){
    const path=`${this.api}/restaurant`;
    return this.httpclient.post(path,restaurant);
  }
  updateRestaurant(restaurant:Restaurant){
    const path=`${this.api}/restaurant/${restaurant.id}`;
    return this.httpclient.put<Restaurant>(path,restaurant);
  }

  deleteRestaurant(id:string){
    const path=`${this.api}/restaurant/${id}`;
    return this.httpclient.delete(path);
  }

  constructor(private httpclient:HttpClient) { }

}
