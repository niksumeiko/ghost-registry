import {
    ButtonGroup,
    Checkbox,
    ContentLayout,
    FormError,
    FormField,
    HeadingTitle,
    Layout,
    Logo,
    Paragraph,
    PrimaryButton,
    Stripe,
    TextInput,
} from '@design-system';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchGhostById, updateGhostById } from '../../domain/GhostAdapter.ts';
import { Ghost } from '../../domain/GhostService.ts';
import { createEditGhostPageModel } from './EditGhostPageModelService.ts';

export const EditGhostPage = () => {
    const { id } = useParams() as { id: string };
    const query = useQuery({
        queryKey: ['ghost', id],
        queryFn: () => fetchGhostById(id),
    });
    const mutation = useMutation({
        mutationFn: ({
            id,
            ...changes
        }: Pick<Ghost, 'id' | 'name' | 'flags'>) => {
            return updateGhostById(id, changes);
        },
    });
    const model = createEditGhostPageModel(query, mutation);
    // state: 'LOADING' | 'ERROR' | 'DENIED' | 'INITIAL' | 'SUBMITTING';
    // name: string;
    // isCaught: boolean;
    // error?: string;
    //
    // Input: GET query, PATCH mutation

    if (model.state === 'LOADING') {
        return (
            <Layout>
                <Stripe>
                    <Logo variant="xl" />
                </Stripe>
                <ContentLayout>
                    <Paragraph>Loading...</Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    if (model.state === 'ERROR') {
        return (
            <Layout>
                <ContentLayout>
                    <HeadingTitle level={1}>404</HeadingTitle>
                    <Paragraph>Ghost not found.</Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    if (model.state === 'DENIED') {
        return (
            <Layout>
                <Stripe variant="secondary">
                    <Link
                        to="/"
                        className="text-sm hover:underline hover:decoration-dotted"
                    >
                        ← Back
                    </Link>
                    <Logo variant="sm" />
                </Stripe>
                <ContentLayout>
                    <HeadingTitle level={1}>Access denied</HeadingTitle>
                    <Paragraph>
                        This ghost's record is readonly. Editing is not
                        permitted.
                    </Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    return (
        <Layout>
            <Stripe variant="secondary">
                <HeadingTitle level={5}>Editing ghost</HeadingTitle>
                <Logo variant="sm" />
            </Stripe>
            <ContentLayout>
                <form>
                    <FormField label="Ghost name">
                        <TextInput name="name" defaultValue={model.name} />
                    </FormField>
                    <Checkbox
                        name="caught"
                        label="Secured in the registry"
                        defaultChecked={model.isCaught}
                    />
                    {model.error && <FormError>{model.error}</FormError>}
                    <ButtonGroup>
                        <PrimaryButton
                            type="submit"
                            disabled={model.state === 'SUBMITTING'}
                        >
                            Save
                        </PrimaryButton>
                    </ButtonGroup>
                </form>
            </ContentLayout>
        </Layout>
    );
};
