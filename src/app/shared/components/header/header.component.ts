import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/investment-details', label: 'Investment Details' },
  ];

  constructor() {}
}
