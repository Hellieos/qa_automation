import type { PokemonAPIResponse } from './types';
import { PokemonSummary } from './models';

// Абстракція: базова сутність з контрактом kind() > вимагає, щоб кожен клас-нащадок реалізував метод kind()
// використала readonly, щоб не можна було змінити id та name після створення об’єкта, бо це сталі властивості
export abstract class BaseEntity {
    public constructor(public readonly id: number, public readonly name: string) {}
    public toLabel(): string {
        return `#${this.id} ${this.name}`;
    }
    public abstract kind(): string;
}

// Абстрактний трансформер (абстракція з узагальненням щоб можна було задавати будь-який тип вхідних і вихідних даних)
export abstract class Transformer<I, O> {
    public abstract transform(input: I): O;
}

// Конкретний трансформер: повний респонс > коротке уявлення про покемона
export class PokemonToSummary extends Transformer<PokemonAPIResponse, PokemonSummary> {
    public transform(input: PokemonAPIResponse): PokemonSummary {
        return new PokemonSummary(input);
    }
}

//Наслідування: PokemonEntity успадковує BaseEntity
//Композиція: всередині зберігає summary (інший клас) і делегує дії

export class PokemonEntity extends BaseEntity {
    public constructor(private readonly summary: PokemonSummary) {
        super(summary.id, summary.name);
    }

    public kind(): string {
        return 'pokemon';
    }

    // приклади маніпуляцій через методи
    public hasAbility(name: string): boolean {
        return this.summary.abilityNames.includes(name);
    }

    public mainType(): string | undefined {
        return this.summary.typeNames[0];
    }

    public info(): string {
        return `${this.toLabel()} [${this.mainType()}], totalStat=${this.summary.totalBaseStat}`;
    }

    public get image(): string | undefined {
        return this.summary.spriteUrl;
    }
}
