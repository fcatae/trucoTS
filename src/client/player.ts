var selectionarCarta: Function;
var depositarCarta: Function;

var p = player1;

p.game.on('game_start', function(param) {
    var curinga = param.curinga;
    var carta1 = param.cartas[0];
    var carta2 = param.cartas[1];
    var carta3 = param.cartas[2];        
    
    selectionarCarta('m', curinga);
    selectionarCarta('p1', carta1);
    selectionarCarta('p2', carta2);
    selectionarCarta('p3', carta3);

    selectionarCarta('c1', {num: -1, tipo: -1});
    selectionarCarta('c2', {num: -1, tipo: -1});
    selectionarCarta('c3', {num: -1, tipo: -1});    
    
});

var cpu = {
    jogada: 0    
};

p.game.on('game_update', function(comando) {
    
    if(comando.cmd == 'play') {
        var elements = ['c1','c2','c3'];
        
        var jogada = elements[cpu.jogada++];
        var carta = comando.carta;
        
        selectionarCarta(jogada, carta);
        depositarCarta(jogada);

    }
});

p.game.on('wait_play', function() {
    p.playable = true;
    //alert('esperando sua jogada!!!')        
});
