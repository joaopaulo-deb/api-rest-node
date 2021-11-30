import { Component, OnInit } from '@angular/core';
import { ChargeService } from '../charge.service';
import { Router } from '@angular/router'
import { Charge } from '../charge.model';

@Component({
  selector: 'app-charge-create',
  templateUrl: './charge-create.component.html',
  styleUrls: ['./charge-create.component.css']
})
export class ChargeCreateComponent implements OnInit {

  charge: Charge = {
    calendario: {
      expiracao: 3600
    },
    devedor: {
      nome: "",
      cpf: ""
    },
    valor: {
      original: ""
    },
    chave: ""
  };

  constructor(private chargeService: ChargeService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createCharge(): void {
    this.chargeService.create(this.charge).subscribe((response) => {
      if(response.erros){
        this.chargeService.showMessage(response.mensagem);
      } else {
        this.chargeService.showMessage('Cobrança criada com sucesso!');
        this.router.navigate(['/charges']);
      }
      
    });
  }

  cancel(): void {
    this.router.navigate(['/charges']);
  }

}
