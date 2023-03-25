export default function deadlineTypeUtility(time) {
    time = time + ' 18:00:00'
    const now = new Date();
    const deadline = new Date(time)
    const diff = deadline.getTime() - now.getTime()
    if(diff <= 86400000 && diff >= 0) {
        return {
            border: 'border-rose-500',
            text: 'text-rose-500'
        }
    } else if(diff >= 86400001 && diff < (86400000 * 2) ){
        return {
            border: 'border-yellow-500',
            text: 'text-yellow-500'
        }
    }else if(diff > 86400001 * 2 ) {
        return {
            border: 'border-green-500',
            text: 'text-green-500'
        }
    }else {
        return {
            border: 'border-gray-500',
            text: 'text-gray-500'
        }
    }

}
