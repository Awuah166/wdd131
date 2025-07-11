// Select the input, button, and list elements from the DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

// Create a new list item and delete button
const li = document.createElement('li');
const deleteButton = document.createElement('button');

// Set the list item's text to the input value
li.textContent = input.value;

// Set the delete button's text to a cross symbol
deleteButton.textContent = '❌';

// Append the delete button to the list item
li.append(deleteButton);

// Append the list item to the list
list.append(li);

// Add an event listener to the button to handle clicks
button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        // Create a new list item and delete button
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        // Set the list item's text to the input value
        li.textContent = input.value;

        // Set the delete button's text to a cross symbol
        deleteButton.textContent = '❌';

        // Append the delete button to the list item
        li.append(deleteButton);

        // Append the list item to the list
        list.append(li);

        // Clear the input field
        input.value = '';
        input.focus();
    }

});

deleteButton.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();
});
