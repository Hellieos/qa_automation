# HP OOP (TypeScript)

- Abstractions: IBeing, ISpellCaster, IFlyer, IPotionBrewer
- Base class: MagicalEntity
- Concrete: Wizard, Witch, Auror, DeathEater, HouseElf, Hippogriff, PotionMaster
- Functions accept interfaces: duel(ISpellCaster,…), patrolOnBroom(IFlyer,…), brewLesson(IPotionBrewer,…)

## Run
npm i
npm run build
npm start

npm run clean (for cleaning the build)

### Run tests
> run only Mocha (class methods)
npm run test:mocha

> run only Vitest (functions)
npm run test:vitest

> run both
npm test
