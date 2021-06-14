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
function voltar() {
  buscarFilmes(sessionStorage.idfilme);
  location.href = "index.html";
}
function info(id) {
  sessionStorage.setItem("idmovie", id);
  window.location = "detalhes.html";
}
function lancamentos() {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=5417af578f487448df0d4932bc0cc1a5&region=BR"
    )
    .then((response) => {
      var mostraLancamentos = "";
      var i = 0;
      var aux = "";
      mostraLancamentos +=
        "<div>" +
        "<h1 '> LANÇAMENTOS <h1>" +
        '<div data-interval="1500" id="carouselSite" class="carousel slide" data-ride="carousel">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#carouselSite" data-slide-to="0" class="active"></li>' +
        '<li data-target="#carouselSite" data-slide-to="1"></li>' +
        '<li data-target="#carouselSite" data-slide-to="3"></li>' +
        '<li data-target="#carouselSite" data-slide-to="4"></li>' +
        '<li data-target="#carouselSite" data-slide-to="5"></li>' +
        '<li data-target="#carouselSite" data-slide-to="6"></li>' +
        '<li data-target="#carouselSite" data-slide-to="7"></li>' +
        "</ol>" +
        '<div class="carousel-inner">';
      mostraLancamentos +=
        '<div class="carousel-item  active">' +
        '<img class="img-fluid d-block" width="700px" src="https://image.tmdb.org/t/p/w300/' +
        response.data.results[i].backdrop_path +
        '"/>' +
        ' <div class="carousel-caption">' +
        "<h1 style ='color:red ; text-shadow: 10px 10px 20px #87F , 10px 10px 20px #0000FF," +
        " 0 0 20px #87F" +
        ";  font-weight: bolder'>" +
        response.data.results[i].original_title +
        "</h1>" +
        "</div>" +
        "</div>";
      aux += response.data.results[i].original_title;
      for (i = 1; i < response.data.results.length; i++) {
        if (response.data.results[i].backdrop_path !== null) {
          mostraLancamentos +=
            '<div class="carousel-item  ">' +
            '<img class="img-fluid d-block" width="700px" src="https://image.tmdb.org/t/p/w300/' +
            response.data.results[i].backdrop_path +
            '"/>' +
            ' <div class="carousel-caption">' +
            "<h1 style ='color:red ; text-shadow: 10px 10px 20px #87F , 10px 10px 20px #0000FF," +
            " 0 0 20px #87F" +
            "' ;  font-weight: bolder>" +
            response.data.results[i].original_title +
            "</h1>" +
            " </div>" +
            "</div>";

          aux += "\n" + response.data.results[i].original_title;
        }
      }
      console.log("titulo " + aux);
      mostraLancamentos +=
        "</div>" +
        '<a class="carousel-control-prev"  href="#carouselSite" role="button" data-slide="prev">' +
        '<span class="carousel-control-prev-icon" > </span>' +
        '<span class="sr-only"> anterior </span>' +
        "</a>" +
        '<a class="carousel-control-next"  href="#carouselSite" role="button" data-slide="next">' +
        '<span class="carousel-control-next-icon">  </span>' +
        '<span class="sr-only"> proximo </span>' +
        "</a>" +
        "</div>" +
        "</div>";
      document.getElementById("c2").innerHTML = mostraLancamentos;

      /* mostraLancamentos +=
        '<div class="col-md-4"> <img class="img-thumbnail" width="450px"src="https://image.tmdb.org/t/p/w300/' +
        response.data.results["0"].backdrop_path +
        '"/> </div>';*/

      console.log(
        mostraLancamentos +
          "lançamentos " +
          "  " +
          response.data.results.length +
          a
      );
    });
}

function buscarFilmes(filme) {
  // console.log("filme escolhido " + filme);

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
            '<img onclick="info(' +
            filmePesquisado[i].id +
            ') "  class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
            filmePesquisado[i].poster_path +
            '"/>';

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
      document.getElementById("c2").innerHTML = "<h1> erro de requisição </h1>";
      console.log(error);
    });
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
        //   console.log("mmmmmmmm  mm" + sessionStorage.getItem("idmovie"));
        if (
          ResponsePortugues.data.overview == "" &&
          !ResponseIngles.data.overview == ""
        ) {
          console.log("ingles", ResponseIngles.data);
          var filmeDetalhado = ResponseIngles;
          var mostraDetalhes = "";

          mostraDetalhes += "<a> <a/>";
          mostraDetalhes += '<div class="row" >';
          mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
          /*  console.log(
            "capa do filme  " + filmeDetalhado.data.poster_path + "| " + idFilme
          );*/
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
          /* console.log(
            "portugues   resposta 2   ",
            ResponsePortugues.data.overview + "" + ResponsePortugues.data
          );*/
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

          mostraDetalhes += aux =
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
        ])
        .then(
          axios.spread(function (ResponsePortugues, ResponseIngles) {
            var filmeDetalhado = ResponseIngles;
            if (
              ResponsePortugues.data.overview == "" &&
              !ResponseIngles.data.overview == ""
            ) {
              var mostraDetalhes = "";
              mostraDetalhes += '<div class="row" >';
              mostraDetalhes +=
                '<div class="col-md-6" ><ul class="list-group" >';
              console.log(
                "capa do filme  " +
                  filmeDetalhado.data.poster_path +
                  "| " +
                  idFilme
              );
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
                filmeDetalhado.data.poster_path +
                '"></li>';
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' +
                filmeDetalhado.data.original_title +
                "</li>";
              console.log(
                "entrou no else 2" + "" + filmeDetalhado.data.genres[0]
              );
              if (filmeDetalhado.data.genres[0] !== undefined) {
                console.log("entrou no else 2" + filmeDetalhado.data.genres[0]);
                mostraDetalhes +=
                  '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' +
                  filmeDetalhado.data.genres[0].name +
                  "</li>";
              }

              mostraDetalhes += "</div>";
              mostraDetalhes += '<div class="col-md-6">';
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' +
                filmeDetalhado.data.overview +
                "</li>";

              mostraDetalhes +=
                ' <img style="width: 450px ;  height=250 ; margin-left: 18px"  src="../img-outros elementos/erro video.jpg" />';
              console.log("entrou no if");
              mostraDetalhes += "</div>";
              mostraDetalhes += "</div>";
              document.getElementById("detalhes").innerHTML = mostraDetalhes;
            } else if (
              !ResponsePortugues.data.overview == "" &&
              ResponseIngles.data.overview == ""
            ) {
              var filmeDetalhado = ResponsePortugues;
              var mostraDetalhes = "";
              mostraDetalhes += '<div class="row" >';
              mostraDetalhes +=
                '<div class="col-md-6" ><ul class="list-group" >';
              console.log(
                "capa do filme  " +
                  filmeDetalhado.data.poster_path +
                  "| " +
                  idFilme
              );
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' +
                filmeDetalhado.data.poster_path +
                '"></li>';
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' +
                filmeDetalhado.data.original_title +
                "</li>";
              console.log("entrou no else 1");
              if (filmeDetalhado.data.genres[0] !== undefined) {
                console.log("entrou no else 2");
                mostraDetalhes +=
                  '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' +
                  filmeDetalhado.data.genres[0].name +
                  "</li>";
              }
              mostraDetalhes += "</div>";
              mostraDetalhes += '<div class="col-md-6">';
              mostraDetalhes +=
                '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' +
                filmeDetalhado.data.overview +
                "</li>";

              mostraDetalhes +=
                ' <img style="width: 450px ;  height=250 ; margin-left: 18px"  src="../img-outros elementos/erro video.jpg" />';

              mostraDetalhes += "</div>";
              mostraDetalhes += "</div>";
              document.getElementById("detalhes").innerHTML = mostraDetalhes;
            }
          })
        );

      console.log(error);
    });
}
