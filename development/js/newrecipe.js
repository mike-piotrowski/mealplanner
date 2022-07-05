class AddRemoveElementList {
  constructor(selectorName) {
    this.selectorName = selectorName;
    this.DOMElement = document.querySelector(selectorName);
    this.addNewList();
    this.remove();
    this.edit();
  }

  addNewList() {
    const greenButton = this.DOMElement.querySelector('a');
    const inputText = this.DOMElement.querySelector('textarea');
    const listItem = this.DOMElement.querySelector('.list');

    greenButton.addEventListener('click', () => {
      const newItemList = `<li class="newrecipe__instruction">${inputText.value}</li><i class="fa-solid fa-pen-to-square pen"></i> <i class="fa-solid fa-trash-can trash"></i>`;
      if (inputText.value.length > 0) {
        listItem.innerHTML += newItemList;
        inputText.value = '';
      }
      this.remove();
      this.edit();
    });
  }

  remove() {
    const trash = this.DOMElement.querySelectorAll('.trash');
    trash.forEach((el) => el.addEventListener('click', () => {
      el.previousElementSibling.remove();
      el.previousElementSibling.remove();
      el.remove();
    }));
  }

  edit() {
    const pen = this.DOMElement.querySelectorAll('.pen');

    pen.forEach((el) => el.addEventListener('click', () => {
      el.parentElement.firstElementChild.innerText = prompt('Wprowadź zmiany');
    }));
  }
}

export default AddRemoveElementList;
