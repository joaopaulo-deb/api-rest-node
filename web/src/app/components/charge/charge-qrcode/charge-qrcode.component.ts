import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargeService } from '../charge.service';
import { Qrcode } from '../qrcode.model';

@Component({
  selector: 'app-charge-update',
  templateUrl: './charge-qrcode.component.html',
  styleUrls: ['./charge-qrcode.component.css']
})
export class ChargeQrcodeComponent implements OnInit {

  chargeId: number;
  qrcode: Qrcode;
  showSpinner: boolean;
  showQrcode: boolean;

  constructor(
    private chargeService: ChargeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.chargeId = 0;
    this.qrcode = { qrcode: '', imagemQrcode: '' };
    this.showSpinner = true;
    this.showQrcode = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.chargeService.qrCode(id || '0').subscribe(qrcode => {
      this.qrcode = qrcode;
      this.showQrcode = true;
      this.showSpinner = false;
    });

  }

  cancel(): void {
    this.router.navigate(['/charges']);
  }

}
