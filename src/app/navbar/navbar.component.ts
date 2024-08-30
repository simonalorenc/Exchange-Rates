import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
export class NavbarComponent implements OnInit, OnDestroy {
  private TRANSPARENT_SCROLL_OFFSET: number = 40;
  isUserLogged!: boolean;
  isTransparent: boolean = true
  isCurrenciesActive: boolean = false
  isCollapsed = true;
  username: string = '';
  isLargeScreenWidth!: boolean;
  toggleIcon: IconDefinition = faBars;
  private loginSubscription! :Subscription;
  private usernameSubscription! :Subscription;

  constructor(private navbarRoutingService: NavbarRoutingService, private viewportScroller: ViewportScroller, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.authService.isLoggedObservable().subscribe(
      res => {
        this.isUserLogged = res;
        this.isLargeScreenWidth = window.innerWidth > 992;
      }
    )
    this.usernameSubscription = this.authService.usernameObservable().subscribe(
      username => {
        this.username = username;
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.usernameSubscription?.unsubscribe();
  }

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if(!this.isCollapsed) return
    this.isTransparent = this.isTransparentScrollOffset();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 992) {
      this.isLargeScreenWidth = true
    } else {
      this.isLargeScreenWidth = false;
    }
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
    if(this.isCollapsed) {
      this.toggleIcon = faBars
    } else {
      this.toggleIcon = faXmark
    }
    this.isTransparent = this.isCollapsed && this.isTransparentScrollOffset()
  }

  private isTransparentScrollOffset(): boolean {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET;
  }

  public onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies('');
    this.viewportScroller.scrollToPosition([0,0]);
  }

  public onClickCalculator(): void {
    this.navbarRoutingService.onClickCalculator();
    this.viewportScroller.scrollToPosition([0,0]);
  }

  public onClickGold(): void {
    this.navbarRoutingService.onClickGold();
    this.viewportScroller.scrollToPosition([0,0]);
  }

  public logout(): void {
    this.authService.logoutUser();
    this.username = '';
    if (this.isLargeScreenWidth = window.innerWidth < 992) {
      this.toggleCollapse();
    }
  }
}
