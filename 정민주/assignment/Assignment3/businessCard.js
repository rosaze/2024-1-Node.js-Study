function checkInputs(name, business, position){
    console.log(name, business, position)
    if (name&&business&&position){
        return true
    }
    return false
}

async function getPeople(){
    try{
        const res = await axios.get('/people')
        const people = res.data
        const cards = document.getElementById('businessCards')
        cards.innerHTML = ''
        console.log(people)
        Object.keys(people).map((keyName, i) =>{
            console.log(keyName)
            console.log(people[keyName])
            cards.insertAdjacentHTML('beforeend',`
                <div class="card">
                    <p class="nameRes">${keyName}</p>
                    <p class="businessRes">${people[keyName].business}</p>
                    <p class="positionRes">${people[keyName].position}</p>
                    <p class="buttonRes" id="${i}">X</p>
                </div>
            `)
            document.getElementById(i).addEventListener('click', async () => { // 삭제 버튼 클릭
                console.log(keyName)
                try {
                  await axios.delete('/peoples/' + keyName);
                  getPeople();
                } catch (err) {
                  console.error(err);
                }
              })
        })

    } catch(err){
        console.error(err)
    }
    
}

window.onload = getPeople

document.getElementById('form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const business = e.target.business.value
    const position = e.target.position.value
    const check = checkInputs(name, business, position)
    if (!check){
        return alert("다 작성해주세요")
    }
    try{
        axios.post('/peoples', {name, business, position})
        getPeople()
    } catch(err){
        console.error(err);
    }
    e.target.name.value = ''
    e.target.business.value = ''
    e.target.position.value = ''
})
