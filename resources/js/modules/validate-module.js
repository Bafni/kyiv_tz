import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import store from "../store";


export default function validateModule(eventType) {
    const {handleSubmit, resetField} = useForm()

    const {value: title, errorMessage: titleE, handleBlur: titleBlur} = useField('title',
        yup.string().trim().required()
    )
    const {value: deadline, errorMessage: deadlineE, handleBlur: deadlineBlur} = useField('deadline',
        yup.date().required(),
    )
    const {value: id} = useField('id')

    const {value: status} = useField('status')

    const onSubmit = handleSubmit(async values => {
        await store.dispatch(`${eventType.value}`, values)
        const e = await store.getters['getValidateE']
        if (!e) {
            resetField('title')
            resetField('deadline')
        }
    })

    return {
        title, titleE, titleBlur,
        deadline, deadlineE, deadlineBlur,
        status, id, handleSubmit, resetField, onSubmit
    }
}
