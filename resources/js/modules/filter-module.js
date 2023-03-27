import {ref} from "vue";
import store from "../store";

export default function filterModule() {

    const filter = ref('all')
    const filterOptions = [
        { value: 'all', name: 'All'},
        { value: 'active', name: 'Active'},
        { value: 'done', name: 'Done'},
        { value: 'canceled', name: 'Canceled'},

    ]
    const filterBy = async (value) => {

        await store.commit('setSort', value )

        await store.dispatch('getTasks')
    }

    return {
        filter,
        filterOptions,
        filterBy,
    }
}
