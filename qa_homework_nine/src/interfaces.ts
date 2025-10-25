// ISP: маленькі чіткі контракти

export interface IBeing {
    readonly name: string;
}

export interface ISpellCaster extends IBeing {
    cast(spell: string, target?: IBeing): string; // повертаємо опис дії
    getMagic(): number;
}

export interface IFlyer extends IBeing {
    fly(distance: number): void;
    getAltitude(): number;
}

export interface IPotionBrewer extends IBeing {
    brew(potion: string): string;
}

export enum HogwartsHouse {
    Gryffindor = 'Gryffindor',
    Slytherin = 'Slytherin',
    Ravenclaw = 'Ravenclaw',
    Hufflepuff = 'Hufflepuff'
}
