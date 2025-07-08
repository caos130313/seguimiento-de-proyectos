const projects = {
  "A13-0925": "proyectos/a13-0925.html",
  "A13-0926": "proyectos/a13-0926.html",
  "MARIA2024": "proyectos/maria-gomez.html"
};

function checkCode() {
  const code = document.getElementById("projectCode").value.trim().toUpperCase();
  const errorDiv = document.getElementById("error");
  if (projects[code]) {
    window.location.href = projects[code];
  } else {
    errorDiv.textContent = "Código inválido. Intenta de nuevo.";
  }
}
