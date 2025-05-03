import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFab, 
  IonFabButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, navigate, add } from 'ionicons/icons'; // Íconos correctos

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton
  ], // 👈 Aquí ahora está todo importado correctamente
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {
    addIcons({ home, navigate, add });
  }

  navigateToAddNote() {
    this.router.navigate(['/tabs/tab2']);
  }
}
