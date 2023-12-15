'use strict'(function () {
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    try {
      const data = await fetch('/all');
      const results = await data.json();

      const resultsDisplay = document.getElementById('resultsDisplay');

      for (const dog of results) {
        const tr = document.createElement('tr');
        tr.appendChild(createCell(dog.number));
        tr.appendChild(createCell(dog.name));
        tr.appendChild(createCell(dog.length));
        tr.appendChild(createCell(dog.weightKg));
        tr.appendChild(createCell(dog.breed));
        resultsDisplay.appendChild(tr);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function createCell(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
  }
})();
