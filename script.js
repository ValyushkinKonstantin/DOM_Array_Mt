const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionariesBtn = document.getElementById('show-millionaries');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

console.log(main ,addUserBtn, doubleBtn, sortBtn,  showMillionariesBtn, calculateWealthBtn );

let data = [];



// add data into Array
function addData(odj) {
  data.push(odj);
  updateDOM();
}

//update DOM

function updateDOM(providedData = data ) {
  //Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach( function (item) {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong> ${item.name} </strong>${formatMoney(item.money)} `;
    main.appendChild(element);
  })
}


// Format money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Featch random user and money
async function getRandomUser() {
      const res = await fetch('https://randomuser.me/api');
      const data = await res.json();

      const user = data.results[0];

      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)

      };

      addData(newUser);
}


//double all money
function doubleMoney(arr) {
  data =  data.map(user=>{
    return {...user, money:user.money*2 }
  });

  updateDOM();
}


// sort by richest
function sortByRichest() {
  data.sort((a,b) => (b.money - a.money));
  updateDOM();

}

function filterMillioners() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();

}



// Calculate total Wealth
function calculateWealth() {
  const totalWealth = data.reduce((acc,user) => (acc+= user.money) , 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3> Total wealth: <strong>${formatMoney(totalWealth)}</strong> </h3>`;
  main.appendChild(wealthEl);
  
console.log(formatMoney(totalWealth));
}

// Event Listeners

addUserBtn.addEventListener("click", getRandomUser );
doubleBtn.addEventListener("click", doubleMoney );
sortBtn.addEventListener("click", sortByRichest );
showMillionariesBtn.addEventListener("click", filterMillioners );
calculateWealthBtn.addEventListener("click", calculateWealth );
