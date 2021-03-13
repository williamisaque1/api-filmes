document.getElementById('form').addEventListener('submit', pesquisarFilmes);

function pesquisarFilmes(e) {
	var filme = document.getElementById("filme").value;
	buscarFilmes(filme);
	console.log('filme  ' + filme)
	e.preventDefault();

}

function buscarFilmes(filme) {
	console.log('filme escolhido ' + filme)

	axios.get('https://api.themoviedb.org/3/search/movie?api_key=5417af578f487448df0d4932bc0cc1a5&query=' + filme + '&language=pt-BR').then(function (response) {
		console.log(response);
		var filmePesquisado = response.data.results;
		var mostraFilmes = '';
		console.log(filmePesquisado);

		for (var i = 0; i < filmePesquisado.length; i++) {
			mostraFilmes += '<div class="col-md-4">';
			if (filmePesquisado[i].poster_path == null) {
				mostraFilmes += '<img class="img-thumbnail"  src="/img-outros elementos/erro.jpg ">';
				mostraFilmes += '<br/><br/>';
				mostraFilmes += '<h6  style="color:red">' + filmePesquisado[i].title + '</h6><br/>';
				mostraFilmes += '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' + filmePesquisado[i].id + ');">Detalhes</button>';
				mostraFilmes += '<br/><br/>';
				console.log('fimeee 1 id   ' + filmePesquisado[i].id)
				mostraFilmes += '</div>';
			} else{
				

				mostraFilmes += '<img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' + filmePesquisado[i].poster_path + '">';
		

			if (!mostraFilmes == null) {


				mostraFilmes += '<br/><br/>';
				mostraFilmes += '<h6  style="color:red">' + filmePesquisado[i].title + '</h6><br/>';
				mostraFilmes += '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' + filmePesquisado[i].id + ');">Detalhes</button>';
				mostraFilmes += '<br/><br/>';
				console.log('fimeee 1 id   ' + filmePesquisado[i].id)
				mostraFilmes += '</div>';

				console.log(filmePesquisado[i].title);
			} else {

				mostraFilmes += '<br/><br/>';
				mostraFilmes += '<h6  style="color:red">' + filmePesquisado[i].title + '</h6><br/>';
				mostraFilmes += '<button type="button" class="btn btn-primary" id="detalhes"   style="background-color: red; color:black;font-weight: bold;" onclick="info(' + filmePesquisado[i].id + ');">Detalhes</button>';
				mostraFilmes += '<br/><br/>';
				console.log('fimeee 1 id   ' + filmePesquisado[i].id)
				mostraFilmes += '</div>';
			}
		}
	
	}


document.getElementById('c2').innerHTML = mostraFilmes;
	}).catch (function (error) {
	console.log(error);
});
}

function info(id) {


	sessionStorage.setItem('idFilme', id);
	window.location = 'detalhes.html';
	return false;
}

function exibirFilme() {
	var idFilme = sessionStorage.getItem('idFilme');
	axios.all([
		axios.get('https://api.themoviedb.org/3/movie/' + idFilme + '?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR'),
		axios.get('https://api.themoviedb.org/3/movie/' + idFilme + '?api_key=5417af578f487448df0d4932bc0cc1a5')
	])
		.then(axios.spread(function (ResponsePortugues, ResponseIngles) {
			if (ResponsePortugues.data.overview == '' && !ResponseIngles.data.overview == '') {
				console.log('ingles', ResponseIngles.data);
				var filmeDetalhado = ResponseIngles;

				console.log("  resposta 1   " + filmeDetalhado.data.overview);

				var mostraDetalhes = '';
				mostraDetalhes += '<a href="index.html"><img style="width:50px" src="/img-outros elementos/botao voltar.svg" alt="" ></a>';
				mostraDetalhes += '<a> <a/>'
				mostraDetalhes += '<div class="row" >';
				mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
				console.log('capa do filme  ' + filmeDetalhado.data.poster_path + '| ' + idFilme)
				mostraDetalhes += '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' + filmeDetalhado.data.poster_path + '"></li>';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' + filmeDetalhado.data.original_title + '</li>';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' + filmeDetalhado.data.genres[0].name + '</li>';
				mostraDetalhes += '</div>';
				mostraDetalhes += '<div class="col-md-6">';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' + filmeDetalhado.data.overview + '</li>';
				mostraDetalhes += '</div>';
				mostraDetalhes += '</div>';
				document.getElementById('detalhes').innerHTML = mostraDetalhes;
			} else if (!ResponsePortugues.data.overview == '' && ResponseIngles.data.overview == "") {
				var filmeDetalhado = ResponsePortugues;
				console.log('portugues   resposta 2   ', ResponsePortugues.data.overview + '' + ResponsePortugues.data);
				var mostraDetalhes = '';
				mostraDetalhes += '<a href="index.html"><img style="width:50px" src="/img-outros elementos/botao voltar.svg" alt="" ></a>';
				mostraDetalhes += '<div class="row" >';
				mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
				console.log('capa do filme  ' + filmeDetalhado.data.poster_path + '| ' + idFilme)
				mostraDetalhes += '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' + filmeDetalhado.data.poster_path + '"></li>';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' + filmeDetalhado.data.original_title + '</li>';

				mostraDetalhes += '</div>';
				mostraDetalhes += '<div class="col-md-6">';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' + filmeDetalhado.data.overview + '</li>';
				mostraDetalhes += '</div>';
				mostraDetalhes += '</div>';
				document.getElementById('detalhes').innerHTML = mostraDetalhes;
			} else {

				var filmeDetalhado = ResponsePortugues;
				console.log('portugues   resposta 2   ', ResponsePortugues.data.overview + '' + ResponsePortugues.data);
				var mostraDetalhes = '';
				mostraDetalhes += '<a href="index.html"><img style="width:50px" src="/img-outros elementos/botao voltar.svg" alt="" ></a>';
				mostraDetalhes += '<div class="row" >';
				mostraDetalhes += '<div class="col-md-6" ><ul class="list-group" >';
				console.log('capa do filme  ' + filmeDetalhado.data.poster_path + '| ' + idFilme)
				mostraDetalhes += '<li class="list-group-item" style="background-color: black;"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/' + filmeDetalhado.data.poster_path + '"></li>';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Título: ' + filmeDetalhado.data.original_title + '</li>';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Gênero: ' + filmeDetalhado.data.genres[0].name + '</li>';
				mostraDetalhes += '</div>';
				mostraDetalhes += '<div class="col-md-6">';
				mostraDetalhes += '<li class="list-group-item" style="background-color: black ; color:red;">Sinopse: ' + filmeDetalhado.data.overview + '</li>';
				mostraDetalhes += '</div>';
				mostraDetalhes += '</div>';
				document.getElementById('detalhes').innerHTML = mostraDetalhes;
			}
		})).catch(function (error) {
			console.log(error);
		})
};







