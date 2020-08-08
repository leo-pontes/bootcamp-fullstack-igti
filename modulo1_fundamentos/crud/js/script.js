window.addEventListener("load", start);

var globalNames = ["Um", "Dois", "Três", "Quatro"];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  preventFormSubmit();

  inputName = document.querySelector("#inputName");
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function updateName(newName) {
  globalNames[currentIndex] = newName;
}

function activateInput() {
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== "";

    if (!hasText) return;

    if (event.code === "Enter") {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        globalNames.push(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createButton(idx) {
    function deleteName() {
      globalNames.splice(idx, 1);
      render();
    }

    var button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("deleteButton");
    button.addEventListener("click", deleteName);

    return button;
  }
  function createSpan(name, idx) {
    function editItem() {
      inputName.value = name;
      inputName.focus;
      isEditing = true;
      currentIndex = idx;
    }

    var span = document.createElement("span");
    span.textContent = currentName;
    span.classList.add("clickable");
    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";

  var ul = document.createElement("ul");

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement("li");

    var button = createButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = "";
  inputName.focus();
}
