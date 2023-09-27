import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-80e2c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const shoppingList = document.getElementById("shopping-list")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const boughtList = ref(database, "boughtList")
inputFieldEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addButtonEl.click();
    }
  });

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()
   //appendItemtoShoppingListEl(inputValue)
})

onValue(shoppingListInDB , function(snapshot){  
    if(snapshot.exists()){
        clearShoppingListEl()

        let itemsArray = Object.entries(snapshot.val())
        itemsArray.forEach(function(item){
            let currentItemID = item[0];
            let currentItemValue = item[1];
    
            appendItemtoShoppingListEl(item)
        })
    } else shoppingList.innerHTML = "No items here... yet"
    
})

function clearShoppingListEl(){
    shoppingList.innerHTML = ""
}

function clearInputField() {
    inputFieldEl.value = ""
}
function appendItemtoShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("click" , function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        newEl.style.backgroundColor = "#a94c47"

        newEl.classList.add("clicked");
        push(boughtList, newEl.textContent)
        setTimeout(() => {
            newEl.style.scale = 0.1     
            setTimeout(() => {
                remove(exactLocationOfItemInDB)   

            }, 100);
           
        }, 300)

        
       
      
    })
    shoppingList.append(newEl)
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mainMenu = document.getElementById('main-menu');
const menuIcon = document.getElementById('menu-icon');
const burgerIcon = "assets/burger.svg"
const crossIcon = "assets/cross.svg"

mobileMenuButton.addEventListener('click', () => {
  mainMenu.style.left = mainMenu.style.left === '0px' ? '-250px' : '0px';
  mainMenu.style.display = 'block';
  if (menuIcon.children[0].href.baseVal == 'assets/burger.svg'){
    menuIcon.innerHTML = `<image href="${crossIcon}" width="45" height="45" />` 
    
  
  }else menuIcon.innerHTML = `<image href="${burgerIcon}" width="45" height="45" />`   
 
});