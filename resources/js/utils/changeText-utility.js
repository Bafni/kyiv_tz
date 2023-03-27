export default function changeTextUtility(id) {
    const el = document.querySelector(`div[id="${id}"]`)
    let aClass = el.getAttribute('class')
    let attrs = aClass.split(' ')
    if(attrs.includes('line-through')){
        attrs =  attrs.filter(e => e !== 'line-through')
    }else {
        attrs.push('line-through')
    }
    el.setAttribute('class', attrs.join(' ') )
}
