const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSuaNoGPGZHSr5EBiwlw6y_SdGo2FXu4q_wWmeJcH9OXs8AHxHCXwyNdePR8RqnznrFUgnZ9l9xS8rj/pubhtml';

function checkProject() {
  const code = document.getElementById("projectCode").value.trim().toUpperCase();
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");
  errorDiv.textContent = '';
  resultDiv.style.display = 'none';

  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\\n').map(row => row.split(','));
      const headers = rows[0];
      const codeIndex = headers.indexOf('codigo');
      const nameIndex = headers.indexOf('nombre');
      const stateIndex = headers.indexOf('estado');
      const fileIndex = headers.indexOf('archivo');
      const messageIndex = headers.indexOf('mensaje personalizado');

      const project = rows.find((row, idx) => idx > 0 && row[codeIndex].toUpperCase() === code);

      if (project) {
        const nombre = project[nameIndex];
        const estado = project[stateIndex];
        const archivo = project[fileIndex];
        const mensaje = project[messageIndex];

        resultDiv.innerHTML = `
          <strong>Cliente:</strong> ${nombre}<br>
          <strong>Estado del Proyecto:</strong> ${estado}<br>
          <strong>Mensaje:</strong> ${mensaje}<br>
          <a class="download" href="${archivo}" target="_blank">Descargar Archivo</a>
        `;
        resultDiv.style.display = 'block';
      } else {
        errorDiv.textContent = "No se encontró el código ingresado. Verifica e inténtalo de nuevo.";
      }
    })
    .catch(() => {
      errorDiv.textContent = "Error al conectar con la hoja de datos.";
    });
}
