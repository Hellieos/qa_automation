// мінімальний subset полів респонсу PokeAPI
export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface PokemonAbility {
    ability: NamedAPIResource;   // { name, url }
    is_hidden: boolean;
    slot: number;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;      // { name, url }
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;      // { name, url }
}

export interface PokemonSprites {
    front_default: string | null;
    other?: {
        'official-artwork'?: {
            front_default: string | null;
        };
    };
}

export interface PokemonAPIResponse {
    id: number;
    name: string;
    height: number; // у дециметрах
    weight: number; // у гектограмах
    abilities: PokemonAbility[];
    types: PokemonType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}
