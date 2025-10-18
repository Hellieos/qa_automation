import type { IBeing, ISpellCaster, IFlyer, IPotionBrewer } from './interfaces';

// DIP: функції працюють з АБСТРАКЦІЯМИ, а не з конкретними класами

export function duel(a: ISpellCaster, b: ISpellCaster, spellA: string, spellB: string): void {
    console.log(`🔴 Duel: ${a.name} vs ${b.name}`);
    console.log(a.cast(spellA, b));
    console.log(b.cast(spellB, a));
}

export function patrolOnBroom(flyer: IFlyer, km: number): void {
    console.log(`🟢 Patrol: ${flyer.name}`);
    flyer.fly(km);
    console.log(`${flyer.name} altitude: ${flyer.getAltitude()} m`);
}

export function brewLesson(brewer: IPotionBrewer, potion: string): void {
    console.log(`🟡 Lesson: ${brewer.name}`);
    console.log(brewer.brew(potion));
}

// універсальний репортер для будь-якої істоти
export function report(being: IBeing): void {
    console.log(`→ ${being.name}`);
}
