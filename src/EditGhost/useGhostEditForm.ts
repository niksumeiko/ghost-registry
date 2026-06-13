import {editGhostPageSchema, GhostFormData} from "./schema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const useGhostEditForm = (defaultValues: GhostFormData): UseFormReturn<GhostFormData> => {
    return useForm<GhostFormData>({
        resolver: zodResolver(editGhostPageSchema),
        defaultValues,
    });
}