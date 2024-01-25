import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('transparentBackground', [
      state('true', style({backgroundColor: 'transparent'})),
      state('false', style({backgroundColor: '#FFC400'})),
      transition( '* <=> *', animate(300))
    ])
  ]
})
export class NavbarComponent implements OnInit{
  private TRANSPARENT_SCROLL_OFFSET: number = 40
  isTransparent: boolean = true
  isCurrenciesActive: boolean = false
  isCollapsed = true;
  toggleIcon: IconDefinition = faBars;

  constructor(private navbarRoutingService: NavbarRoutingService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    
   }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
    if(this.isCollapsed) {
      this.toggleIcon = faBars
    } else {
      this.toggleIcon = faXmark
    }
    this.isTransparent = this.isCollapsed && this.isTransparentScrollOffset()
  }

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if(!this.isCollapsed) return
    this.isTransparent = this.isTransparentScrollOffset()
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET
  }

  onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies()
    this.viewportScroller.scrollToPosition([0,0])
  }

  onClickCalculator(): void {
    this.navbarRoutingService.onClickCalculator()
    this.viewportScroller.scrollToPosition([0,0])
  }

  onClickGold(): void {
    this.navbarRoutingService.onClickGold()
    this.viewportScroller.scrollToPosition([0,0])
  }
}
