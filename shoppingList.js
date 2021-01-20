let shoppingList = new Array;

const startListener = () => {
  let input = document.getElementById('addItem');
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let item = input.value;
      item = validate(item);
      if (item) {
        shoppingList.push(input.value);
        addToList(item);
      } else {
        alert('Enter a valid shopping item');	      
      }
      input.value = '';  
    }
  }), true;
}

const addToList = inputValue => {
  let parent = document.getElementById('list');
  const text = document.createTextNode(inputValue);
  createNewCheckbox(parent, inputValue, text);
  createNewLabel(parent, inputValue); 

  let lineBreak = document.createElement('br');
  parent.appendChild(lineBreak);
}

const createNewCheckbox = (parent, inputValue, text)  => {
   const newBox = document.createElement('INPUT');
   newBox.setAttribute("type", "checkbox");
   newBox.setAttribute("onclick", "removeItem(" + "'" + inputValue + "'" + ")");
   newBox.setAttribute("id", inputValue);
   newBox.setAttribute("name", inputValue);
   newBox.appendChild(text);
   parent.appendChild(newBox);
}

const createNewLabel = (parent, inputValue) => {
  let newLabel = document.createElement("Label");
  newLabel.setAttribute("id", inputValue);

  item = stripUuid(inputValue);

  newLabel.setAttribute("for", item);
  newLabel.innerHTML = item;
  parent.appendChild(newLabel);
}

const stripUuid = item => {
  let ndxFirstNum = containsNum(item);
  if (ndxFirstNum) {
    return item.slice(0, ndxFirstNum);
  } else {
    return item
  }
}

const containsNum = item => {
  let arr = new Array;
  for (i=0; i<item.length; i++) {     
    let isNum = /\d/.test(item[i]);
    if (isNum && arr.length === 0 ) {
      return i;
    }
  }
  if (arr.length===0) {
    return false
  }
}

const validate = item => {
  if (item.length>2) {
    if (shoppingList.includes(item)) {
      let uUiD = item += ((Math.random() * 100000).toString());
      return uUiD;
    }
  return item;
  } else {
    return false;
  }
}

const removeItem = (item) => {
  const parentDiv = document.getElementById('list');

  let removeTag = document.getElementById(item);
  let nextNode = removeTag.nextSibling;
  let lineBreak = nextNode.nextSibling;
  parentDiv.removeChild(removeTag);
  parentDiv.removeChild(nextNode);
  parentDiv.removeChild(lineBreak);
}
