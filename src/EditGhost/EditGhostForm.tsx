import {FC, useEffect, useMemo} from 'react';
import {ButtonGroup, Checkbox, FormError, FormField, PrimaryButton, TextInput,} from '@design-system';
import {GhostFormData} from './schema.ts';
import {useUpdateGhost} from './useUpdateGhost.ts';
import {useNavigate} from 'react-router-dom';

import {Ghost} from '../api/types.ts';
import {getPatchFlags} from "./getPatchFlags.ts";
import {useGhostEditForm} from "./useGhostEditForm.ts";
import {isCaught} from "../flagService.ts";

interface Props {
    ghost: Ghost;
}

export const EditGhostForm: FC<Props> = ({ghost}) => {
    const {id, name, flags} = ghost;
    const isGhostCaught = useMemo(() => isCaught(flags), [flags]);
    const {update, error: saveError} = useUpdateGhost(id);
    const {reset, register, handleSubmit, formState: {errors}} = useGhostEditForm({name, isCaught: isGhostCaught})

    const navigate = useNavigate();
    const returnToNextTarget = () => {
        navigate('/next-target');

    };

    useEffect(() => {
        reset({name, isCaught: isGhostCaught});
    }, [name, isGhostCaught, reset]);

    const onSubmit = (data: GhostFormData) => {
        update({
            name: data.name,
            flags: getPatchFlags(flags, data.isCaught),
        }).then(returnToNextTarget);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField testId="name-field" label="Ghost name">
                <TextInput {...register('name')} placeholder="Name"/>
            </FormField>
            <Checkbox
                {...register('isCaught')}
                label="Secured in the registry"
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <ButtonGroup>
                {saveError && (
                    <FormError>
                        Failed to save the ghost record. Try again.
                    </FormError>
                )}
                <PrimaryButton type="submit">Save</PrimaryButton>
            </ButtonGroup>
        </form>
    );
};