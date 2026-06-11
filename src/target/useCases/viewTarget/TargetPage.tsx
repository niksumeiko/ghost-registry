import {
    ButtonGroup,
    CheckIcon,
    ContentLayout,
    FormField,
    HeadingTitle,
    Layout,
    List,
    ListItem,
    Logo,
    Paragraph,
    SecondaryButton,
    Stripe,
} from '@design-system';
import { useQuery } from '@tanstack/react-query';
import { fetchNextTarget } from '../../domain/GhostAdapter';
import { createTargetPageModel } from './TargetPageModelService.ts';

export const TargetPage = () => {
    const query = useQuery({
        queryKey: ['next-target'],
        queryFn: fetchNextTarget,
    });
    const model = createTargetPageModel(query);

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
                <Stripe>
                    <Logo variant="xl" />
                </Stripe>
                <ContentLayout>
                    <Paragraph>
                        There is an error retrieving the next target.
                    </Paragraph>
                </ContentLayout>
            </Layout>
        );
    }

    return (
        <Layout>
            <Stripe>
                <Logo variant="xl" />
            </Stripe>
            <ContentLayout>
                <FormField label="Ghost name">
                    <HeadingTitle
                        level={1}
                        icon={model.isCaught && <CheckIcon />}
                        indent
                    >
                        {model.name}
                    </HeadingTitle>
                </FormField>
                <List>
                    <ListItem label="ID" value={model.identity} />
                    <ListItem
                        label="Classification"
                        value={model.classification}
                    />
                    <ListItem label="First seen" value={model.dateFirstSeen} />
                </List>
                {model.isEditable && (
                    <ButtonGroup>
                        <SecondaryButton>Edit</SecondaryButton>
                    </ButtonGroup>
                )}
            </ContentLayout>
        </Layout>
    );
};
