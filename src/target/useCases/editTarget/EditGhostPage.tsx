import {
    ButtonGroup,
    Checkbox,
    ContentLayout,
    FormError,
    FormField,
    HeadingTitle,
    Layout,
    Logo,
    PrimaryButton,
    Stripe,
    TextInput,
} from '@design-system';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchGhostById } from '../../domain/GhostAdapter.ts';

export const EditGhostPage = () => {
    const { id } = useParams() as { id: string };
    const query = useQuery({
        queryKey: ['ghost', id],
        queryFn: () => fetchGhostById(id),
    });
    // state: 'LOADING' | 'ERROR' | 'DENIED' | 'INITIAL' | 'SUBMITTING';
    // name: string;
    // isCaught: boolean;
    // error?: string;
    //
    // Input: GET query, PATCH mutation

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
                        <PrimaryButton type="submit">Save</PrimaryButton>
                    </ButtonGroup>
                </form>
            </ContentLayout>
        </Layout>
    );
};
