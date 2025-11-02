import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'overview', route: '/overview' },
    { icon: 'analytics', label: 'data-analysis', route: '/analytics' },
    { icon: 'assessment', label: 'reports', route: '/reports' },
    { icon: 'people', label: 'user-management', route: '/users' },
    { icon: 'settings', label: 'settings', route: '/settings' },
  ];
}
