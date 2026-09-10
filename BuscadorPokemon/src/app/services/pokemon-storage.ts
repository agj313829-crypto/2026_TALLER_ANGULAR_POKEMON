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
  //-1. Obtener datos de la API 
  buscarEnApi(nombreOId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);

  }
  // -2.Guardar/crear  pokemon dentro del el maleto

  guardarPokemon(nuevo: pokemonTarjeta) {
    const actualizados = [...this.misPokemones(), nuevo];
    this.misPokemones.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  }

  // -3. Actualizar Pokemon Favorito.

  actualizarFavorito(id: number) {
    const actualizados = this.misPokemones().map(poke => {
      if (poke.id === id) {
        return { ...poke, esFavorito: !poke.esFavorito};
      }
      return poke;
    });
    this.misPokemones.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
      
  };

  //-4. Eliminar Pokemon del maleto
  eliminarPokemon(id: number) {
    const filtrados = this.misPokemones().filter(poke => poke.id !== id);
    this.misPokemones.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }
}
