import { expect } from 'chai';
import { HogwartsHouse } from '../../src/interfaces';
import { Wizard, Auror, DeathEater, HouseElf, Hippogriff } from '../../src/entities';
import { describe, it } from 'node:test';

describe('MagicalEntity / class methods (Mocha + Chai)', () => {
    it('Wizard.cast() should reduce magic by 10 and include spell/target in the message', () => {
        const harry = new Wizard('Harry Potter', HogwartsHouse.Gryffindor);
        const msg = harry.cast('Expelliarmus');

        expect(msg).to.contain('Harry Potter');
        expect(msg).to.contain('Expelliarmus');
        expect(harry.getMagic()).to.equal(90);
    });

    it('Auror.cast() uses discounted cost for combat spells', () => {
        const auror = new Auror('Kingsley Shacklebolt');
        const before = auror.getMagic();
        const msg = auror.cast('Stupefy');

        expect(msg).to.contain('(auror boost)');
        expect(auror.getMagic()).to.equal(before - 8);
    });

    it('DeathEater.cast() uses cheaper cost for dark arts', () => {
        const de = new DeathEater('Bellatrix Lestrange');
        const before = de.getMagic();
        const msg = de.cast('Crucio');

        expect(msg).to.contain('(dark arts affinity)');
        expect(de.getMagic()).to.equal(before - 6);
    });

    it('HouseElf.cast() is efficient (cost 5)', () => {
        const dobby = new HouseElf('Dobby');
        const before = dobby.getMagic();
        const msg = dobby.cast('Apparition');

        expect(msg).to.contain('Dobby');
        expect(dobby.getMagic()).to.equal(before - 5);
    });

    it('Hippogriff.fly() increases altitude and allows consecutive flights', () => {
        const buckbeak = new Hippogriff('Buckbeak');

        const alt0 = buckbeak.getAltitude();
        buckbeak.fly(10); // +100 m
        const alt1 = buckbeak.getAltitude();
        expect(alt1).to.be.greaterThan(alt0);

        buckbeak.fly(5);  // further increase
        const alt2 = buckbeak.getAltitude();
        expect(alt2).to.be.greaterThan(alt1);
    });
});
