document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', function() {
            const rating = this.value;
            const labels = this.parentNode.querySelectorAll('label');
            labels.forEach((label, index) => {
                label.style.color = index < rating ? '#f5b301' : '#ccc';
            });
        });
    });
});

// Function to display the current date without time
function displayDateOnly() {
    const now = new Date();
    const dateString = now.toLocaleDateString(); // Get the date string
    document.getElementById('dateTime').textContent = dateString; // Set only the date
}

// Call the function to display the current date initially
displayDateOnly();

// Call the function to display the current date on page load
window.onload = displayDateOnly;
