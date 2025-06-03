import { Routes } from '@angular/router';
import { authGuard } from './guards';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SelectComponent } from './components/select/select.component';
import { LoginPropietarioComponent } from './components/propietario/login-propietario/login-propietario.component';
import { PortalPropietarioComponent } from './components/propietario/portal-propietario/portal-propietario.component';
import { PerfilPropietarioComponent } from './components/propietario/perfil-propietario/perfil-propietario.component';

export const routes: Routes = [
  {
    path: "",
    component: MainPageComponent
  },
  {
    path: 'select',
    component: SelectComponent
  },
  {
    path: 'create-account',
    children: [
      {
        path: 'propietario',
        component: LoginPropietarioComponent
      },
    ]
  },
  {
    path: 'propietario',
    children: [
      {
        path: '',
        redirectTo: "portal",
        pathMatch: "full"
      },
      {
        path: 'portal',
        canActivate: [authGuard],
        component: PortalPropietarioComponent,
      },
      {
        path: 'perfil',
        canActivate: [authGuard],
        component: PerfilPropietarioComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

