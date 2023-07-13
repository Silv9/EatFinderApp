import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuentats',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  nombre: string;
  celular: number;
  email: string;
  ubi_actual: string;

  constructor(private userService:UserService,
    private alertController:AlertController,
    private toastController:ToastController) {     
  this.celular = this.userService.celular_activo;
  this.nombre = this.userService.nombre_activo;
  this.email = this.userService.email_activo;
  this.ubi_actual = this.userService.ubiactual_activo;}

  async presentToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }

  eliminar_usuario(){
    if(this.nombre==''){
      this.presentToast('No existe usuario a eliminar');
    }else{
      this.deleteUser(this.celular);
    }
  }

  deleteUser(id:number){
    this.userService.deleteUser(id)
    .subscribe(()=>{
      this.presentToast('Su usuario fué eliminado correctamente');

    })
  }


  ngOnInit() {
  }

}