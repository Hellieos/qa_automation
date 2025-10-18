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