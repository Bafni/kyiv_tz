import store from "../store";

export default function actionsModule(btnName, eventType, validate) {
    const actionAdd = () => {
        btnName.value = 'Create Task'
        eventType.value = 'createTask'
        store.commit('openModal')
    }
    const editTask = task => {
        btnName.value = 'Edit Task'
        eventType.value = 'editTask'
        validate.id.value = task.id
        validate.title.value = task.title
        validate.deadline.value = task.deadline
        validate.status.value = task.status
        store.commit('setIsEdit', true)
        store.commit('openModal')
    }
    const deleteTask = async task => {
       await store.dispatch('deleteTask', task.id)
    }
    return {
        actionAdd, editTask, deleteTask
    }
}
