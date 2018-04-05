// --------------------
//    Algoritmo OTP
// --------------------
// https://www.youtube.com/watch?v=YoLl85Oo9GI
let msg = document.getElementById('mensagem')
let chave = document.getElementById('chave')
let textoCifrado = document.getElementById('cripto')


// adiciona funcao de criptografar ao botao
document.getElementById('criptografar').addEventListener('click', cripto);
document.getElementById('descriptografar').addEventListener('click', descripto);
// adiciona contadores de caracteres
msg.addEventListener('input', atualizaTamanhoMensagem)
chave.addEventListener('input', atualizaTamanhoChave)


//----------- funcoes -----------

// --- funcoes principais

// essa funcao pega o valor da mensagem e chave, transforma em ascII, depois em binario
// faz um xor entre as duas, depois transforma em ascii para depois retornar os caracteres correspondentes
function cripto(){
	let msgChaveHasSameLength = mensagem.value.length == chave.value.length
	if (msgChaveHasSameLength) {
		// array para transformar os caracteres da string em bin e asc separadamente
		let mensagemArray = msg.value.split('');
		let chaveArray = chave.value.split('');

		// transforma o input e output em asc e depois em binario	
		arrayTextoParaBin(mensagemArray, mensagemBin = []);
		arrayTextoParaBin(chaveArray, chaveBin = []);

		// tem que dar um join e split para juntar o array de binarios em um array so, depois gerar o cifrado, que ira
		// retornar um array e depois juntar para colocar no campo de texto
		document.getElementById('cripto').value = xor(joinESplit(chaveBin), joinESplit(mensagemBin)).join('');
	}
	else{ window.alert('o tamanho da chave deve ser o mesmo da mensagem'); }	
}

// essa funcao faz o processo reverso da cripto
function descripto(){
	let cypherTextEmpty = !textoCifrado.value.length > 0
	if (cypherTextEmpty) {
		document.querySelector('.conteudo').append("Cypher text has no value")	
		throw 'Texto tem que ser gerado'
	}

	let cifradoArray = textoCifrado.value.split('');
	let chaveArray = chave.value.split('');

	// transforma o input e output em asc e depois em binario	
	arrayTextoParaBin(cifradoArray, cifradoBin = []);
	arrayTextoParaBin(chaveArray, chaveBin = []);

	document.getElementById("descripto").value = xor(joinESplit(chaveBin), joinESplit(cifradoBin)).join('');
}

// --- funcoes auxiliares logicas

// faz o xor para criptografar ou descriptografar
function xor(binarioUm, binarioDois){
	let auxCifrado = [];
	let cifrado =[];
	let bin = [];
	
	binarioUm.map((e, i) => {
		if ( i % 7 == 0 && i != 0){
			bin.splice(0,7,ascParaTexto(binarioParaAscii(bin.join(''))));
			cifrado.push(auxCifrado.concat(bin));
			bin = []
		}
		bin.push(binarioUm[i] ^ binarioDois[i]);	
	})
	return cifrado;
}

// funcao que converte array de caracteres em array de binario
function arrayTextoParaBin(vetorInput, vetorOutput){
	vetorInput.map((e, i) => {
		var bin = asciiParaBinario(textoParaAscii(e));
		bin.length < 7 
			? vetorOutput.push('0'.repeat( 7 - bin.length ) + bin)
			: vetorOutput.push(bin);
	})
}

// Fiz para poder separar os arrays de binarios e transformar em um so
function joinESplit(vetor){
	var aux = vetor.join('');		
	return aux.split('');
}

// --- funcoes auxiliares de conversao

// converte char para ascII
function textoParaAscii(texto){ return texto.charCodeAt(0);	}

// converte o codigo ascII em numero binário
function asciiParaBinario(asc){ return (asc >>> 0).toString(2);	}

// converte binario para asc
function binarioParaAscii(bin){ return parseInt(bin, 2); }

// converte asc para texto
function ascParaTexto(asc){	return String.fromCharCode(asc); }

// --- funcoes complementares - atualizam tamanho da frase
function atualizaTamanhoMensagem(){
	var tamanhoMsg = document.getElementById('mensagem').value.split('');
	document.getElementById('tamanho-mensagem').textContent = tamanhoMsg.length
}

function atualizaTamanhoChave(){
	var tamanhoChave = document.getElementById('chave').value.split('');
	document.getElementById('tamanho-chave').textContent = tamanhoChave.length
}

