import { Component, OnInit } from '@angular/core';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCurrenciesActive: boolean = false

  constructor(private navbarRoutingService: NavbarRoutingService) {}

  ngOnInit(): void {
  
  }

  onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies()
  }

  onClickCalculator(): void {
    this.navbarRoutingService.onClickCalculator()
  }

  onClickGold(): void {
    this.navbarRoutingService.onClickGold()
  }
}
