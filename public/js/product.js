document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option, .color-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const imageContainers = document.querySelectorAll('.image-scroll');

    options.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentNode;
            // Deselect all other options in the parent
            parent.querySelectorAll('.option, .color-option').forEach(opt => opt.classList.remove('selected'));
            // Select the clicked one
            this.classList.add('selected');

            // If this is a color option, update the images
            if (this.classList.contains('color-option')) {
                const selectedColor = this.getAttribute('data-color');
                // Display the matching color images
                imageContainers.forEach(container => {
                    if (container.getAttribute('data-color') === selectedColor) {
                        container.style.display = '';
                    } else {
                        container.style.display = 'none';
                    }
                });
            }
        });
    });

    // Automatically select the first color option
    const firstColorOption = document.querySelector('.color-selection .color-option');
    if (firstColorOption) {
        firstColorOption.click(); // Simulate a click to select and update images
    }
});