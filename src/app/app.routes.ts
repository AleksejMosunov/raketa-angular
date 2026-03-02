import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { TrackSelection } from './pages/track-selection/track-selection';
import { ActiveRaces } from './pages/active-races/active-races';
import { RaceDetail } from './pages/race-detail/race-detail';
import { AuthGuard } from './services/auth-guard';
import { LoginGuard } from './services/login-guard';
import { TrackList } from './pages/track-list/track-list';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [LoginGuard] }, // теперь защищён от залогиненных
  { path: 'track-selection', component: TrackSelection, canActivate: [AuthGuard] },
  { path: 'active-races', component: ActiveRaces, canActivate: [AuthGuard] },
  { path: 'race/:id', component: RaceDetail, canActivate: [AuthGuard] },
  { path: 'track-list', component: TrackList, canActivate: [AuthGuard] }, // добавляем новый маршрут для TrackList
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
