'use client'

import { FormEvent, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'

type Pokemon = {
  id: number
  name: string
  image: string
}

const featuredPokemon: Pokemon[] = [
  { id: 25, name: 'pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
  { id: 1, name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
  { id: 4, name: 'charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
]

export function Pokedex() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Pokemon[]>(featuredPokemon)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function searchPokemon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const term = query.trim().toLowerCase()
    if (!term) return

    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(term)}`)
      if (!response.ok) throw new Error('No encontrado')
      const pokemon = await response.json()
      setResults([{ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.other['official-artwork'].front_default }])
    } catch {
      setResults([])
      setError(`No encontramos a “${term}”. Prueba con otro nombre.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">PokeAPI</p>
              <p className="text-sm text-muted-foreground">Explorador de criaturas</p>
            </div>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">#{String(results[0]?.id ?? 151).padStart(3, '0')}</span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-sm uppercase tracking-[0.25em] text-primary">/ Pokédex digital</p>
            <h1 className="max-w-2xl text-balance text-5xl font-black tracking-[-0.06em] text-foreground sm:text-7xl">Encuentra tu próximo Pokémon.</h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Busca cualquier criatura por su nombre y descubre su ilustración oficial al instante.</p>

            <form onSubmit={searchPokemon} className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row" role="search">
              <label htmlFor="pokemon-search" className="sr-only">Nombre del Pokémon</label>
              <div className="flex flex-1 items-center rounded-2xl border-2 border-border bg-card px-4 shadow-sm transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input id="pokemon-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. mewtwo, eevee, lucario..." className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70" />
              </div>
              <button type="submit" disabled={loading} className="h-14 rounded-2xl bg-primary px-7 font-bold text-primary-foreground shadow-sm transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{loading ? 'Buscando...' : 'Buscar Pokémon'}</button>
            </form>
            {error && <p className="mt-4 text-sm font-medium text-destructive" role="alert">{error}</p>}
          </div>

          <div className="mt-16">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Resultados</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{query && !error ? 'Tu búsqueda' : 'Para empezar'}</h2></div>
              <p className="font-mono text-xs text-muted-foreground">{results.length} {results.length === 1 ? 'registro' : 'registros'}</p>
            </div>
            {results.length > 0 ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{results.map((pokemon) => <article key={pokemon.id} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="absolute right-5 top-5 font-mono text-xs text-muted-foreground">#{String(pokemon.id).padStart(3, '0')}</div><div className="flex h-48 items-center justify-center rounded-2xl bg-secondary/70"><img src={pokemon.image} alt={`Ilustración de ${pokemon.name}`} className="h-40 w-40 object-contain drop-shadow-md transition duration-300 group-hover:scale-110" /></div><h3 className="mt-5 text-xl font-bold capitalize">{pokemon.name}</h3><p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Pokémon registrado</p></article>)}</div> : <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">Intenta buscar por nombre o número de Pokédex.</div>}
          </div>
        </section>
        <footer className="border-t border-border py-5 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Datos proporcionados por PokeAPI</footer>
      </div>
    </main>
  )
}
