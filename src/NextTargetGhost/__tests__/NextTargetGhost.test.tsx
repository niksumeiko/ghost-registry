import { expect, test } from '../../../playwright/test.ts';
import { BASE_URL } from '../../api/baseUrl.ts';
import { TestProviders } from '../../Navigation/__tests__/TestProviders.tsx';
import { NextTargetGhost } from '../NextTargetGhost.tsx';

test('display editable ghost', async ({ mount, page }) => {
    await page.route(`${BASE_URL}/api/v1/target`, (route) => {
        route.fulfill({
            json: {
                id: 'h7A',
                name: 'Leomoun',
                classification: 'Class IV',
                firstSeen: '2026-05-19',
                flags: ['editable'],
            },
        });
    });

    const component = await mount(
        <TestProviders>
            <NextTargetGhost />
        </TestProviders>,
        '/next-target',
    );

    await expect(component.getByTestId('stripe')).toBeVisible();
    await expect(component.getByTestId('name')).toBeVisible();
    await expect(component.getByTestId('id')).toBeVisible();
    await expect(component.getByTestId('classification')).toBeVisible();
    await expect(component.getByTestId('timestamp')).toBeVisible();
    await expect(component.getByTestId('edit-action')).toBeVisible();
});

test('display non-editable ghost', async ({ mount, page }) => {
    await page.route(`${BASE_URL}/api/v1/target`, (route) => {
        route.fulfill({
            json: {
                id: 'h7A',
                name: 'You-cant-touch-this',
                classification: 'Class IV',
                firstSeen: '2026-05-19',
                flags: [],
            },
        });
    });

    const component = await mount(
        <TestProviders>
            <NextTargetGhost />
        </TestProviders>,
        '/next-target',
    );

    await expect(component.getByTestId('stripe')).toBeVisible();
    await expect(component.getByTestId('name')).toBeVisible();
    await expect(component.getByTestId('id')).toBeVisible();
    await expect(component.getByTestId('classification')).toBeVisible();
    await expect(component.getByTestId('timestamp')).toBeVisible();
    await expect(component.getByTestId('edit-action')).not.toBeVisible();
});