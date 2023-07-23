document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.querySelector('#productForm');
  productForm.addEventListener('submit', onFormSubmit);

  const storeList = document.querySelector('#storeList');
  storeList.addEventListener('click', handleTableClick);



});


// Global variable to hold the selected row for editing
let selectedRow = null;

// Function to handle form submission
function onFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Read form data from input fields
  const formData = readFormData();

  // Check if a row is selected for editing or if it's a new record insertion
  if (selectedRow === null) {
    insertNewRecord(formData); // Insert a new record into the table
  } else {
    updateRecord(formData); // Update the existing record
  }

  resetForm(); // Clear the form input fields after submission
}

// Retrieve the data from the form input fields
function readFormData() {
  return {
  productCode : document.querySelector('#productCode').value,
  product : document.querySelector('#product').value,
  qty : document.querySelector('#qty').value,
  perPrice : document.querySelector('#perPrice').value,
  };
}

// Insert a new record into the table
function insertNewRecord(data) {
  const table = document.querySelector('#storeList').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.rows.length);
  
  // Create cells and populate them with data
  const cell1 = newRow.insertCell(0);
  cell1.textContent = data.productCode;
  
  const cell2 = newRow.insertCell(1);
  cell2.textContent = data.product;
  
  const cell3 = newRow.insertCell(2);
  cell3.textContent = data.qty;
  
  const cell4 = newRow.insertCell(3);
  cell4.textContent = data.perPrice;
  
  const cell5 = newRow.insertCell(4);
  cell5.innerHTML ='<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>';
}

// Handle clicks on the table rows' buttons
function handleTableClick(event) {
  const target = event.target;
  switch (true) {
    case target.classList.contains('edit-btn'):
      onEdit(target);
      break;
    case target.classList.contains('delete-btn'):
      onDelete(target);
      break;
  }
}

// Edit the data of a selected row 
function onEdit(event) {
  const selectedRow = event.target.parentNode.parentNode;
  document.querySelector('#productCode').value = selectedRow.cells[0].textContent;
  document.querySelector('#product').value = selectedRow.cells[1].textContent;
  document.querySelector('#qty').value = selectedRow.cells[2].textContent;
  document.querySelector('#perPrice').value = selectedRow.cells[3].textContent;
}

// Update the data of a selected row
function updateRecord(formData) {
  selectedRow.cells[0].textContent = formData.productCode;
  selectedRow.cells[1].textContent = formData.product;
  selectedRow.cells[2].textContent = formData.qty;
  selectedRow.cells[3].textContent = formData.perPrice;
} 

// Delete the data of a selected row
function onDelete(event) {
  if (confirm('Do you want to delete this record?')) {
    const row = event.target.parentNode.parentNode;
    row.remove();
    selectedRow = null; 
  }
  resetForm(); // Clear the form input fields after deletion
}

// Reset the form input fields
function resetForm() {
  document.querySelector('#productCode').value = '';
  document.querySelector('#product').value = '';
  document.querySelector('#qty').value = '';
  document.querySelector('#perPrice').value = '';
}
