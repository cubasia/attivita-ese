import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
const routes: Routes = [
  {
    path: 'activity',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListComponent,
    pathMatch: 'full',
  },
  {
    path: 'list/:acctno',
    component: DetailComponent,
    pathMatch: 'full',
  },
  { path: '**',  component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
