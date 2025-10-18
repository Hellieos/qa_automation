import { fetchPokemon } from './api';
import { PokemonSummary } from './models';
import { PokemonEntity, PokemonToSummary } from './abstraction';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
    try {
    // 1) тягнему повний респонс (типізовано)
        const pikachuFull = await fetchPokemon('pikachu');

        // 2) перетворюю на коротку форму — логіка в конструкторі PokemonSummary
        const pikachuSummary = new PokemonSummary(pikachuFull);
        console.log('\n=== SUMMARY (via constructor) ===');
        console.log(pikachuSummary.prettyPrint());

        // 3) те саме, але через абстрактний Transformer (демо абстракції)
        const transformer = new PokemonToSummary();
        const dittoSummary = transformer.transform(await fetchPokemon('ditto'));

        // 4) композиція + наслідування: загортаю summary в доменну сутність
        //містить усі потрібні дані (summary) і методи, які описують поведінку покемона
        const dittoEntity = new PokemonEntity(dittoSummary);

        console.log('\n=== ENTITY INFO ===');
        console.log(dittoEntity.info());
        console.log('Has \'limber\' ability?', dittoEntity.hasAbility('limber'));
        console.log('Image:', dittoEntity.image);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Помилка виконання:', err.message);
        } else {
            console.error('Помилка виконання:', err);
        }
    }
}

main();
