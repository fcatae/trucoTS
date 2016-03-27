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
    
    var c1 = num_array[num];
    var c2 = '_of_';
    var c3 = tipo_array[num];
    var c4 = '.png';
    
    return c1+c2+c3+c4;
}
 
function selectionarCarta() {
    
}