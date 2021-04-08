import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin/home',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  }, {
    path: 'admin/events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'admin/faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule),
  },
  {
    path: 'admin/cms',
    loadChildren: () => import('./pages/cms/cms.module').then(m => m.CmsModule),
  },
   {
    path: 'admin/inquires',
    loadChildren: () => import('./pages/inquires/inquires.module').then(m => m.InquiresModule),
  },
   {
    path: 'admin/report',
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
  },
   {
    path: 'admin/seo',
    loadChildren: () => import('./pages/seo/seo.module').then(m => m.SeoModule),
  },
   {
    path: 'admin/sub-admin',
    loadChildren: () => import('./pages/sub-admin/sub-admin.module').then(m => m.SubAdminModule),
  },
  {
    path: 'admin/user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },
  
  
 


  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    data: {
      customLayout: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
