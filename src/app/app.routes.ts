import { Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent,
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "moments/new", component: NewMomentComponent
  },
  {
    path: "moments/:id", component: MomentComponent
  }
];
