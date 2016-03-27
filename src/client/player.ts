var p = player1;

p.game.on('game_start', function(param) {
    var curinga = param.curinga;
    var carta1 = param.cartas[0];
    var carta2 = param.cartas[1];
    var carta3 = param.cartas[2];        
});

p.game.on('game_update', function() {
    alert('jogada do computador')    
});

p.game.on('wait_play', function() {
    alert('esperando sua jogada!!!')        
});
