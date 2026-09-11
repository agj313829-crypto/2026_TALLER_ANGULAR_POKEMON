import { Component, inject } from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import { PokemonStorageService, PokemonTarjeta} from '../../services/pokemon-storage.service';
import { ResaltarTarjeta} from '../../directives/resaltar-tarjeta';

@Component({
  selector: 'app-inventario-pokemon',
  imports: [NgClass, NgStyle, ResaltarTarjeta],
  templateUrl: './inventario-pokemon.html',
  styleUrl: './inventario-pokemon.css',
})
export class InventarioPokemon {

}
