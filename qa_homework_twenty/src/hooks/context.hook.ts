import { Before, After } from '@cucumber/cucumber';
import type { BrowserContextOptions } from 'playwright';
import { getBrowser } from './browser.hook';
import type { HomeworkWorld } from '../worlds/homework.world';

export function contextHook(): void {
    Before(async function (this: HomeworkWorld, { pickle }) {
        const featureName = (pickle?.uri ?? 'feature').replace('.feature', '');
        const scenarioName = pickle.name.replace(/[\\/]/g, '-');

        const options: BrowserContextOptions = {
            viewport: { width: 1280, height: 720 },
            recordVideo: { dir: `test-results/videos/${featureName}/${scenarioName}` }
        };

        this.browser = getBrowser();
        this.context = await this.browser.newContext(options);
    });

    After(async function (this: HomeworkWorld) {
        await this.context.close();
    });
}
