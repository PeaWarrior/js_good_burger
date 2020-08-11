const burgerMenu = document.querySelector('div#burger-menu');
const orderList = document.querySelector('ul#order-list');
const customBurger = document.querySelector('form#custom-burger')

getMenu()

function getMenu() {
  fetch('http://localhost:3000/burgers')
  .then(response => response.json())
  .then(burgerObjsArray => burgerObjsArray.forEach(burgerObj => {
    displayBurger(burgerObj)
  }))
};

function displayBurger(burgerObj) {
  let burgerDiv = document.createElement('div')
    burgerDiv.className = 'burger'

  let burgerName = document.createElement('h3')
    burgerName.className = 'burger_title'
    burgerName.innerText = burgerObj.name

  let burgerImg = document.createElement('img')
    burgerImg.src = burgerObj.image

  let burgerDesc = document.createElement('p')
    burgerDesc.className = 'burger_description'
    burgerDesc.innerText = burgerObj.description

  burgerDiv.append(burgerName, burgerImg, burgerDesc, addToOrderButton(burgerObj))
  burgerMenu.append(burgerDiv)
  
};

function addToOrderButton(burgerObj) {
  let addToOrderButton = document.createElement('button')
    addToOrderButton.className = 'button'
    addToOrderButton.innerText = 'Add to Order'

  addToOrderButton.addEventListener('click', function(e) {
    let burgerOrderLi = document.createElement('li')
      burgerOrderLi.innerText = burgerObj.name 
    
    orderList.append(burgerOrderLi)
  });

  return addToOrderButton

};

customBurger.addEventListener('submit', function(e) {
  e.preventDefault()
  fetch('http://localhost:3000/burgers', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: this.name.value,
      description: this.description.value,
      image: this.url.value
    })
  })
  .then(response => response.json())
  .then(newBurgerObj => {
    displayBurger(newBurgerObj)
    this.reset()
  })
})