import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page {
  notas: any[] = [];
  notasFiltradas: any[] = [];
  textoBuscar: string = '';

  constructor(private alertController: AlertController, private router: Router) {
    const notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
      this.notas = JSON.parse(notasGuardadas);
      this.notasFiltradas = [...this.notas]; // Inicialmente todas
    }
  }

  filtrarNotas() {
    const texto = this.textoBuscar.toLowerCase();
    this.notasFiltradas = this.notas.filter(nota =>
      nota.titulo.toLowerCase().includes(texto) ||
      nota.autor.toLowerCase().includes(texto)
    );
  }

  async eliminarNota(index: number) {
    const alert = await this.alertController.create({
      header: '¿Eliminar?',
      message: '¿Seguro que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.notas.splice(index, 1);
            localStorage.setItem('notas', JSON.stringify(this.notas));
            this.filtrarNotas(); // 👈 Actualizamos filtrado
          }
        }
      ]
    });

    await alert.present();
  }

  editarNota(index: number) {
    const notaSeleccionada = this.notas[index];
    localStorage.setItem('notaParaEditar', JSON.stringify({ index, ...notaSeleccionada }));
    this.router.navigate(['/tabs/tab2']);
  }
}
