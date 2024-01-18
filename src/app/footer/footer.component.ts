import { Component } from '@angular/core';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private navbarRoutingService: NavbarRoutingService, private viewPortScroller: ViewportScroller) {}

  onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies()
    this.viewPortScroller.scrollToPosition([0, 0])
  }
}
