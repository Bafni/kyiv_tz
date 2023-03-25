import {computed, ref} from "vue";
import store from "../store";

export default function selectModule() {
    const sortBy = ref('latest')
    const tasks = computed(() => store.getters['getTasks'])
    const sortOptions = [
        {value: 'latest', name: 'Recently Added'},
        {value: 'longAgo', name: 'Added long time ago'},
        {value: 'deadline_hot', name: 'Hot Deadline Date'},
        {value: 'deadlineComing', name: 'Upcoming Deadline Date'},
    ]
    const getSortBy = (value) => {
        if (value === 'latest') {
            tasks.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
        if (value === 'longAgo') {
            tasks.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            tasks.value.reverse()
        }
        if (value === 'deadline_hot') {
            tasks.value.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
            tasks.value.reverse()
        }
        if (value === 'deadline_coming') {
            tasks.value.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
        }
    }

    return {
        sortOptions, sortBy, getSortBy

    }
}
