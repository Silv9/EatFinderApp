import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  existe=false;
  usuarios: User[] = [];
  usuario = "";

  showForm = false;
  showLoginForm: boolean = false;
  showRegistrationForm: boolean = false;
  
  formData = {
    correo: '',
    password: '',

  };
  showForm2 = false;
  formData2 = {
    celular:0,
    nombre:'',
    contrasenia:'pordefect123',
    username:'',
    email:'',
    pref_comida:'',
    ubi_actual:'',
  };
  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private toastController:ToastController,
    private router:Router
  ) { }

  ngOnInit() : void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log(usuarios);
      })
  }


  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo User',
      inputs: [
      {
        name: 'celular',
        type: 'number',
        placeholder: 'Celular del usuario'
      },
      {
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre del usuario'
      },
      {
        name: 'contrasenia',
        type: 'text',
        placeholder: 'contraseña del usuario'
      },
      {
        name: 'username',
        type: 'text',
        placeholder: 'username del usuario'
      },
      {
        name: 'email',
        type: 'text',
        placeholder: 'Correo del usuario'
      },
      {
        name: 'pref_comida',
        type: 'text',
        placeholder: 'Comida preferida del usuario'
      },
      {
        name: 'ubi_actual',
        type: 'text',
        placeholder: 'Ubicación del usuario'
      },


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
          this.addUser(data.celular,data.nombre,data.contrasenia,
            data.username,data.email,data.pref_comida,data.ubi_actual);
          console.log('Confirm Ok');
        }
      }

      ]
    });
    await alert.present();
  }

  addUser(celular:number,nombre:string,contrasenia:string,username:string,
    email:string,pref_comida:string,ubi_actual:string){
    const usuario={
      celular,nombre,contrasenia,username,email,pref_comida,ubi_actual
    };
    console.log(usuario);
    this.userService.createUser(usuario)
    .subscribe((data)=>{
      this.getAllUsers();
      this.presentToast('Su usuario fué creado correctamente');
    })
  }

  iniciar(correo:string,pass:string){
    
    this.usuarios.forEach(usuario => {
      if(usuario.email==correo){
        if(usuario.contrasenia == pass){
          this.presentToast('Usuario correcto');
          this.existe= true;
          this.router.navigate(['/home']);
          this.userService.user_id = "0" || usuario.id;
          this.usuario = usuario.email;
          this.userService.usuario_activo=usuario.email;
          this.userService.celular_activo=Number(usuario.celular);
          this.userService.nombre_activo=usuario.nombre;
          this.userService.email_activo=usuario.email;
          this.userService.ubiactual_activo=usuario.ubi_actual;

          console.log(`Se guarda la siguiente info: ${this.usuario}`);
          
        }
      }});
    
    if(this.existe==false){
      this.presentToast('Su correo no  coincide o la contraseña es incorrecta');
    }
    this.existe=false;
  }

  deleteUser(id:number,index:number){
    this.userService.deleteUser(id)
    .subscribe(()=>{
      this.usuarios.splice(index,1);
      this.presentToast('Su usuario fué eliminado correctamente');

    })
  }

  async presentToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }

  inicio() {
    this.showLoginForm = true;
    this.showRegistrationForm = false;
  }

  inicio_sesion() {

    this.iniciar(this.formData.correo,this.formData.password);

  }
  
  registro() {

    this.showLoginForm = false;
    this.showRegistrationForm = true;
  }

  generar_registro() {
    console.log(`Datos ingresados a generar registro: ${this.formData2}`);
    this.addUser(this.formData2.celular,this.formData2.nombre,this.formData2.contrasenia,
    this.formData2.username,this.formData2.email,this.formData2.pref_comida,this.formData2.ubi_actual);

  }
}
