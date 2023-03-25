export default function statusTypeUtility(type) {
        const status = {
            active : ['dark:bg-green-600', 'active'],
            done: ['dark:bg-yellow-600', 'done'],
            canceled:  ['dark:bg-red-600', 'canceled']
        }
        return status[type]
}
