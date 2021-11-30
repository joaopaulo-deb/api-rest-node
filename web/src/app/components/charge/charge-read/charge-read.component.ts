import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Charge } from '../charge.model';
import { ChargeService } from '../charge.service';

@Component({
  selector: 'app-charge-read',
  templateUrl: './charge-read.component.html',
  styleUrls: ['./charge-read.component.css']
})
export class ChargeReadComponent implements OnInit {

  charges: Charge[] = [];
  displayedColumns = ['id', 'name', 'status', 'value', 'actions'];
  showSpinner = true;
  showTable = false;
  constructor(private chargeService: ChargeService, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.chargeService.read().subscribe((charges: any) => {
      this.charges = charges;
      this.showSpinner = false;
      this.showTable = true;
    });
  }

  deletecharge(id: string) : void {
    this.chargeService.delete(id).subscribe(()=>{
      this.chargeService.showMessage('Pagamento excluido com sucesso!');
      this.init();
    });
  }



}
