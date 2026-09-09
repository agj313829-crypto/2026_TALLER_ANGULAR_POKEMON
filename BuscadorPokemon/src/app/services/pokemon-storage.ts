import { Injectable, inject, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface pokemonTarjeta {
  id:number;
  name:string;
  image:string;
  type:string;
  baseExperience: number;
  esFavorito?: boolean;
}


@Injectable({
  providedIn: 'root',
})


export class PokemonStorageService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'equipo_pokemon_registrado';

  misPokemones = signal<pokemonTarjeta[]>([]);
  

  constructor() {
    this.cargarpokemonsDesdeStorage();
  }

  private cargarpokemonsDesdeStorage() {
    const data=  localStorage.getItem(this.STORAGE_KEY);
    
    if (data) {
      this.misPokemones.set(JSON.parse(data));
    }
  }
}
