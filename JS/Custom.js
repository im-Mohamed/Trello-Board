var count = 0;
var drag = null;

function addLists(elementID, btnID, listHolder) {
  var addInput = document.getElementById(elementID);
  var addBtn = document.getElementById(btnID);
  var divList = document.getElementById(listHolder);
  if (addInput.value === "") {
    alert("Enter the list name please!!!");
  } else {
    var ul = divList.querySelector("ul");
    var li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.setAttribute("class", "draggable");
    // li.setAttribute("ondragstart","drag(event)")
    li.innerHTML = addInput.value;
    addInput.value = "";
    ul.appendChild(li);
    createBtn(li);
  }
}

// add list when pressed enter
function enterAdd(elementID, btnID, listHolder) {
  if (event.which === 13) {
    addLists(elementID, btnID, listHolder);
  }
}

/* 
 create action buttons
------------------------
*/
// create variables
var listUl = document.querySelector(".list");
var lis = listUl.children;

function createBtn(li) {
  // create remove button
  var remove = document.createElement("button");
  remove.className = "btn-icon remove";
  li.appendChild(remove);

  // create down button
  var down = document.createElement("button");
  down.className = "btn-icon down";
  li.appendChild(down);

  // create up button
  var up = document.createElement("button");
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
function upAndDownAndDelete(event) {
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
 enabling button actions (to delete remove it's Block )
------------------------------------------------------------
*/

const removeHTMLElement = function (e) {
  e.parentElement.remove();
};

// action to be taken when clicked on hide list button
// var divList = document.getElementById("listHolder");
function hideAndShow(listHolderID, togglebtnID) {
  if (document.getElementById(listHolderID).style.display === "none") {
    document.getElementById(listHolderID).style.display = "block";
    document.getElementById(togglebtnID).innerHTML = "Hide List";
  } else {
    document.getElementById(listHolderID).style.display = "none";
    document.getElementById(togglebtnID).innerHTML = "Show List";
  }
}

// ===========================================================
var inpAddCard = document.getElementById("add-card-text");
var btnAddCard = document.getElementById("add-card-button");
var mainContainer = document.getElementById("container");

btnAddCard.addEventListener("click", htmlGreat);
function htmlGreat() {
  count++;
  if (inpAddCard.value === "") {
    alert("Enter The Name please...");
  } else if (inpAddCard.value != "") {
    mainContainer.innerHTML += `
    <div class="todoBlock">
    <button id="del-all${count}" class="removeAll" onclick="removeHTMLElement(this);">X</button>
      <!-- main title holder -->
      <div class="titleHolder">
        <h1>${inpAddCard.value}</h1>
        
      </div>
      <!-- todo list -->
      <div class="todoList">
        <!-- list holder -->
        <div id="listHolder${count}" onclick="upAndDownAndDelete(event)" class="listH"   >
          <ul class="list" >

          </ul>
        </div>
        <!-- form holder -->
        <div class="formHolder">
          <div class="col big">
            <input type="text" id="addInput${count}" onkeyup="enterAdd('addInput${count}','addBtn${count}','listHolder${count}')"  placeholder="Add Task...">
          </div>
          <div class="col">
            <button type="button" id="addBtn${count}" onclick="addLists('addInput${count}','addBtn${count}','listHolder${count}')" class="btn-primary">+</button>
          </div>
          <div class="col">
            <button type="button" id="toggleBtn${count}"  class="btn-primary" onclick="hideAndShow('listHolder${count}','toggleBtn${count}')">Hide List</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    inpAddCard.value = "";
  }
}

// ===========================================================
// var ul = document.getElementsByTagName("ul");
// var div = document.querySelectorAll(".listH");
// var dragItem = null;
// for (var i of ul) {
//   i.addEventListener("dragstart", dragStart);
//   i.addEventListener("dragend", dragEnd);
// }
// function dragStart() {
//   dragItem = this;
//   console.log("dragstart")
//   // setTimeout(() => (this.style.display = "block"), 0);
// }
// function dragEnd() {
//   dragItem = this;
//   console.log("dragend")
//   // setTimeout(() => (this.style.display = "none"), 0);
// }

// for (j of div) {
//   j.addEventListener("dragover", dragOver);
//   j.addEventListener("dragenter", dragEnter);
//   j.addEventListener("dragleave", dragLeave);
//   j.addEventListener("drop", Drop);
// }
// function Drop() {
//   this.append(dragItem);
// }
// function dragOver(e) {
//   e.preventDefault();
//   // this.style.border = "1px dotted blue";
//   console.log("dragover")
// }
// function dragEnter(e) {
//   e.preventDefault();
// }
// function dragLeave() {
//   this.style.border = "none";
// }

// =======================================================

document.addEventListener("dragstart", (event) => {
  dragged = event.target;
  dragFrom = event.target.parentElement.parentElement.id;
  console.log(dragFrom);
});

document.addEventListener("dragend", (event) => {
  console.log("end !");
});

document.addEventListener("dragover", function (event) {
  return event.preventDefault();
});

document.addEventListener("drop", (event) => {
  event.preventDefault();
  dragTo = event.target.parentElement.parentElement.id;
  divTo = document.getElementById(dragTo);
  ul = divTo.querySelector("ul");
  ul.appendChild(dragged);
});