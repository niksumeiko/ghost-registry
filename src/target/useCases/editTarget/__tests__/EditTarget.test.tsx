import { expect, test } from '../../../../../playwright/test';
import { App } from '../../../../App.tsx';

test('edit next target', async ({ mount, page }) => {
    await page.route('**/api/v1/target', (route) =>
        route.fulfill({
            json: {
                id: 'GHOST_ID',
                name: 'Casper',
                classification: 'X',
                firstSeen: '2026-06-10',
                flags: ['editable'],
            },
        }),
    );
    await page.route('**/api/v1/ghost/GHOST_ID', (route) =>
        route.fulfill({
            json: {
                id: 'GHOST_ID',
                name: 'Casper',
                classification: 'X',
                firstSeen: '2026-06-10',
                flags: ['editable'],
            },
        }),
    );

    await mount(<App />, '/');
    await page.getByRole('link', { name: 'Next Target' }).click();

    await expect(page.getByText('Casper')).toBeVisible();

    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Ghost name').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(
        page
            .getByRole('alert')
            .filter({ hasText: 'Ghost name can have only letters' }),
    ).toBeVisible();

    await page.getByLabel('Ghost name').clear();
    await page.getByLabel('Ghost name').fill('Joy');
    await page.getByLabel('Secured in the registry').check();

    const requestSpy = page.waitForResponse(
        (res) => res.request().method() === 'PATCH',
    );

    await page.getByRole('button', { name: 'Save' }).click();

    await requestSpy;
    await expect(page).toHaveURL('/next-target');
});
