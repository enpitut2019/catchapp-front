console.log('hoge')
console.log('cool!')

const dom = document.createElement('div');
dom.textContent = 'GOOD!';

window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(dom);
})
