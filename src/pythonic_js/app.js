import Incrementer from './lib';

document.addEventListener('DOMContentLoaded', () => {
    let incremented = document.querySelector('#incremented');
    let incrementer = new Incrementer();

    // Attach a click handler
    document
        .querySelector('#add')
        .addEventListener('click', () => {
            // Add a random number to the list, re-render
            incrementer.add(Math.floor((Math.random() * 100) + 1));
            incremented.innerHTML = incrementer.toHtml();
        });
});