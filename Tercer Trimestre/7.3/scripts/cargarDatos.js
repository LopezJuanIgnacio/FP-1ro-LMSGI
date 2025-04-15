window.addEventListener("load", function () {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "XML/animes.xml", false);
  xmlhttp.send();
  let data = xmlhttp.responseXML;
  let animes = data.getElementsByTagName("anime");
  let contenedor = document.getElementById("contenedor");

  contenedor.innerHTML = "";

  for (let i = 0; i < animes.length; i++) {
    let anime = animes[i];

    let id = anime.getAttribute("id");
    let titulo_original =
      anime.getElementsByTagName("titulo_original")[0].childNodes[0].nodeValue;
    let titulo_ingles =
      anime.getElementsByTagName("titulo_ingles")[0].childNodes[0].nodeValue;
    let tipo = anime.getElementsByTagName("tipo")[0].childNodes[0].nodeValue;
    let episodios = anime.getElementsByTagName("episodios")[0].childNodes[0].nodeValue;
    let nota = anime.getElementsByTagName("nota")[0].childNodes[0].nodeValue;
    nota = parseInt(nota);
    let fecha_inicio =
      anime.getElementsByTagName("fecha_inicio")[0].childNodes[0].nodeValue;
    let generos = "";

    Array.from(anime.getElementsByTagName("genero")).forEach((element, i) => {
      generos +=
        element.childNodes[0].nodeValue +
        (i < anime.getElementsByTagName("genero").length - 1 ? ", " : "");
    });
    let estudios = "";

    Array.from(anime.getElementsByTagName("estudio")).forEach((element, i) => {
      estudios +=
        element.childNodes[0].nodeValue +
        (i < anime.getElementsByTagName("estudio").length - 1 ? ", " : "");
    });
    let imagen = anime.getElementsByTagName("imagen")[0].childNodes[0].nodeValue; //Reemplazar por "./img/1.jpg" si no se puede usar las url
    //Si se usa desde un servidor local (como yo venia haciendo), la cdn bloquea las peticiones. Ese es el error que mencionaba en clase 

    let estrellas = "";
    for (let j = 0; j < nota; j++) {
      estrellas += `<img src="./img/estrella.png" alt="estrella" class="estrella">`;
    }
    contenedor.innerHTML += `
        <div class="anime" id="${id}">
            <div class="info">
                <div class="txt">
                    <h3>${titulo_original}</h3>
                    <p><strong>Titulo en ingles:</strong> ${titulo_ingles}</p>
                    <p><strong>Tipo:</strong> ${tipo}</p>
                    <p><strong>Episodios:</strong> ${episodios}</p>
                    <p><strong>Nota:</strong> ${estrellas}</p>
                    <p><strong>Fecha de inicio:</strong> ${fecha_inicio}</p>
                    <p><strong>Generos:</strong> ${generos}</p>
                    <p><strong>Estudios:</strong> ${estudios}</p>
                </div>
            </div> 
            <img src="${imagen}" alt="${titulo_original}" class="imgAnime">
        </div>`;
  }
});
