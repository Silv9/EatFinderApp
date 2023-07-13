import { Injectable} from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_id="";
  public usuario_activo="";
  public celular_activo=0;
  public email_activo="";
  public nombre_activo="";
  public ubiactual_activo="";
  private api="http://localhost:9000/api";

  
  
  getAllUser(){
    const path=`${this.api}/users`;
    return this.httpclient.get<User[]>(path);
  }

  getUser(id:string){
    const path=`${this.api}/users/${id}`;
    return this.httpclient.get<User[]>(path);
  }

  getUserbyEmail(email:string){
    const path=`${this.api}/users/e/${email}`;
    return this.httpclient.get<User[]>(path);
  }

  createUser(user:User){
    console.log("Ingresa a create user");
    const path=`${this.api}/users`;
    return this.httpclient.post(path,user);
  }
  updateUser(user:User){
    const path=`${this.api}/users/${user.id}`;
    return this.httpclient.put<User>(path,user);
  }

  deleteUser(id:number){
    const path=`${this.api}/users/e/${id}`;
    return this.httpclient.delete(path);
  }

  constructor(private httpclient:HttpClient) { }
}
