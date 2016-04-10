var mapaCartas = {};
 
function allowDrop(ev) {
     if( player1.playable ) {
         ev.preventDefault();
     }
 }
 
function drag(ev) {
     ev.dataTransfer.setData("text", ev.target.id);
}
 
function drop(ev) {
     ev.preventDefault();
     var elemId = ev.dataTransfer.getData("text");

     depositarCarta(elemId);
     player1.play(mapaCartas[elemId]);
}

function selecionaImagem(num, tipo) {
    var num_array = ['4', '5', '6', '7', 'queen', 'jack', 'king', 'ace', '2', '3'];
    var tipo_array = ['diamonds', 'spades', 'hearts', 'clubs'];
    
    if( num<0 || tipo<0 ) {
        return "images/backside.png";
    }
    
    var c0 = 'images/';
    var c1 = num_array[num];
    var c2 = '_of_';
    var c3 = tipo_array[tipo];
    var c4 = '.png';
    
    return c0+c1+c2+c3+c4;
}

function selectionarCarta(name, carta) {
    
    var elem = document.getElementById(name);
    var imagem;
        
    if(carta != null) {
        var num = carta.num;
        var tipo = carta.tipo;
        imagem = selecionaImagem(num, tipo);
        mapaCartas[name] = { num: num, tipo: tipo };
    }
    else {
        imagem = "";
        mapaCartas[name] = null;
    }
    elem.src = imagem;
}

function depositarCarta(id) {
    var drop = document.querySelector('.drop');
    var carta = document.getElementById(id);
     
    drop.appendChild(carta);
}

function showMessage(text) {
    var messageBoard = document.querySelector('.message-board');
    var msg = document.createElement('div');
    msg.className = 'message';
    msg.textContent = text || '';
    
    messageBoard.appendChild(msg);
}

$(document).ready(function() {
    $('.truco-talk').click(function(ev) {
        player1.talk(ev.target.value);
    })    
});
