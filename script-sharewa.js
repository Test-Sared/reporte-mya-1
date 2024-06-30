function shareOnWhatsApp() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString().replace(/\//g, '-');
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const operario = document.getElementById('operario').value.trim().replace(/\s+/g, ' ');
    const apartamento = document.getElementById('apartamento').value.trim();
    const estrellas = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : '0';
    const observaciones = document.getElementById('observaciones').value.trim();

    const titulo = document.querySelector('h2').textContent;

    let textContent = `${titulo}\n${formattedDate} ${formattedTime}\nOperario: ${operario}\nApartamento: ${apartamento}\nNivel de suciedad: ${estrellas}\n\nProductos:\n`;

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const product = row.querySelector('td:first-child').textContent;
        const cells = Array.from(row.querySelectorAll('.cell'));
        let value = '0';
        cells.forEach((cell, index) => {
            if (cell.classList.contains('highlight')) {
                switch (index) {
                    case 0:
                        value = 'si';
                        break;
                    case 1:
                        value = 'no';
                        break;
                    default:
                        if (index >= 2 && index <= 8) {
                            value = (index - 1).toString();
                        }
                        break;
                }
            }
        });
        textContent += `${product}: ${value}\n`;
    });

    textContent += `\nObservaciones:\n${observaciones}`;

    const encodedText = encodeURIComponent(textContent);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
}
