import {ref} from "vue";
import store from "../store";

export default function filterModule(value) {

    const filter = ref('all')
    const filterOptions = [
        { value: 'all', name: 'All'},
        { value: 'active', name: 'Active'},
        { value: 'done', name: 'Done'},
        { value: 'canceled', name: 'Canceled'},
        { value: 'asc', name: 'Oldest created'},
        { value: 'desc', name: 'Last created'},
    ]
    const filterBy = async (value) => {
        let filter = ''
        if(value === 'asc' || value === 'desc'){
            filter = value
        }else {
            filter = value
        }
        await store.commit('setSort', filter )

        await store.dispatch('getTasks')
    }

    return {
        filter,
        filterOptions,
        filterBy,
    }
}
