function getSelected() { // 현제 선택된 아이탬
    return localStorage.getItem('selected')
}

function findIdx(str, count) { // 위치
    let counts = [count, count]
    let idx = [-1, -1]

    for(let i = 0; i < str.length; i++) {
        counts[0] -= str[i] === '[' ? 1 : 0;
        counts[1] -= str[i] === ']' ? 1 : 0;

        if(counts[0] === 0) {
            idx[0] = i;
            counts[0] = -1
        }
        if (counts[1] == 0) {
            idx[1] = i;
            break;
        }
    }

    return str.slice(idx[0] + 1, idx[1]);
}

function writeNode() { // node 초기화시 발동
    const { inputContents } = elements()
    let selected = getSelected()
    let length = 0;
    const date = new Date()

    for(n = 0; n < inputContents.length; n++) {
        if(localStorage.getItem(n) !== null) {
            length++
        }
    }

    console.log(length);
    if(length === 0) {
        let setString = '';
        let idx = 0;
        for(const b of inputContents) {
            setString += `${b.className}${idx++}:[] `
        }

        localStorage.setItem('0', `title:[공백] writer:[공백] date:[${date.toLocaleDateString().replace(/ /g,"")}] ${setString}`)
        length = 1;
    }

    if(localStorage.getItem(selected) == null) {
        localStorage.setItem('selected', '0')
    }

    const obj = document.querySelector('.ui')
    obj.innerHTML = '';

    // 절때 title: 위치 바꾸지 말 것 오류남
    for(n = 0; n < length; ++n){
        const contents = localStorage.getItem(n);

        console.log(contents);
        const title = findIdx(contents, 1);
        const child = document.createElement('div');
        child.setAttribute('data', n)
        child.setAttribute('onclick', `nodeClick(${n})`)
        child.className = 'main-node';
        child.innerText = title
        obj.appendChild(child)
    }
}

writeNode()

function elements() { // id input과 content input을 배열로 전달
    let inputIds = []
    inputIds.push(document.getElementById('title'))
    inputIds.push(document.getElementById('writer'))
    inputIds.push(document.getElementById('date'))

    // content는 content1, content2 이런식으로 공백을 만들어 저장 
    let inputContents = document.getElementsByClassName('content')

    return { inputIds, inputContents };
}

function nodeClick(key) {
    localStorage.setItem('selected', key)
    load(key)
}

function load(key) { 
    console.log(key);
    const ele = elements();
    let value = localStorage.getItem(key)

    let idx = 1
    for(const a of ele.inputIds) {
        a.value = findIdx(value, idx)
        idx++
    }

    for(const b of ele.inputContents) {
        b.value = findIdx(value, idx)
        idx++
    }
}

function save() {
    const selected = getSelected();
    const ele = elements();
    let setString = '';

    console.log(ele.inputIds);
    for(const a of ele.inputIds) {
        setString += `${a.id}:[${a.value}] `
    }

    let idx = 0
    for(const b of ele.inputContents) {
        setString += `${b.className}${idx++}:[${b.value}] `
    }

    localStorage.setItem(selected, setString)
    load(selected)
}

function reset() {
    const selected = getSelected();
    const ele = elements();
    let setString = '';

    console.log(ele.inputIds);
    for(const a of ele.inputIds) {
        setString += `${a.id}:[${a.value}] `
    }

    let idx = 0
    for(const b of ele.inputContents) {
        setString += `${b.className}${idx++}:[] `
    }

    localStorage.setItem(selected, setString) // 아이탬 삭제시 이건 다른걸로 옴겨야 한다.
    load(selected)
}

function nodeAdd() {
    let length = 0;
    while (true) {
        if(localStorage.getItem(length) === null) {
            break;
        }
        length++
    }

    const { inputContents } = elements()
    let setString = ''
    let idx = 0
    const date = new Date()
    for(const b of inputContents) {
        setString += `${b.className}${idx++}:[] `
    }

    localStorage.setItem(length, `title:[공백] writer:[공백] date:[${date.toLocaleDateString().replace(/ /g,"")}] ${setString}`)
    writeNode()
    load(length)
}

