import { Component } from '@angular/core';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isCurrenciesActive: boolean = false

  constructor(private navbarRoutingService: NavbarRoutingService) {}

  public onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies('')
  }

  public onClickCalculator(): void {
    this.navbarRoutingService.onClickCalculator()
  }

  public onClickGold(): void {
    this.navbarRoutingService.onClickGold()
  }
}
