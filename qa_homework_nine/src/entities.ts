import { IBeing, ISpellCaster, IFlyer, IPotionBrewer, HogwartsHouse } from './interfaces';

// Абстракція + інкапсуляція
export abstract class MagicalEntity implements IBeing {
    protected magic = 100; // умовні очки магії
    public constructor(public readonly name: string) {}

    public toLabel(): string {
        return `${this.kind()}: ${this.name}`;
    }

    public abstract kind(): string;
}

// Базовий маг (відкритий для розширення — OCP)
export class Wizard extends MagicalEntity implements ISpellCaster {
    public constructor(name: string, public readonly house?: HogwartsHouse, protected wandCore = 'phoenix feather') {
        super(name);
    }

    public kind(): string {
        return 'Wizard';
    }

    public cast(spell: string, target?: IBeing): string {
        if (this.magic <= 0) return `${this.name} is too exhausted to cast ${spell}.`;
        this.magic -= 10;
        const tgt = target ? ` at ${target.name}` : '';
        return `${this.name} casts "${spell}"${tgt} (magic=${this.magic}).`;
    }

    public getMagic(): number {
        return this.magic;
    }
}

// Відьма — те саме сімейство; показуємо LSP (можна підставити як Wizard/SpellCaster)
export class Witch extends Wizard {
    public kind(): string {
        return 'Witch';
    }
}

// Аврор — спеціалізація мага, перевизначає поведінку (поліморфізм)
export class Auror extends Wizard {
    public kind(): string {
        return 'Auror';
    }

    public override cast(spell: string, target?: IBeing): string {
    // Аврори крутять бойові закляття ефективніше
        const boosted = /expelliarmus|stupefy|protego|patronus/i.test(spell);
        const cost = boosted ? 8 : 10;
        if (this.magic < cost) return `${this.name} lacks magic for "${spell}".`;
        this.magic -= cost;
        const tag = boosted ? ' (auror boost)' : '';
        const tgt = target ? ` at ${target.name}` : '';
        return `${this.name} casts "${spell}"${tgt}${tag} (magic=${this.magic}).`;
    }
}

// Пожирач смерті — інший стиль каста
export class DeathEater extends Wizard {
    public kind(): string {
        return 'Death Eater';
    }

    public override cast(spell: string, target?: IBeing): string {
        const dark = /crucio|imperio|avada kedavra/i.test(spell);
        const cost = dark ? 6 : 12; // темні закляття “дешевші” для них
        if (this.magic < cost) return `${this.name} fails to conjure "${spell}".`;
        this.magic -= cost;
        const tag = dark ? ' (dark arts affinity)' : '';
        const tgt = target ? ` at ${target.name}` : '';
        return `${this.name} casts "${spell}"${tgt}${tag} (magic=${this.magic}).`;
    }
}

// Домовий ельф: безпалична магія, інша економіка енергії
export class HouseElf extends MagicalEntity implements ISpellCaster {
    public kind(): string {
        return 'House Elf';
    }

    public cast(spell: string, target?: IBeing): string {
        const cost = 5; // ельфи ефективні
        if (this.magic < cost) return `${this.name} is too weak to cast "${spell}".`;
        this.magic -= cost;
        const tgt = target ? ` at ${target.name}` : '';
        return `${this.name} clicks fingers: "${spell}"${tgt} (magic=${this.magic}).`;
    }

    public getMagic(): number {
        return this.magic;
    }
}

// Гіпогриф — літає, але не кастить
export class Hippogriff extends MagicalEntity implements IFlyer {
    private altitude = 0;

    public kind(): string {
        return 'Hippogriff';
    }

    public fly(distance: number): void {
        if (distance <= 0) return;
        this.altitude = Math.min(3000, this.altitude + distance * 10);
        this.magic = Math.max(0, this.magic - Math.ceil(distance / 5));
        console.log(`${this.name} flies ${distance} km (alt=${this.altitude} m, magic=${this.magic}).`);
    }

    public getAltitude(): number {
        return this.altitude;
    }
}

// Зіллєваріння як окремий контракт (ISP)
export class PotionMaster extends Wizard implements IPotionBrewer {
    public kind(): string {
        return 'Potion Master';
    }

    public brew(potion: string): string {
        this.magic = Math.max(0, this.magic - 12);
        return `${this.name} brews a ${potion} (magic=${this.magic}).`;
    }
}
