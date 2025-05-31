import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-new',
  imports: [],
  templateUrl: './payment-new.component.html',
  styleUrl: './payment-new.component.scss'
})
export class PaymentNewComponent implements OnInit {

  mode!: string;
  id!: string;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.mode = this.route.snapshot.paramMap.get('mode') || 'nan';
    const id = this.route.snapshot.paramMap.get('id');

    console.log("Modo: ",this.mode, " ID orden:",id);
  }
}

