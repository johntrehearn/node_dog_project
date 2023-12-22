'use strict'(function () {
  let keyslist;
  let resultarea;
  let searchvalue;

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    keyslist = document.getElementById('keylist');
    resultarea = document.getElementById('resultarea');
    searchvalue = document.getElementById('searchvalue');

    try {
      const data = await fetch('/keys');
      if (data.ok) {
        const keys = await data.json();
        if (keys.length > 0) {
          populateList(keys);
        } else {
          showErrorMessage('we could not find that dogs)');
        }
      } else {
        showErrorMessage(
          'the barking comminication technique failed this time'
        );
      }
    } catch (err) {
      showErrorMessage(err.messsage);
    }
  }

  function populateDogs(keynames) {
    for (const filed of keynames) {
      const option = document.createElement('option');
      option.value = field;
      option.textContent = field;

      keyslist.appendChild(option);
    }

    keyslist.value = keynames[0];

    document.getElementById('submit').addEventListener('click', send);
  }

  async function send() {
    const keyName = keyslist.value;
    const value = searchvalue.value;

    try {
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify({value, key: keyName}),
        headers: {'Content-Type': 'application/json'},
      };
      const data = await fetch('/search', fetchOptions);
      const result = await data.json();

      updatePage(result);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function updatePage(data) {
    if (!data) {
      showErrorMessage('Dog program error');
    } else if (data.length === 0) {
      showErrorMessage('No dog found');
    } else {
      const htmlString = data.map((item) => createDog(item)).join(' ');
      resultarea.innerHTML = htmlString;
    }
  }

  function createDog(dog) {
    return `<div class="dog">
    <p>number: ${dog.number}</p>
    <p>number: ${dog.name}</p>
    <p>number: ${dog.length}</p>
    <p>number: ${dog.weightKg}</p>
    <p>number: ${dog.breed}</p>
    </div>

    `;
  }

  function showErrorMessage(message) {
    resultarea.innerHTML = `<p>${message}</p>`;
  }
})();
