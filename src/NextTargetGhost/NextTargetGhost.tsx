import {Loading} from '../design-system/Loading.tsx';
import {Error} from '../design-system/Error.tsx';
import {useNextTargetGhost} from './useNextTargetGhost.ts';
import {
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
import {useNavigate} from "react-router-dom";
import {isCaught, isEditable} from "../flagService.ts";

export const NextTargetGhost = () => {
    const {isLoading, error, target} = useNextTargetGhost();
    const navigate = useNavigate()


    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <Error/>;
    }

    const {id, classification, firstSeen, flags, name} = target;
    const editGhost = () => {
        navigate(`/ghost/${id}/edit`);
    };

    return (
        <Layout>
            <Stripe >
                <Logo variant="xl" />
            </Stripe>
            <ContentLayout>
                <FormField label="Ghost name">
                    <HeadingTitle
                        level={1}
                        testId="name"
                        icon={isCaught(flags) && <CheckIcon />}
                        indent
                    >
                        {name}
                    </HeadingTitle>
                </FormField>
                <List>
                    <ListItem label="ID" value={id} testId="id"/>
                    <ListItem label="Classification" value={classification} testId="classification"/>
                    <ListItem label="First seen" value={firstSeen} testId="timestamp"/>
                </List>
                {isEditable(flags) && (
                    <SecondaryButton testId="edit-action" onClick={editGhost}>Edit</SecondaryButton>
                )}
            </ContentLayout>
        </Layout>
    );
};
