document.addEventListener("DOMContentLoaded", function () { 
    const layout = document.querySelector('.layout')
    const button = document.querySelector('.layout-button')

    button.addEventListener('click', () => {
        const isNone = layout.classList.contains('none');
        if(isNone) {
            layout.classList.remove('none')
            return
        }
        layout.classList.add('none')
    })
})