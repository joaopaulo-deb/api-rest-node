import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToChargeCreate(): void {
    this.router.navigate(['charges/create']);
  }

}
