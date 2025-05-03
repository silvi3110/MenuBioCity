import { Component } from '@angular/core';
import { IonicModule, ToastController, AnimationController } from '@ionic/angular'; // 👈 AGREGA AnimationController aquí
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page {
  nuevaNota = {
    titulo: '',
    descripcion: '',
    autor: '',
    imagen: '',
    fecha: new Date().toLocaleDateString('es-ES')
  };

  indexEditar: number | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private animationCtrl: AnimationController // 👈 INYECTA el AnimationController aquí
  ) {
    const notaParaEditar = localStorage.getItem('notaParaEditar');
    if (notaParaEditar) {
      const nota = JSON.parse(notaParaEditar);
      this.indexEditar = nota.index;
      this.nuevaNota = {
        titulo: nota.titulo,
        descripcion: nota.descripcion,
        autor: nota.autor,
        imagen: nota.imagen,
        fecha: nota.fecha
      };
      localStorage.removeItem('notaParaEditar');
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.nuevaNota.imagen = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async guardarNota() {
    const notasGuardadas = localStorage.getItem('notas');
    let notas = notasGuardadas ? JSON.parse(notasGuardadas) : [];

    if (this.indexEditar !== null) {
      notas[this.indexEditar] = this.nuevaNota;
    } else {
      notas.push(this.nuevaNota);
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    await this.animarYRegresar(); // 👈 LLAMAS animar y luego navegas
    this.showToast('Nota guardada correctamente');
  }

  async animarYRegresar() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('ion-content')!)
      .duration(500)
      .fromTo('opacity', '1', '0');

    await animation.play();
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
