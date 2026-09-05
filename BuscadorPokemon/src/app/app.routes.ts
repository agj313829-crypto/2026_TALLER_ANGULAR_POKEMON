import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './components/buscador-pokemon/buscador-pokemon';

export const routes: Routes = [
  { path: 'registro', component: RegistroUsuario },
  { path: 'buscador', component: BuscadorPokemon },
  { path: '', redirectTo: '/buscador', pathMatch: 'full' }
];