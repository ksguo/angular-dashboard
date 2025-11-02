import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems = [
    { icon: 'dashboard', label: '概览', route: '/overview' },
    { icon: 'analytics', label: '数据分析', route: '/analytics' },
    { icon: 'assessment', label: '报表', route: '/reports' },
    { icon: 'people', label: '用户管理', route: '/users' },
    { icon: 'settings', label: '设置', route: '/settings' },
  ];
}
