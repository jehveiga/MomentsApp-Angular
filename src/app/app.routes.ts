import { Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent,
  },
  {
    path: "about", component: AboutComponent
  }
];
