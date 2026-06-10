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
    SecondaryButton,
    Stripe,
} from '@design-system';

export const TargetPage = () => {
    return (
        <Layout>
            <Stripe>
                <Logo variant="xl" />
            </Stripe>
            <ContentLayout>
                <FormField label="Ghost name">
                    <HeadingTitle level={1} icon={<CheckIcon />} indent>
                        Slimer
                    </HeadingTitle>
                </FormField>
                <List>
                    <ListItem label="ID" value="#F6J" />
                    <ListItem label="Classification" value="Class II" />
                    <ListItem label="First seen" value="2026-05-29" />
                </List>
                <ButtonGroup>
                    <SecondaryButton>Edit</SecondaryButton>
                </ButtonGroup>
            </ContentLayout>
        </Layout>
    );
};
