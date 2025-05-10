function draw() {
  //Parte 1
  let canvasImg = document.getElementById("canvasImg");
  let ctxImg = canvasImg.getContext("2d");
  let img = new Image();
  img.src = "img/logomislata.jpg";
  img.onload = function () {
    ctxImg.drawImage(img, 0, 0, canvasImg.width, canvasImg.height);
  };

  let canvas1 = document.getElementById("canvas1");
  let ctx1 = canvas1.getContext("2d");
  ctx1.beginPath();

  ctx1.arc(canvas1.width / 2, canvas1.height / 2, 75, 0, 2 * Math.PI);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.arc(canvas1.width / 2, canvas1.height / 2, 80, 0, 2 * Math.PI);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.moveTo(150, 65);
  ctx1.lineTo(150, 235);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.moveTo(50, 150);
  ctx1.lineTo(250, 150);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.moveTo(60, 65);
  ctx1.lineTo(240, 235);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.moveTo(canvas1.width / 2, canvas1.height / 2);
  ctx1.lineTo(65, 245);
  ctx1.stroke();

  ctx1.beginPath();
  ctx1.fillStyle = "gray";
  ctx1.moveTo(115, 190);
  ctx1.lineTo(154, 180);
  ctx1.lineTo(135, 167);
  ctx1.lineTo(120, 146);
  ctx1.closePath();
  ctx1.fill();

  ctx1.beginPath();
  ctx1.fillStyle = "darkblue";
  ctx1.moveTo(142, 159);
  ctx1.lineTo(214, 211);
  ctx1.lineTo(178, 150);
  ctx1.lineTo(213, 80);
  ctx1.lineTo(150, 122);
  ctx1.lineTo(87, 91);
  ctx1.closePath();
  ctx1.fill();

  //Parte 2
  let nroInput = document.getElementById("nroDiscos");
  nroInput.addEventListener("keydown", function (e) {
    if (
      !/^[1-5]$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  });

  nroInput.addEventListener("input", function () {
    if (parseInt(nroInput.value) > 5) {
      nroInput.value = "5";
    }
    if (parseInt(nroInput.value) < 1) {
      nroInput.value = "1";
    }
  });

  dbjOriginal = function () {
    let canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("A", 95, canvas.height - 210); // Letra para Poste 1
    ctx.fillText("B", 195, canvas.height - 210); // Letra para Poste 2
    ctx.fillText("C", 295, canvas.height - 210); // Letra para Poste 3
    ctx.fillStyle = "brown";
    ctx.fillRect(90, canvas.height - 200, 10, 200); // Poste 1
    ctx.fillRect(190, canvas.height - 200, 10, 200); // Poste 2
    ctx.fillRect(290, canvas.height - 200, 10, 200); // Poste 3
  };

  document.getElementById("btnReset").addEventListener("click", function () {
    let canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("nroDiscos").value = "";
    document.getElementById("Origen").value = "Elige...";
    document.getElementById("Destino").value = "Elige...";
    document.getElementById("resultado").innerText = "";
    dbjOriginal();
  });

  document.getElementById("btnResolver").addEventListener("click", function () {
    const coloresDiscos = ["red", "orange", "yellow", "green", "blue"];
    let canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let nroDiscos = parseInt(document.getElementById("nroDiscos").value);
    let origen = parseInt(document.getElementById("Origen").value);
    let destino = parseInt(document.getElementById("Destino").value);
    let resultado = document.getElementById("resultado");
    resultado.innerText = "";
    if (isNaN(nroDiscos) || nroDiscos < 1 || nroDiscos > 5) {
      resultado.innerText = "Número de discos inválido.";
      return;
    }
    if (isNaN(origen) || origen < 1 || origen > 3) {
      resultado.innerText = "Origen inválido.";
      return;
    }
    if (isNaN(destino) || destino < 1 || destino > 3) {
      resultado.innerText = "Destino inválido.";
      return;
    }
    if (origen === destino) {
      resultado.innerText = "Origen y destino no pueden ser iguales.";
      return;
    }
    let auxiliar = 6 - origen - destino;
    let movimientos = [];
    let torre = [[], [], []];
    for (let i = nroDiscos; i >= 1; i--) {
      torre[origen - 1].push(i);
    }

    dbjOriginal();
    let hanoi = function (n, origen, destino, auxiliar, torre, movimientos) {
      if (n === 1) {
        movimientos.push(
          `${
            movimientos.length + 1
          }) Mover de poste ${origen} a poste ${destino}`
        );
        let disco = torre[origen - 1].pop();
        torre[destino - 1].push(disco);
      } else {
        hanoi(n - 1, origen, auxiliar, destino, torre, movimientos);
        movimientos.push(
          `${
            movimientos.length + 1
          }) Mover de poste ${origen} a poste ${destino}`
        );
        let disco = torre[origen - 1].pop();
        torre[destino - 1].push(disco);
        hanoi(n - 1, auxiliar, destino, origen, torre, movimientos);
      }
    };

    hanoi(nroDiscos, origen, destino, auxiliar, torre, movimientos);

    // Dibujar los movimientos finales en el canvas
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < torre[i].length; j++) {
        ctx.fillStyle = coloresDiscos[torre[i][j] - 1];
        ctx.fillRect(
          95 + i * 100 - torre[i][j] * 10, // Centrar el disco con respecto al poste
          canvas.height - 10 - (j + 1) * 20, // Ajustar la posición vertical para apilar correctamente
          torre[i][j] * 20,
          10
        );
      }
    }
    resultado.innerText = movimientos.join("\n");
  });

  function dibujarCambios() {
    console.log("Cambios en el canvas");
    let origen = parseInt(document.getElementById("Origen").value);
    let canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dbjOriginal();
    let nroDiscos = parseInt(document.getElementById("nroDiscos").value);
    if (isNaN(nroDiscos) || nroDiscos < 1 || nroDiscos > 5) {
      return;
    }
    let torre = [[], [], []];
    for (let i = nroDiscos; i >= 1; i--) {
      torre[origen - 1].push(i);
    }
    let coloresDiscos = ["red", "orange", "yellow", "green", "blue"];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < torre[i].length; j++) {
        ctx.fillStyle = coloresDiscos[torre[i][j] - 1];
        ctx.fillRect(
          95 + i * 100 - torre[i][j] * 10, // Centrar el disco con respecto al poste
          canvas.height - 10 - (j + 1) * 20, // Ajustar la posición vertical para apilar correctamente
          torre[i][j] * 20,
          10
        );
      }
    }

  }

  document
    .getElementById("nroDiscos")
    .addEventListener("change", dibujarCambios);
  document.getElementById("Origen").addEventListener("change", dibujarCambios);
  dbjOriginal();
}

window.addEventListener("load", draw);
