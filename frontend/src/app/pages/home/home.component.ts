import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  features = [
    {
      title: 'Experiencia',
      description: 'Nuestro maestro sastre cuenta con más de 60 años de experiencia en el arte de la confección, transmitiendo tradición, precisión y pasión en cada prenda..',
      icon: 'assets/icons/feature1.svg'
    },
    {
      title: 'Puntualidad',
      description: 'Valoramos tu tiempo. Nos comprometemos a entregar cada encargo en la fecha acordada, sin comprometer la calidad.',
      icon: 'assets/icons/feature2.svg'
    },
    {
      title: 'Personalización',
      description: '¿No encuentras lo que buscas? Diseñamos y ajustamos prendas a medida para reflejar tu estilo y necesidades individuales.',
      icon: 'assets/icons/feature3.svg'
    }
  ];
}
