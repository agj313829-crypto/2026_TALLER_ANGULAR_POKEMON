import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface Usuario {
  id: number;
  nombreCompleto: string;
  documento : {
     tipo : string,
     numero : string;
  };
  LugarNacimiento: {
    pais: string;
    ciudad: string;
  };
  fecha : string,
  numero : string,
  datospersonales : boolean,
  fechaRegistro: string
}




@Component({
  selector: 'app-registro-usuario',
  imports: [FormsModule, CommonModule],
  standalone : true,
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})

export class RegistroUsuario {
  nombre = signal('');
  apellido = signal('');
  pais = signal('');
  ciudad = signal('');
  tipo_documento = signal('');
  numero_de_identificacion = signal('');
  fecha_de_nacimiento = signal('');
  numero_de_celular = signal('');
  datos_personales = signal(false);

  ultimoUsuario = signal<Usuario | null>(null); 

  guardarUsuario(){
    if(!this.datos_personales()){
      alert('Debes aceptar el tratamiento de datos personales')
      return;
    }
  
    const usuarioCreado = {
        id : Date.now(),
        nombreCompleto :`${this.nombre()} ${this.apellido()}`,
        LugarNacimiento : {
            pais: this.pais(),
            ciudad: this.ciudad()
        },
        documento : {
            tipo : this.tipo_documento(),
            numero : this.numero_de_identificacion()
        },
        fecha : this.fecha_de_nacimiento(),
        numero : this.numero_de_celular(),
        datospersonales : this.datos_personales(),
        fechaRegistro: new Date().toLocaleDateString()
    };
        
    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));

    this.ultimoUsuario.set(usuarioCreado);
    
    // Resetear el formulario
    this.nombre.set('');
    this.apellido.set('');
    this.pais.set('');
    this.ciudad.set('');
    this.tipo_documento.set('');
    this.numero_de_identificacion.set('');
    this.fecha_de_nacimiento.set('');
    this.numero_de_celular.set('');
    this.datos_personales.set(false);
    }
}


