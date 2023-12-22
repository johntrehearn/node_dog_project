'use strict';

(function () {
  let number;
  let name;
  let length;
  let weightKg;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    resultarea = document.getElementById('resultarea');
    number = document.getElementById('number');
    length = document.getElementById('length');
    weightKg = document.getElementById('weightKg');
    breed = document.getElementById('breed');

    document.getElementById('submit').addEventListener('click', send);

    number.addEventListener('focus', clear);
  }

  function clear() {
    number.value = '';
    length.value = '';
    weightKg.value = '';
    resultarea.textContent = '';
    resultarea.removeAttribute('class');
  }

  async function send() {
    const dog = {
      number: +numberField.value,
      length: lengthField.value,
      weightKg: weightKg.value,
    };

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(dog),
        headers: {'Content-Type': 'application/json'},
      };
      const data = await fetch('/addDog', options);
      const result = await data.json();

      updateStatus(result);
    } catch (err) {
      updateStatus({message: err.message, type: 'error'});
    }
  }

  function updateStatus(status) {
    resultsarea.textContent = status.message;
    resultarea.setAttribute('class', status.type);
  }
})();
