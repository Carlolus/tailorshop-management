import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  // Este componente contiene las secciones de nuestra landing page
  features = [
    {
      title: 'Característica 1',
      description: 'Descripción de la primera característica importante de tu producto o servicio.',
      icon: 'assets/icons/feature1.svg'
    },
    {
      title: 'Característica 2',
      description: 'Descripción de la segunda característica importante de tu producto o servicio.',
      icon: 'assets/icons/feature2.svg'
    },
    {
      title: 'Característica 3',
      description: 'Descripción de la tercera característica importante de tu producto o servicio.',
      icon: 'assets/icons/feature3.svg'
    }
  ];
}
