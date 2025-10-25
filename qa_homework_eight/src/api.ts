import type { PokemonAPIResponse } from './types';

// допоміжне: безпечне діставання основної картинки
const getSpriteUrl = (p: PokemonAPIResponse): string | undefined => {
    return (
        p.sprites.other?.['official-artwork']?.front_default ??
        p.sprites.front_default ??
        undefined
    );
};

// Надсилає запит і повертає типізований PokemonAPIResponse
export async function fetchPokemon(nameOrId: string | number): Promise<PokemonAPIResponse> {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText} для ${url}`);
    }

    const json = (await res.json()) as PokemonAPIResponse;

    // Невеличка “гарантія”: додамо картинку, якщо її можна витягнути
    if (!json.sprites.front_default) {
        const fallback = getSpriteUrl(json);
        if (fallback) json.sprites.front_default = fallback;
    }

    return json;
}
