import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricService } from '../../core/services/fabrics/fabric.service';
import { Fabric } from '../../core/models/fabric.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { Token } from '@angular/compiler';

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
}
