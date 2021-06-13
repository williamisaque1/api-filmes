document.getElementById("form").addEventListener("submit", pesquisarFilmes);

function pesquisarFilmes(e) {
  // var filme = document.getElementById("filme").value;
  //sessionStorage.idfilme = filme;
  //refatorado
  sessionStorage.idfilme = document.getElementById("filme").value;
  console.log("filme  " + sessionStorage.idfilme);
  e.preventDefault();

  buscarFilmes(sessionStorage.idfilme);
}
//document.getElementById("voltar").addEventListener("click", eu);
function voltar() {
  // alert("eu fui apertado" + sessionStorage.idfilme);
  buscarFilmes(sessionStorage.idfilme);
  location.href = "index.html";
}

function buscarFilmes(filme) {
  console.log("filme escolhido " + filme);

  /* console.log(
        "*****************testando" +
          response.data[0]["usuario"] +
          "|" +
          response.data[0]["senha"] +
          "--" +
          response.data.length
      );*/

  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=5417af578f487448df0d4932bc0cc1a5&query=" +
        filme +
        "&language=pt-BR"
    )
    .then(function (response) {
      console.log(response);
      var filmePesquisado = response.data.results;
      var mostraFilmes = "";
      console.log(filmePesquisado);
      console.log(sessionStorage.idfilme + "  " + "qual e o filme");

      for (var i = 0; i < filmePesquisado.length; i++) {
        mostraFilmes += '<div class="col-md-4">';
        if (filmePesquisado[i].poster_path == null) {
          mostraFilmes +=
            '<img class="img-thumbnail"  src="/img-outros elementos/erro.jpg ">';
          mostraFilmes += "<br/><br/>";
          mostraFilmes +=
            '<h6  style="color:red">' + filmePesquisado[i].title + "</h6><br/>";
          mostraFilmes +=
            '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' +
            filmePesquisado[i].id +
            ');">Detalhes</button>';
          mostraFilmes += "<br/><br/>";
          console.log("fimeee 1 id   " + filmePesquisado[i].id);
          mostraFilmes += "</div>";
        } else {
          mostraFilmes +=
            '<img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
            filmePesquisado[i].poster_path +
            '">';

          if (!mostraFilmes == null) {
            mostraFilmes += "<br/><br/>";
            mostraFilmes +=
              '<h6  style="color:red">' +
              filmePesquisado[i].title +
              "</h6><br/>";
            mostraFilmes +=
              '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' +
              filmePesquisado[i].id +
              ');">Detalhes</button>';
            mostraFilmes += "<br/><br/>";
            console.log("fimeee 1 id   " + filmePesquisado[i].id);
            mostraFilmes += "</div>";

            console.log(filmePesquisado[i].title);
          } else {
            // cai aqui
            mostraFilmes += "<br/><br/>";
            mostraFilmes +=
              '<h6  style="color:red">' +
              filmePesquisado[i].title +
              "</h6><br/>";
            mostraFilmes +=
              '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' +
              filmePesquisado[i].id +
              ');">Detalhes</button>';
            mostraFilmes += "<br/><br/>";
            console.log("fimeee 1 id   " + filmePesquisado[i].id);
            mostraFilmes += "</div>";
          }
        }
      }

      document.getElementById("c2").innerHTML = mostraFilmes;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function info(id) {
  sessionStorage.setItem("idmovie", id);
  window.location = "detalhes.html";
}
function video() {
  var aux = "";
  axios
    .get(
      "http://api.themoviedb.org/3/movie/" +
        sessionStorage.getItem("idmovie") +
        "/videos?api_key=5417af578f487448df0d4932bc0cc1a5"
    )
    .then(function (response) {
      console.log("consegui ????" + response.data.results["0"].key);

      aux =
        '<iframe id="player" type="text/html"width="700" height="400"  style = "margin-left: 18px ;" src=http://www.youtube.com/embed/ ' +
        response.data.results["0"].key +
        "?enablejsapi=1&origin=https://www.youtube.com/watch?v=" +
        response.data.results["0"].key +
        'frameborder="0"></iframe>';
    });

  return aux;
}

function exibirFilme() {
  var idFilme = sessionStorage.getItem("idmovie");

  axios
    .all([
      axios.get(
        "https://api.themoviedb.org/3/movie/" +
          idFilme +
          "?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR"
      ),
      axios.get(
        "https://api.themoviedb.org/3/movie/" +
          idFilme +
          "?api_key=5417af578f487448df0d4932bc0cc1a5"
      ),
      axios.get(
        "http://api.themoviedb.org/3/movie/" +
          sessionStorage.getItem("idmovie") +
          "/videos?api_key=5417af578f487448df0d4932bc0cc1a5"
      ),
    ])
    .then(
      axios.spread(function (ResponsePortugues, ResponseIngles, response) {
        console.log("mmmmmmmm  mm" + sessionStorage.getItem("idmovie"));
        console.log("dsaajhjj" + video());
        if (
          ResponsePortugues.data.overview == "" &&
          !ResponseIngles.data.overview == ""
        ) {
          console.log("ingles", ResponseIngles.data);
          var filmeDetalhado = ResponseIngles;

          console.log("  resposta 1   " + filmeDetalhado.data.overview);

          var mostraDetalhes = "";

          mostraDetalhes += "<a> <a/>";
          mostraDetalhes += '<div class="row" >';
          mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
          console.log(
            "capa do filme  " + filmeDetalhado.data.poster_path + "| " + idFilme
          );
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
            filmeDetalhado.data.poster_path +
            '"></li>';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' +
            filmeDetalhado.data.original_title +
            "</li>";
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' +
            filmeDetalhado.data.genres[0].name +
            "</li>";
          mostraDetalhes += "</div>";
          mostraDetalhes += '<div class="col-md-6">';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' +
            filmeDetalhado.data.overview +
            "</li>";
          mostraDetalhes +=
            '<iframe id="player" type="text/html"width="450" height="250"  style = "margin-left: 18px ;" src=http://www.youtube.com/embed/' +
            response.data.results["0"].key +
            "?enablejsapi=1&origin=https://www.youtube.com/watch?v=" +
            response.data.results["0"].key +
            'frameborder="0"></iframe>';
          mostraDetalhes += "</div>";
          mostraDetalhes += "</div>";
          document.getElementById("detalhes").innerHTML = mostraDetalhes;
        } else if (
          !ResponsePortugues.data.overview == "" &&
          ResponseIngles.data.overview == ""
        ) {
          var filmeDetalhado = ResponsePortugues;
          console.log(
            "portugues   resposta 2   ",
            ResponsePortugues.data.overview + "" + ResponsePortugues.data
          );
          var mostraDetalhes = "";

          mostraDetalhes += '<div class="row" >';
          mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
          console.log(
            "capa do filme  " + filmeDetalhado.data.poster_path + "| " + idFilme
          );
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
            filmeDetalhado.data.poster_path +
            '"></li>';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' +
            filmeDetalhado.data.original_title +
            "</li>";

          mostraDetalhes += "</div>";
          mostraDetalhes += '<div class="col-md-6">';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' +
            filmeDetalhado.data.overview +
            "</li>";

          mostraDetalhes +=
            '<iframe id="player" type="text/html"width="450" height="250"  style = "margin-left: 18px ;" src=http://www.youtube.com/embed/' +
            response.data.results["0"].key +
            "?enablejsapi=1&origin=https://www.youtube.com/watch?v=" +
            response.data.results["0"].key +
            'frameborder="0"></iframe>';
          mostraDetalhes += "</div>";
          mostraDetalhes += "</div>";
          document.getElementById("detalhes").innerHTML = mostraDetalhes;
        } else {
          var filmeDetalhado = ResponsePortugues;
          console.log(
            "portugues   resposta 2   ",
            ResponsePortugues.data.overview + "" + ResponsePortugues.data
          );
          var mostraDetalhes = "";

          mostraDetalhes += '<div class="row" >';
          mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
          console.log(
            "capa do filme  " + filmeDetalhado.data.poster_path + "| " + idFilme
          );
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
            filmeDetalhado.data.poster_path +
            '"></li>';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' +
            filmeDetalhado.data.original_title +
            "</li>";
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' +
            filmeDetalhado.data.genres[0].name +
            "</li>";
          mostraDetalhes += "</div>";
          mostraDetalhes += '<div class="col-md-6">';
          mostraDetalhes +=
            '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' +
            filmeDetalhado.data.overview +
            "</li>";
          mostraDetalhes +=
            '<iframe id="player" type="text/html"width="450" height="250"  style = "margin-left: 18px ;" src=http://www.youtube.com/embed/' +
            response.data.results["0"].key +
            "?enablejsapi=1&origin=https://www.youtube.com/watch?v= " +
            response.data.results["0"].key +
            'frameborder="0"></iframe>';
          mostraDetalhes += "</div>";
          mostraDetalhes += "</div>";
          document.getElementById("detalhes").innerHTML = mostraDetalhes;
        }
      })
    )
    .catch(function (error) {
      console.log(error);
    });
}
