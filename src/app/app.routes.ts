import { Routes } from '@angular/router';
import { BarChart } from './pages/charts/bar-chart/bar-chart';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', loadComponent: () => import('./pages/charts/bar-chart/bar-chart').then(m => m.BarChart) },
  { path: 'analytics', component: BarChart },

];
