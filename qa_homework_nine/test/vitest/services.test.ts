import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { duel, patrolOnBroom, brewLesson } from '../../src/services';
import type { ISpellCaster, IFlyer, IPotionBrewer, IBeing } from '../../src/interfaces';

describe('services.ts functions (Vitest)', () => {
    let logSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => { /* empty */ });
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    it('duel() calls cast on both casters with provided spells', () => {
        const a: ISpellCaster = {
            name: 'Harry',
            getMagic: () => 100,
            cast: vi.fn().mockReturnValue('cast A')
        };
        const b: ISpellCaster = {
            name: 'Bellatrix',
            getMagic: () => 100,
            cast: vi.fn().mockReturnValue('cast B')
        };

        duel(a, b, 'Expelliarmus', 'Crucio');

        expect(a.cast).toHaveBeenCalledWith('Expelliarmus', b as IBeing);
        expect(b.cast).toHaveBeenCalledWith('Crucio', a as IBeing);
        expect(logSpy).toHaveBeenCalled(); // banner/log lines
    });

    it('patrolOnBroom() triggers fly() and logs altitude', () => {
        const flyer: IFlyer = {
            name: 'Buckbeak',
            fly: vi.fn(),
            getAltitude: vi.fn().mockReturnValue(250)
        };

        patrolOnBroom(flyer, 12);

        expect(flyer.fly).toHaveBeenCalledWith(12);
        expect(flyer.getAltitude).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalled();
    });

    it('brewLesson() calls brew() on the brewer', () => {
        const brewer: IPotionBrewer = {
            name: 'Severus Snape',
            brew: vi.fn().mockReturnValue('brewed')
        };

        brewLesson(brewer, 'Draught of Living Death');

        expect(brewer.brew).toHaveBeenCalledWith('Draught of Living Death');
        expect(logSpy).toHaveBeenCalled();
    });
});
