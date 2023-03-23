<template>
    <the-add-form
        v-model:title="title"
        @actionModal="actionAdd"
    />
    <the-select/>

    <the-list
        :tasks="tasks"
        @editTask="editTask"
        @deleteTask="deleteTask"
    />
    <teleport to="body">
        <the-modal
            v-model:status="status"
            v-model:title="title"
            v-model:deadline="deadline"
            @onSubmit="onSubmit"
            :btnName="btnName"
            @title-blur="titleBlur"
            :title-e="titleE"
            :deadline-e="deadlineE"
            @deadline-blur="deadlineBlur"
        />
    </teleport>

</template>

<script>
import TheAddForm from "../components/TheAddForm.vue";
import TheSelect from "../components/TheSelect.vue";
import TheList from "../components/TheList.vue";
import TheModal from "../components/TheModal.vue";
import TheLoader from "../components/TheLoader.vue";
import {ref, computed, onMounted} from "vue";
import {useField, useForm} from 'vee-validate'
import store from "../store";
import * as yup from "yup";


export default {
    name: "Main",
    components: {
        TheLoader,
        TheAddForm, TheSelect, TheList, TheModal
    },
    setup() {
        const {handleSubmit, resetField} = useForm()

        const {value: title, errorMessage: titleE, handleBlur: titleBlur} = useField('title',
            yup.string().trim().required()
        )
        const {value: deadline, errorMessage: deadlineE, handleBlur: deadlineBlur} = useField('deadline',
            yup.date().required(),
        )
        const {value: id} = useField('id')

        const {value: status} = useField('status')

        const btnName = ref('')

        const eventType = ref('')

        const actionAdd = () => {
            btnName.value = 'Create Task'
            eventType.value = 'createTask'
            store.commit('openModal')
        }
        const editTask = task => {
            btnName.value = 'Edit Task'
            eventType.value = 'editTask'
            id.value = task.id
            title.value = task.title
            deadline.value = task.deadline
            status.value = task.status
            store.commit('setIsEdit', true)
            store.commit('openModal')
        }
        const deleteTask = task => {
            store.dispatch('deleteTask', task.id)
        }
        const onSubmit = handleSubmit(async values => {

            await store.dispatch(`${eventType.value}`, values)
            const e = await store.getters['getValidateE']
            if (!e) {
                resetField('title')
                resetField('deadline')
            }
        })
        onMounted(async () => {
            await store.dispatch('getTasks')

        })
        return {
            deleteTask,
            editTask,
            onSubmit,
            btnName,
            actionAdd,
            status,
            title, titleE, titleBlur,
            deadline, deadlineE, deadlineBlur,
            tasks: computed(() => store.getters['getTasks'])
        }
    }
}
</script>

<style scoped>

</style>
