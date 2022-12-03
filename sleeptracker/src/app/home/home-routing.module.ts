import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'sleepiness',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/sleepiness/sleepiness.module').then(
                (m) => m.SleepinessPageModule
              ),
          },
        ],
      },
      {
        path: 'data',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/data/data.module').then((m) => m.DataPageModule),
          },
        ],
      },
      {
        path: 'sleep',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/sleep/sleep.module').then(
                (m) => m.SleepPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/sleepiness',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/sleep',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
