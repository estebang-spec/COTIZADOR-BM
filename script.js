// Datos de la empresa extraídos de la imagen
const EMPRESA = {
    nombre: "BULONERIA MITRE SRL",
    cuit: "30-69179970-7",
    direccion: "Bernabé Aráoz 162 - San Miguel de Tucumán",
    cp: "4107",
    telefono: "3816797611",
    email: "estebang@buloneriamitre.com.ar",
    web: "www.buloneriamitre.com.ar"
};

// ... (El resto del array de productos se mantiene igual) ...

function generarPDF() {
    const nombreCliente = document.getElementById('cliente-nombre').value.trim();
    
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    if (nombreCliente === "") {
        alert("Por favor, ingrese el nombre del cliente.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Encabezado con datos de Buloneria Mitre
    doc.setFontSize(16);
    doc.setTextColor(0, 86, 179); // Azul corporativo
    doc.text(EMPRESA.nombre, 14, 20);
    
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`CUIT: ${EMPRESA.cuit}`, 14, 26);
    doc.text(`${EMPRESA.direccion} (CP ${EMPRESA.cp})`, 14, 31);
    doc.text(`Tel: ${EMPRESA.telefono} | Mail: ${EMPRESA.email}`, 14, 36);

    doc.setDrawColor(229, 31, 31); // Línea roja decorativa
    doc.line(14, 40, 196, 40);

    // Datos del Cliente y Fecha
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`CLIENTE: ${nombreCliente.toUpperCase()}`, 14, 50);
    doc.text(`FECHA: ${new Date().toLocaleDateString()}`, 150, 50);

    // Tabla de productos
    const rows = carrito.map(i => [
        i.nombre, 
        `$${i.precio.toLocaleString()}`, 
        i.cantidad, 
        `$${(i.precio * i.cantidad).toLocaleString()}`
    ]);
    
    doc.autoTable({
        startY: 55,
        head: [['Descripción del Producto', 'Precio Unit.', 'Cant.', 'Subtotal']],
        body: rows,
        headStyles: { fillColor: [52, 58, 64] }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    
    // Totales
    doc.setFontSize(10);
    doc.text(`Subtotal: ${document.getElementById('subtotal').innerText}`, 140, finalY);
    doc.text(`IVA (21%): ${document.getElementById('iva').innerText}`, 140, finalY + 6);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`TOTAL: ${document.getElementById('total-final').innerText}`, 140, finalY + 14);

    // Pie de página
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text("Precios sujetos a cambios sin previo aviso. Validez de la oferta: 10 días.", 14, 280);
    doc.text(EMPRESA.web, 170, 280);

    doc.save(`Cotizacion_${nombreCliente.replace(/ /g, "_")}.pdf`);
}