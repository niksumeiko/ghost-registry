import { expect, test } from '../../../playwright/test.ts';
import { BASE_URL } from '../../api/baseUrl.ts';
import { TestProviders } from '../../Navigation/__tests__/TestProviders.tsx';
import { EditGhostPage } from '../EditGhostPage.tsx';

test('display ghost in edit mode', async ({ mount, page }) => {
    await page.route(`${BASE_URL}/api/v1/ghost/h7A`, (route) => {
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
            <EditGhostPage />
        </TestProviders>,
        '/ghost/h7A/edit',
    );

    await expect(page).toHaveURL('ghost/h7A/edit');
    await expect(component.getByTestId('stripe')).toBeVisible();
    await expect(component.getByTestId('name-field')).toContainText('Leomoun');

});