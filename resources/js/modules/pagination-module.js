import store from "../store";
import {computed} from "vue";
import {useRouter} from 'vue-router'

export default function paginationModule() {
    const router = useRouter()
    function active(status) {
        return status? 'dark:bg-gray-500 dark:text-white pointer-events-none' : 'dark:bg-gray-800'
    }
    function disabled(isCurrentPage) {
        return isCurrentPage? 'dark:hover:none dark:bg-gray-900 pointer-events-none': ''
    }
    const setPage =  async (page) => {
        await store.commit('setPage', page)
        await store.dispatch('getTasks')
        if (Number(page) === 1) {
            await router.replace('/')
        }else {
            await router.replace(`/?page=${page}`)
        }
    }
    return {
        pagination: computed(() => store.getters['getPagination']),
        active, disabled, setPage,
    }
}
