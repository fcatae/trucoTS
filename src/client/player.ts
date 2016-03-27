var p = player1;

p.game.on('game_start', function() {
    alert('comecou o jogo!!!')    
});

p.game.on('game_update', function() {
    alert('jogada do computador')    
});

p.game.on('wait_play', function() {
    alert('esperando sua jogada!!!')        
});
