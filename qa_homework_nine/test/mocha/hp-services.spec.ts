import type { SinonSpy, SinonStub } from 'sinon';
import { expect, use } from 'chai';
import { faker } from '@faker-js/faker';
import { stubConstructor, stubObject } from 'ts-sinon';
import * as sinon from 'ts-sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { duel, patrolOnBroom, brewLesson } from '../../src/services';
import { Auror, HouseElf, Wizard } from '../../src/entities';
import type { ISpellCaster, IFlyer, IPotionBrewer, IBeing } from '../../src/interfaces';

describe('harry-potter services (mocha + ts-sinon)', () => {
    let consoleSpy: SinonSpy;

    beforeEach(() => {
        consoleSpy = sinon.default.stub(console, 'log') as unknown as SinonSpy;
    });

    afterEach(() => {
        sinon.default.restore();
    });

    it('1) duel(): header logs "Duel: A vs B"', () => {
        const a = stubObject<ISpellCaster>({
            name: 'Harry',
            cast: () => 'A_cast',
            getMagic: () => 100
        });
        const b = stubObject<ISpellCaster>({
            name: 'Bellatrix',
            cast: () => 'B_cast',
            getMagic: () => 100
        });

        duel(a, b, 'Expelliarmus', 'Crucio');

        const calls: unknown[][] = (consoleSpy as unknown as SinonStub).args ?? [];
        const flat = calls.flat().map(String).join(' ');
        expect(flat).to.match(/Duel:\s*Harry\s*vs\s*Bellatrix/i);
    });

    it('2) duel(): passes the other caster as target and logs results (behavioral)', () => {
        const a = stubObject<ISpellCaster>({
            name: faker.person.firstName(),
            cast: sinon.default.stub().returns('A done'),
            getMagic: () => 100
        });
        const b = stubObject<ISpellCaster>({
            name: faker.person.firstName(),
            cast: sinon.default.stub().returns('B done'),
            getMagic: () => 100
        });

        duel(a, b, 's1', 's2');

        expect((a.cast as unknown as SinonStub)).to.have.been.calledWith('s1', b as IBeing);
        expect((b.cast as unknown as SinonStub)).to.have.been.calledWith('s2', a as IBeing);

        const callCount = (consoleSpy as unknown as SinonStub).callCount;
        expect(callCount).to.be.at.least(3);
    });

    it('3) patrolOnBroom(): calls fly(km) and logs altitude (behavioral)', () => {
        const flyer = stubObject<IFlyer>({
            name: 'Buckbeak',
            fly: sinon.default.stub(),
            getAltitude: sinon.default.stub().returns(420)
        });

        patrolOnBroom(flyer, 12);

        expect((flyer.fly as unknown as SinonStub)).to.have.been.calledWith(12);
        expect((flyer.getAltitude as unknown as SinonStub)).to.have.been.called;

        const callCount = (consoleSpy as unknown as SinonStub).callCount;
        expect(callCount).to.be.at.least(2);
    });

    it('4) brewLesson(): calls brewer.brew(potion) and logs returned value (behavioral)', () => {
        const brewer = stubObject<IPotionBrewer>({
            name: 'Severus Snape',
            brew: sinon.default.stub().returns('Mock potion brewed')
        });

        brewLesson(brewer, 'Draught of Living Death');

        expect((brewer.brew as unknown as SinonStub))
            .to.have.been.calledWith('Draught of Living Death');

        const callCount = (consoleSpy as unknown as SinonStub).callCount;
        expect(callCount).to.be.at.least(2);
    });

    it('5) duel(): spy on real class method (як у прикладі зі spy на update())', () => {
        const auror = new Auror('Kingsley');
        const castSpy = sinon.default.spy(auror, 'cast');

        const stubElf = stubConstructor(HouseElf, 'Dobby') as unknown as HouseElf;
        (stubElf.cast as unknown as SinonStub) = sinon.default.stub().returns('Dobby mock-cast');

        duel(auror, stubElf as unknown as ISpellCaster, 'Stupefy', 'Apparition');

        expect(castSpy.calledWith('Stupefy', stubElf as IBeing)).to.be.true;
        expect((stubElf.cast as unknown as SinonStub).calledWith('Apparition', auror)).to.be.true;

        expect((consoleSpy as unknown as SinonStub).callCount).to.be.at.least(3);
    });

    it('6) stubConstructor(Wizard): конструктор застабований', () => {
        const harryStub = stubConstructor(Wizard, 'Harry') as unknown as Wizard;
        (harryStub.cast as unknown as SinonStub) = sinon.default.stub().returns('Harry mock-cast');

        const other = stubObject<ISpellCaster>({
            name: 'Bellatrix',
            cast: () => 'ok',
            getMagic: () => 100
        });

        duel(harryStub as unknown as ISpellCaster, other, 'Expelliarmus', 'Crucio');

        expect((harryStub.cast as unknown as SinonStub))
            .to.have.been.calledWith('Expelliarmus', other as IBeing);

        expect((consoleSpy as unknown as SinonStub).callCount).to.be.at.least(3);
    });
});
