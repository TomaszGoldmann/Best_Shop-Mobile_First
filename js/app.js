const formCheckboxes = document.querySelectorAll('.form__checkbox')
const listItems = document.querySelectorAll('.list__item')
const dropDownItems = document.querySelector('.select__input')
const dropDown = document.querySelector('.calc__select')
const inputs = document.querySelectorAll('.calc .form__input')
const total = document.getElementById('total-price')
let totalArray = []

const values = {
    products: 0.5,
    orders: 0.5,
    package: {
        basic: 0,
        professional: 25,
        premium: 60
    },
    accounting: 35,
    terminal: 5
}

inputs.forEach(function (input) {
    input.addEventListener('input', handleChange)
})
formCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', handleChange)
})

Array.from(dropDownItems.nextElementSibling.children).forEach(function (element) {
    element.addEventListener('click', handlePackage)
})

function handlePackage(event) {
    dropDownItems.innerText = event.target.innerText
    dropDownItems.style.color = 'black'
    listItems[2].style.display = 'block'
    listItems[2].children[1].innerText = event.target.innerText
    if (event.target.innerText === 'Basic'){
        listItems[2].children[2].innerText = `$${values.package.basic}`
        totalArray[4] = values.package.basic
    } else if (event.target.innerText === 'Professional'){
        listItems[2].children[2].innerText = `$${values.package.professional}`
        totalArray[4] = values.package.professional
    } else {
        console.log(values.package.premium)
        listItems[2].children[2].innerText = `$${values.package.premium}`
        totalArray[4] = values.package.premium
    }
}

function handleChange(event) {
    if (typeof +event.currentTarget.value !== 'number') {
        event.currentTarget.style.borderColor = 'red'
        totalArray[0] = 0
    } else if (event.currentTarget === inputs[0] && event.currentTarget.value !== '') {
        event.currentTarget.style.borderColor = '#08a6e4'
        listItems[0].style.display = 'block'
        listItems[0].children[1].innerText = `${event.currentTarget.value} * 0.5`
        const productValue = event.currentTarget.value * 0.5
        totalArray[0] = productValue
        listItems[0].children[2].innerText = `$${productValue}`
    } else if (event.currentTarget !== inputs[0] && event.currentTarget.value === '') {
        event.currentTarget.style.borderColor = 'red'
        totalArray[0] = 0
        listItems[0].style.display = 'none'
    }

    if (typeof +event.currentTarget.value !== 'number') {
        event.currentTarget.style.borderColor = 'red'
        totalArray[1] = 0
    } else if (event.currentTarget === inputs[1] && event.currentTarget.value !== '') {
        event.currentTarget.style.borderColor = '#08a6e4'
        listItems[1].style.display = 'block'
        listItems[1].children[1].innerText = `${event.currentTarget.value} * 0.5`
        const orderValue = event.currentTarget.value * 0.5
        totalArray[1] = orderValue
        listItems[1].children[2].innerText = `$${orderValue}`
    } else if (event.currentTarget !== inputs[1] && event.currentTarget.value === '') {
        event.currentTarget.style.borderColor = 'red'
        totalArray[1] = 0
        listItems[1].style.display = 'none'
    }

    if (formCheckboxes[0].firstElementChild.checked) {
        totalArray[2] = values.accounting
        listItems[3].style.display = 'block'
    } else if (!formCheckboxes[0].firstElementChild.checked) {
        totalArray[2] = 0
        listItems[3].style.display = 'none'
    }

    if (formCheckboxes[1].firstElementChild.checked) {
        totalArray[3] = values.terminal
        listItems[4].style.display = 'block'
    } else if (!formCheckboxes[1].firstElementChild.checked) {
        totalArray[3] = 0
        listItems[4].style.display = 'none'
    }

    let counter = 0
    listItems.forEach(function (element) {
        if (element.style.display === 'block') {
            return counter = 1
        }
    })

    let sumTotal = totalArray.reduce(function (total, item){
        return total + item
    },0)

    console.log(sumTotal)
    total.lastElementChild.textContent = `$${sumTotal}`

    if (counter === 1) {
        total.style.display = 'block'
    } else {
        total.style.display = 'none'
    }
}

dropDown.addEventListener('click', handleOpen)

function handleOpen() {
    dropDown.classList.toggle('open')
}