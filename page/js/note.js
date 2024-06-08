function writeNode() {
    let length = localStorage.length;
    const date = new Date()

    if(length === 0) {
        localStorage.setItem('0', `title:공백 writer:공백 date:${date.toLocaleDateString().replace(/ /g,"")}`)
        length = 1;
    }

    // 절때 title: 위치 바꾸지 말 것 오류남
    for(n = 0; n < length; n++){
        const contents = localStorage.getItem(n);
        const title = contents.slice(6, contents.indexOf('writer') - 1);
        const obj = document.querySelector('.ui')
        const child = document.createElement('div');
        child.className = 'main-node';
        child.innerText = title
        obj.appendChild(child)
    }
}

writeNode()

// content는 content1, content2 이런식으로 공백을 만들어 저장 
// function save() {
//     const names = ['sub-input', 'content']
//     let docs = []
    
//     for(const a of names) {
//         const items = document.getElementsByClassName(a)
//         docs.push(items)

//         for(const b of items) {
//             localStorage.setItem(b.className, b.value)
//         }
//     }

//     console.log(docs);
// }

// function reset() {
//     localStorage.clear()
// }

