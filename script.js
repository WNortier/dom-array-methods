const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];


const getRandomUser = async () => {
    const element = document.createElement('div')
    element.classList.add('loader')
    if (!document.querySelector('.loader')) {
        main.appendChild(element)
    }
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();
    
    const user = data.results[0]
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    
    addData(newUser)
}   

getRandomUser()
getRandomUser()
getRandomUser()

const addData = (obj) => {
    data.push(obj)
    
    updateDOM();
}

const updateDOM = (providedData = data) => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach((item) => {
        const element = document.createElement('div')
        element.classList.add("person")
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
    
}

const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleMoney = () => {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })
    updateDOM();
}

const sortByRichest = () => {
    data.sort((a,b) => b.money - a.money)
    updateDOM();
}

const showMillionaires = () => {
    data = data.filter((user) => {
        return user.money >= 1000000
    })
    updateDOM();
}

const calculateWealth = () => {
    const total = data.reduce((acc, item) => {
        return acc += item.money 
    }, 0)
    const wealthElement = document.createElement('div')
    wealthElement.classList.add("wealth")
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`
    if (!document.querySelector(".wealth")){
        main.appendChild(wealthElement)
    }    
}

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)