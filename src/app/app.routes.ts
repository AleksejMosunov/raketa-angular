import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

import { AuthGuard } from './services/auth-guard';
import { LoginGuard } from './services/login-guard';
import { Tracks } from './pages/tracks/tracks';
import { TrackDetails } from './pages/track-details/track-details';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Tracks },
  { path: 'login', component: Login }, // теперь защищён от залогиненных
  { path: 'track/:id', component: TrackDetails },
  // { path: '**', redirectTo: '/login' },
];
