$(document).ready(function() {

    // selectionarCarta('p1', {num: 0, tipo: 1});
    // selectionarCarta('p2', {num: 3, tipo: 2});
    // selectionarCarta('p3', {num: 8, tipo: 3});

    // selectionarCarta('m', {num: 7, tipo: 1});
    
    
});
  
function allowDrop(ev) {
     ev.preventDefault();
 }
 
function drag(ev) {
     ev.dataTransfer.setData("text", ev.target.id);
}
 
function drop(ev) {
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     ev.target.appendChild(document.getElementById(data));
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
    }
    else {
        imagem = "";
    }
    elem.src = imagem;
}
