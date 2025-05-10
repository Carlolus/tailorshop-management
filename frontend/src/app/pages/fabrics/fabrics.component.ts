import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricService } from '../../core/services/fabrics/fabric.service';
import { Fabric } from '../../core/models/fabric.model';

@Component({
  selector: 'app-fabrics',
  imports: [CommonModule],
  templateUrl: './fabrics.component.html',
  styleUrl: './fabrics.component.scss'
})
export class FabricsComponent {
  fabrics: Fabric[] = [];

  constructor(private fabricService: FabricService) {
    this.fabricService.getFabrics().subscribe((fabrics: Fabric[]) => {
      this.fabrics = fabrics;
      console.log(this.fabrics);
    });
  }
  /*
  fabrics2 = [
    {
      name: 'Lino Natural',
      description: 'Tela fresca y ligera, ideal para verano.',
      image: 'assets/fabrics/lino.jpg'
    },
    {
      name: 'Algodón Premium',
      description: 'Tela suave y cómoda para uso diario.',
      image: 'assets/fabrics/algodon.jpg'
    },
    {
      name: 'Seda Italiana',
      description: 'Tela elegante y suave con un brillo natural.',
      image: 'assets/fabrics/seda.jpg'
    },
    {
      name: 'Lana Merino',
      description: 'Tela cálida y duradera para clima frío.',
      image: 'assets/fabrics/lana.jpg'
    },
    {
      name: 'Lino Natural',
      description: 'Tela fresca y ligera, ideal para verano.',
      image: 'assets/fabrics/lino.jpg'
    },
    {
      name: 'Algodón Premium',
      description: 'Tela suave y cómoda para uso diario.',
      image: 'assets/fabrics/algodon.jpg'
    },
    {
      name: 'Seda Italiana',
      description: 'Tela elegante y suave con un brillo natural.',
      image: 'assets/fabrics/seda.jpg'
    },
    {
      name: 'Lana Merino',
      description: 'Tela cálida y duradera para clima frío.',
      image: 'assets/fabrics/lana.jpg'
    }
  ];
  */
}
