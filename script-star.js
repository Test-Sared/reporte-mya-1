document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('click', function(e) {
            if (this.checked) {
                if (this.dataset.wasChecked) {
                    this.checked = false;
                    delete this.dataset.wasChecked;
                } else {
                    this.dataset.wasChecked = true;
                }
            } else {
                delete this.dataset.wasChecked;
            }
        });
    });
});