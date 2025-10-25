import type { PokemonAPIResponse } from './types';

// Коротке представлення покемона - використала readonly, щоб захистити дані, які не повинні змінюватися після створення об’єкта
export class PokemonSummary {
    public readonly id: number;
    public readonly name: string;
    public readonly abilityNames: string[];
    public readonly typeNames: string[];
    public readonly totalBaseStat: number;
    public readonly spriteUrl?: string;
    public readonly heightM: number;
    public readonly weightKg: number;
    public readonly bmiApprox: number;

    // конструктор приймає попередній об'єкт і тут відбувається перетворення
    public constructor(full: PokemonAPIResponse) {
        this.id = full.id;
        this.name = full.name;
        this.abilityNames = full.abilities.map(a => a.ability.name);
        this.typeNames = full.types
            .sort((a, b) => a.slot - b.slot)
            .map(t => t.type.name);
        this.totalBaseStat = full.stats.reduce((acc, s) => acc + s.base_stat, 0);

        // одиниці від PokeAPI: height — дециметри, weight — гектограми
        this.heightM = full.height / 10;
        this.weightKg = full.weight / 10;

        // обчислення індексу маси тіла BMI покемона
        this.bmiApprox = Number((this.weightKg / (this.heightM ** 2)).toFixed(2));

        this.spriteUrl =
            full.sprites.other?.['official-artwork']?.front_default ??
            full.sprites.front_default ??
            undefined;
    }

    public prettyPrint(): string {
        return [
            `#${this.id} ${this.name.toUpperCase()}`,
            `types: ${this.typeNames.join(', ')}`,
            `abilities: ${this.abilityNames.join(', ')}`,
            `total base stat: ${this.totalBaseStat}`,
            `h=${this.heightM}m, w=${this.weightKg}kg, BMI≈${this.bmiApprox}`,
            this.spriteUrl ? `img: ${this.spriteUrl}` : null
        ].filter(Boolean).join('\n');
    }
}
