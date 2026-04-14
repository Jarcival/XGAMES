import { Component, signal, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.updateIndicator(), 50); // Delay for routerLinkActive to apply
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