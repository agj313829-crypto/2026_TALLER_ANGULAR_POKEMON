import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemonComponent } from './components/buscador-pokemon/buscador-pokemon';
import { InventarioPokemon } from './components/inventario-pokemon/inventario-pokemon';
import { PruebaPrueba } from './components/prueba/prueba.prueba';


export const routes: Routes = [
  { path: 'registro', component: RegistroUsuario },
  { path: 'buscador', component: BuscadorPokemonComponent },
  { path: 'inventario', component: InventarioPokemon },
  { path: '', redirectTo: '/buscador', pathMatch: 'full' }
];