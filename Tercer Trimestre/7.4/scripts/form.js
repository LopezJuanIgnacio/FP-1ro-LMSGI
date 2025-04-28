window.onload = function () {
  document
    .getElementById("registro-submit")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const fechaInicio = document.getElementById("fechaInicio");
      const fechaInicioDate = new Date(fechaInicio.value);
      const fechaActual = new Date();

      if (fechaInicioDate <= fechaActual) {
        fechaInicio.setCustomValidity(
          "La fecha de inicio debe ser mayor que la fecha actual."
        );
      } else {
        fechaInicio.setCustomValidity("");
        this.form.submit();
      }
      fechaInicio.reportValidity();
    });
};

function valContrasIguales(e) {
  const con = document.getElementById("password1").value;
  const con2 = document.getElementById("password2").value;
  if (con !== con2) {
    e.target.setCustomValidity("Las contraseñas deben coincidir");
    e.target.reportValidity();
  } else e.target.setCustomValidity("");
}

function validar(e) {
  const control = e.target;
  const img = e.target?.nextElementSibling?.firstElementChild;
  if ((control.validity.typeMismatch || control.validity.valueMissing) && img) {
    img.src = "img/invalid.png";
    img.alt = "Campo inválido";
  } else if (img) {
    img.src = "img/valid.png";
    img.alt = "Campo válido";
  }
}

function validarConocimientos(e) {
    const control = e.target;
    if (
        control.validity.valueMissing || 
        control.validity.rangeUnderflow || 
        control.validity.rangeOverflow || 
        control.validity.badInput
    ) {
        control.style.backgroundColor = "red";
    } else {
        control.style.backgroundColor = "transparent";
    }
}