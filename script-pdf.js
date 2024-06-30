function guardarPDF() {
    const { jsPDF } = window.jspdf; // Importa jsPDF desde el objeto global window.jspdf
    const container = document.getElementById('container'); // Obtiene el elemento HTML con id 'container'
    const operario = document.getElementById('operario').value.trim(); // Obtiene el valor del input con id 'operario' y elimina espacios en blanco al inicio y final

    // Verifica que el campo operario no esté vacío
    if (!operario) {
        alert("Por favor, ingresa el nombre del operario.");
        return; // Si está vacío, muestra una alerta y sale de la función sin hacer nada más
    }

    // Obtiene la fecha actual y formatea día, mes y año
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0'); // Día del mes (con dos dígitos)
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (se suma 1 porque los meses van de 0 a 11)
    const year = date.getFullYear(); // Año
    const formattedDate = `${day}-${month}-${year}`; // Fecha formateada como dd-mm-yyyy

    // Formatea la hora actual
    const hours = date.getHours().toString().padStart(2, '0'); // Horas (con dos dígitos)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos (con dos dígitos)
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Segundos (con dos dígitos)
    const fileSafeTime = `${hours}-${minutes}`; // Hora formateada como hh-mm

    // Genera el nombre del archivo PDF con el formato 'Reporte_operario_dd-mm-yyyy_hh-mm.pdf'
    const fileName = `Reporte_${operario}_${formattedDate}_${fileSafeTime}.pdf`;

    // Opciones para la generación de la imagen del contenedor HTML a capturar
    const options = {
        scale: 5, // Aumenta la escala para mejorar la resolución de la imagen
        useCORS: true, // Permite el uso de CORS para imágenes externas
        logging: true, // Activa el registro para debugging (opcional)
        allowTaint: true, // Permite taint (marca de agua) en la imagen capturada
    };

    // Captura el contenido del elemento HTML 'container' como una imagen usando html2canvas
    html2canvas(container, options).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Convierte la imagen capturada a formato base64 JPEG

        const pdf = new jsPDF('p', 'mm', 'a4'); // Crea un nuevo documento PDF en formato 'portrait', tamaño 'a4'
        const imgProps = pdf.getImageProperties(imgData); // Obtiene las propiedades de la imagen capturada
        const margin = 10; // Márgenes para el PDF
        const pdfWidth = pdf.internal.pageSize.getWidth() - 6 * margin; // Ancho disponible del PDF
        const pageHeight = pdf.internal.pageSize.getHeight() - 0.5 * margin; // Altura disponible de la página del PDF

        // Calcula la altura de la imagen ajustada al ancho del PDF
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let finalHeight = imgHeight;

        // Si la altura de la imagen es mayor que la altura de la página, ajusta la altura final
        if (imgHeight > pageHeight) {
            finalHeight = pageHeight;
        }

        // Calcula la posición horizontal y vertical centrada para la imagen en el PDF
        const xPos = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2; // Centrado horizontal
        const yPos = (pdf.internal.pageSize.getHeight() - finalHeight) / 2; // Centrado vertical

        // Agrega la imagen al documento PDF en la posición calculada
        pdf.addImage(imgData, 'JPEG', xPos, yPos, pdfWidth, finalHeight);

        // Guarda el documento PDF con el nombre generado
        pdf.save(fileName);
    });
}
