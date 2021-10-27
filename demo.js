let respuesta = [];

function dameLibros() {
  let url =
    "http://openlibrary.org/search.json?q=" +
    document.getElementById("buscador").value;

  let libros = "";

  fetch(url)
    .then(function recibirRespuesta(respuesta) {
      return respuesta.json();
    })
    .then(function cogerLibros(datos) {
      respuesta = datos;
      if (datos.docs.length <= 0) {
        window.alert("Error al llamar a la API");
      } else {
        for (let i = 0; i < datos.docs.length; i++) {
          if (
            typeof datos.docs[i].isbn !== "undefined" &&
            typeof datos.docs[i].author_name !== "undefined" &&
            typeof datos.docs[i].title !== "undefined"
          ) {
            console.log(i);
            let isbn = datos.docs[i].isbn[0];
            libros =
              libros +
              `<div class="mainBuscadorGnral">
                             <div class="libroCard">
                             <div class="iconoCorazon">
                                  <img onmouseout="this.src='./img/corazon_vacio.svg';" onmouseover="this.src='./img/corazon.svg';" onclick="guardarFavoritos(${i})" src="./img/corazon_vacio.svg" alt="icono corazon"/>
                             </div>
                             <img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg' alt="portada libro"/>
                             <div class="libroTituloAutorIsbn">
                                 <div>
                                     <h4 class="tituloLibro">${datos.docs[i].title}</h4>
                                     <p class="tituloLibro">${datos.docs[i].author_name[0]}</p>
                                 </div>
                                 <p class="isbn">ISBN ${datos.docs[i].isbn[0]}</p>
                             </div>
                             </div>
                         </div>`;
          }
        }
      }
      document.getElementById("resultadosBusqueda").innerHTML = libros;
    })
    .catch(function () {
      window.alert("Error al llamar a la API");
    });
}

let favoritos = [];

function guardarFavoritos(i) {
  console.log(i);
  if (localStorage.getItem("favoritos") !== null) {
    favoritos = JSON.parse(localStorage.getItem("favoritos"));
  }
  window.alert("Guardado en Favoritos");
  console.log(respuesta.docs[i]);
  favoritos.push(respuesta.docs[i]);
  let favoritosJSON = JSON.stringify(favoritos);
  localStorage.setItem("favoritos", favoritosJSON);
}

function leerFavoritos() {
  let misFavoritos = JSON.parse(localStorage.getItem("favoritos"));
  console.log(misFavoritos);
  info = "";
  for (let i = 0; i < misFavoritos.length; i++) {
    info =
      info +
      `
      <div id="mainSearcher">
      <div class="card">
      <div class="infoTitle">
        <div>
          <h4 class="infoName">${misFavoritos[i].title}</h4>
          <p class="infoName">${misFavoritos[i].author_name[0]}</p>
          <p>${misFavoritos[i].isbn}</p>
        </div>
      </div>
      </div>
      </div>
      </div>
      `;
  }
  document.getElementById("mainMisFavoritos").innerHTML = info;
}
