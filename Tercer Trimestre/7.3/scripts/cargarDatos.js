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
        let titulo_original = anime.getElementsByTagName("titulo_original")[0].textContent;
        let titulo_ingles = anime.getElementsByTagName("titulo_ingles")[0].textContent;
        let tipo = anime.getElementsByTagName("tipo")[0].textContent;
        let episodios = anime.getElementsByTagName("episodios")[0].textContent;
        let nota = anime.getElementsByTagName("nota")[0].textContent;
        let fecha_inicio = anime.getElementsByTagName("fecha_inicio")[0].textContent;
        let generos = "";

        Array.from(anime.getElementsByTagName("genero")).forEach((element, i) => {
            generos += element.textContent + (i < anime.getElementsByTagName("genero").length - 1 ? ", " : "");
        });
        let estudios = "";
        
        Array.from(anime.getElementsByTagName("estudio")).forEach((element, i) => {
            estudios += element.textContent + (i < anime.getElementsByTagName("estudio").length - 1 ? ", " : "");
        });
        let imagen = anime.getElementsByTagName("imagen")[0].textContent;

        contenedor.innerHTML += `
        <div class="anime" id="${id}">
            <img src="${imagen}" alt="${titulo_original}">
            <h3>${titulo_original}</h3>
            <p><strong>Titulo en ingles:</strong> ${titulo_ingles}</p>
            <p><strong>Tipo:</strong> ${tipo}</p>
            <p><strong>Episodios:</strong> ${episodios}</p>
            <p><strong>Nota:</strong> ${nota}</p>
            <p><strong>Fecha de inicio:</strong> ${fecha_inicio}</p>
            <p><strong>Generos:</strong> ${generos}</p>
            <p><strong>Estudios:</strong> ${estudios}</p>
        </div>`;
    }
});
