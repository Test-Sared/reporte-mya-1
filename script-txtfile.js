// Función para manejar el clic en las celdas
function handleCellClick(cell) {
    const row = cell.parentElement;
    const cells = Array.from(row.querySelectorAll('.cell'));

    if (cell.classList.contains('highlight')) {
        // Si la celda ya está resaltada, la deseleccionamos
        cell.classList.remove('highlight');
    } else {
        // Sino, deseleccionamos todas las celdas de la fila y luego resaltamos la celda clickeada
        cells.forEach(c => c.classList.remove('highlight'));
        cell.classList.add('highlight');
    }
}

// Asignar evento click a todas las celdas
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        handleCellClick(cell);
    });
});

// Función para generar el archivo de texto al hacer clic en el botón
function createTextFile() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString().replace(/\//g, '-');
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fileSafeTime = formattedTime.replace(/:/g, '-');

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
                // Asignar valores según la posición en la fila
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

    const fileName = `Reporte_${operario}_${formattedDate}_${fileSafeTime}.txt`;

    if (!operario) {
        alert("Por favor, ingresa el nombre del operario.");
        return;
    }

    // Crear un Blob con codificación UTF-8
    const blob = new Blob([new TextEncoder('utf-8').encode(textContent)], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
