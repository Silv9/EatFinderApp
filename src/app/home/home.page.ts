import { EvaluationService } from './../services/evaluation.service';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Evaluation } from '../interfaces/evaluation';
import { AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario="Usuario";
  nombre="Usuario";
  ubicacion="Ubicación actual";
  usuarios: User[] = [];
  calificacion: Evaluation[] = [];

  constructor(private userService:UserService,
    private evaluationService:EvaluationService,
    private alertController:AlertController,
    private toastController:ToastController
    ) { 
    this.usuario=userService.usuario_activo;

    
  }


  deleteUser(id:number,index:number){
    this.userService.deleteUser(id)
    .subscribe(()=>{
      this.usuarios.splice(index,1);
      this.presentToast('Su usuario fué eliminado correctamente');

    })
  }

  ngOnInit() {
    this.validacion_usuario();
    this.validacion_comentarios();
  }

  validacion_comentarios(){
    
    this.evaluationService.getAllEvaluation()
      .subscribe(calificacion => {
        this.calificacion = calificacion;
        console.log(calificacion);
      })




  }

  validacion_usuario(){
    this.userService.getUserbyEmail(this.usuario)
    .subscribe((usuario)=>{
      this.usuarios = usuario;

      console.log(this.usuarios);
      this.usuarios.forEach(usuario => {
        this.nombre=usuario.nombre;
        this.ubicacion= usuario.ubi_actual;
      })

    })
  }

  crear_comentario(){
    this.createAlert();
  }

  async createAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo comentario',
      inputs: [
      {
        name: 'id_rest',
        type: 'text',
        placeholder: 'Nombre del restaurante'
      },
      {
        name: 'cant_estrellas',
        type: 'number',
        placeholder: 'Cantidad de estrellas'
      },
      {
        name: 'comentario',
        type: 'text',
        placeholder: 'Comentario'
      }

      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Crear',
        handler: (data) => {
          this.addEvaluation(data.id_rest,data.cant_estrellas,data.comentario,this.nombre);
          console.log('Confirm Ok');
        }
      }

      ]
    });
    await alert.present();
  }

  addEvaluation(id_restaurante:string,cant_estrellas:Number,comentario:string,id_usuario:string){
    const calificacion={
      id_restaurante,cant_estrellas,comentario,id_usuario
     };
    console.log(calificacion);
    this.evaluationService.createEvaluation(calificacion)
    .subscribe((data)=>{
      this.validacion_comentarios();
      this.presentToast('Su comentario fue creado correctamente');
    })
  }

  async presentToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }


  

}
