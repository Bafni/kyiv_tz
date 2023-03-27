import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import store from "../store";

export default function validateModule(eventType) {
    const {values, errors, handleSubmit, resetForm} = useForm( )

    const { value: title} = useField('title',
        yup.string().trim().required()
    )
    const {value: deadline} = useField('deadline',
        yup.date().required(),
    )
    const {value: id} = useField('id')
    const {value: status} = useField('status')
    const onSubmit = handleSubmit(async values => {
        await store.dispatch(`${eventType.value}`, values)
        const e = await store.getters['getValidateE']
        if (!e) {
            resetForm()
        }
    })
    return {
        values, errors, handleSubmit, onSubmit
    }
}
