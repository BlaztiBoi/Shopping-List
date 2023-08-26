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

      // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
    newEl.addEventListener("click" , function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
        // Challenge: Use the remove function to remove the item from the database
    })
    shoppingList.append(newEl)
}

