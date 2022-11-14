/* 
 show / hide button 
---------------------
*/
// create variables


 
const toggleBtn = document.querySelector("#toggleBtn");
const divList = document.querySelector(".listHolder");


// action to be taken when clicked on hide list button
toggleBtn.addEventListener("click", hideButton);
function hideButton() {
  if (divList.style.display === "none") {
    divList.style.display = "block";
    toggleBtn.innerHTML = "Hide List";
  } else {
    divList.style.display = "none";
    toggleBtn.innerHTML = "Show List";
  }
}

/* 
 add list items
-----------------
*/
// create variables
const addInput = document.querySelector("#addInput");
const addBtn = document.querySelector("#addBtn");

function addLists() {
  if (addInput.value === "") {
    alert("Enter the list name please!!!");
  } else {
    const ul = divList.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = addInput.value;
    addInput.value = "";
    ul.appendChild(li);
    createBtn(li);
  }
}

// add list when clicked on add item button
addBtn.addEventListener("click", btnAddList);
function btnAddList() {
  addLists();
}

// add list when pressed enter
addInput.addEventListener("keyup", enterAdd);

function enterAdd() {
  if (event.which === 13) {
    addLists();
  }
}

/* 
 create action buttons
------------------------
*/
// create variables
const listUl = document.querySelector(".list");
const lis = listUl.children;

function createBtn(li) {
  // create remove button
  const remove = document.createElement("button");
  remove.className = "btn-icon remove";
  li.appendChild(remove);

  // create down button
  const down = document.createElement("button");
  down.className = "btn-icon down";
  li.appendChild(down);

  // create up button
  const up = document.createElement("button");
  up.className = "btn-icon up";
  li.appendChild(up);

  return li;
}

// loop to add buttons in each li
for (var i = 0; i < lis.length; i++) {
  createBtn(lis[i]);
}

/* 
 enabling button actions (to move item up, down or delete)
------------------------------------------------------------
*/
divList.addEventListener("click", upAndDown);
function upAndDown(event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.className === "btn-icon remove") {
      ul.removeChild(li);
    } else if (button.className === "btn-icon down") {
      const nextLi = li.nextElementSibling;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
    } else if (button.className === "btn-icon up") {
      const prevLi = li.previousElementSibling;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
    }
  }
}

/*
Make HTML Structure With Name
----------------------------------------
*/
const inpAddCard = document.getElementById("add-card-text");
const btnAddCard = document.getElementById("add-card-button");
const mainContainer = document.getElementById("container");

btnAddCard.addEventListener("click", htmlGreat);
function htmlGreat() {
  if (inpAddCard.value === "") {
    alert("Enter The Name please...");
  } else if (inpAddCard.value != "") {
    mainContainer.innerHTML += `
    <div class="todoBlock">
      <!-- main title holder -->
      <div class="titleHolder">
        <h1>${inpAddCard.value}</h1>
        <button id="del-all">X</button>
      </div>
      <!-- todo list -->
      <div class="todoList">
        <!-- list holder -->
        <div class="listHolder">
          <ul class="list">
          </ul>
        </div>
        <!-- form holder -->
        <div class="formHolder">
          <div class="col big">
            <input type="text" id="addInput" placeholder="Add Task...">
          </div>
          <div class="col">
            <button type="button" id="addBtn" class="btn-primary">+</button>
          </div>
          <div class="col">
            <button type="button" id="toggleBtn" class="btn-primary">Hide List</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    inpAddCard.value = "";
  }
}
