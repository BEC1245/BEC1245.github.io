function getSelected() { // 현제 선택된 아이탬
    return localStorage.getItem('selected')
}

function findIdx(str, char, count) { // 위치
    let index = -1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count--;
            if (count === 0) {
                index = i;
                break;
            }
        }
    }
    return index;
}

function writeNode() {
    let selected = getSelected()
    let length = localStorage.length - 1;
    const date = new Date()

    if(length === 0) {
        localStorage.setItem('0', `title:공백 writer:공백 date:${date.toLocaleDateString().replace(/ /g,"")}`)
        length = 1;
    }

    console.log(selected)
    if(localStorage.getItem(selected) == null) {
        localStorage.setItem('selected', '0')
    }

    // 절때 title: 위치 바꾸지 말 것 오류남
    for(n = 0; n < length; ++n){
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

function elements() {
    let inputIds = []
    inputIds.push(document.getElementById('title'))
    inputIds.push(document.getElementById('writer'))
    inputIds.push(document.getElementById('date'))

    // content는 content1, content2 이런식으로 공백을 만들어 저장 
    let inputContents = document.getElementsByClassName('content')

    return { inputIds, inputContents };
}

function load(key) { // 이거 다시 만들어야 함
    const ele = elements();
    let value = localStorage.getItem(key)

    let idx = 1
    for(const a of ele.inputIds) {
        if(ele.inputIds.length === idx) {
            console.log(value.slice(findIdx(value, ':', idx), value.indexOf('content0') - 1))
            continue
        }
        console.log(value.slice(findIdx(value, ':', idx), value.indexOf(ele.inputIds[idx].id) - 1))
        idx++
    }

    for(const b of ele.inputContents) {
        if(ele.inputContents.length + ele.inputIds.length === idx) {
            console.log(value.slice(findIdx(value, ':', idx)))
            continue
        }
        console.log(value.slice(findIdx(value, ':', idx), value.indexOf(ele.inputContents[idx - ele.inputIds.length].className + (idx - 1)) - 1))
        idx++
    }

}

function save() {
    const selected = getSelected();
    const ele = elements();
    let setString = '';

    console.log(ele.inputIds);
    for(const a of ele.inputIds) {
        console.log(`${a.id}:${a.value}`)
        setString += `${a.id}:${a.value} `
    }

    let idx = 0
    for(const b of ele.inputContents) {
        setString += `${b.className}${idx++}:${b.value} `
    }

    // load 기능을 넣어야 한다.
    localStorage.setItem(selected, setString) // 아이탬 삭제시 이건 다른걸로 옴겨야 한다.
}

function reset() {
    localStorage.clear()
}

