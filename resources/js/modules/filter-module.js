import {ref} from "vue";
import store from "../store";

export default function filterModule(value) {

    const filter = ref('all')
    const filterOptions = [
        { value: 'all', name: 'All'},
        { value: 'active', name: 'Active'},
        { value: 'done', name: 'Done'},
        { value: 'canceled', name: 'Canceled'},
    ]
    const filterBy = async (value) => {
        console.log(value)
        await  store.dispatch('getTasksFilter',value )
    }

    return {
        filter,
        filterOptions,
        filterBy,
    }
}
