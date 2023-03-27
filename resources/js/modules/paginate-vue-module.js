import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import store from "../store";

export default function paginateModule() {
    const page = ref(1)
    const pageRange = ref(5)
    const margiPage = ref(5)
    const tasks = computed(()=>store.getters['getTasks'])

    const pageCount = computed(() => Math.ceil(tasks.value.length / pageRange.value))

    const router = useRouter()

    const request = (items) => {
        if (page.value !== 1) {
            return items.slice((pageRange.value * page.value) - pageRange.value, (pageRange.value * page.value))
        }
        return items.slice(0, 5)
    }

    const clickCallback = num => {
        page.value = num
        router.replace(`/?page=${num}`)
        if (num === 1) {
            router.replace('/')
        }
    }
    return {
        page, pageRange, pageCount, margiPage, clickCallback,
        request,
    }
}
