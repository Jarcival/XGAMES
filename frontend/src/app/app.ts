import { Component, signal, ElementRef, ViewChild, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  protected readonly title = signal('frontend');
  menuOpen = false;

  @ViewChild('navLinks') navLinks!: ElementRef;
  indicatorStyle = { left: '0px', width: '0px', opacity: 0 };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.updateIndicator(), 50);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateIndicator(), 100);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIndicator();
  }

  updateIndicator() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.navLinks || window.innerWidth <= 768) return;

    const activeEl = this.navLinks.nativeElement.querySelector('.active') as HTMLElement;
    if (activeEl) {
      this.indicatorStyle = {
        left: `${activeEl.offsetLeft}px`,
        width: `${activeEl.offsetWidth}px`,
        opacity: 1
      };
    } else {
      this.indicatorStyle = { ...this.indicatorStyle, opacity: 0 };
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}