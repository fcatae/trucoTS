var $: any;
$(document).ready(function() {

    var game_start_event = { curinga: { num: 1, tipo: 0 },
        cartas: [{ num: 1, tipo: 1 },{ num: 3, tipo: 2 },{ num: 4, tipo: 3 }]};

    setTimeout(function() {
        player1.game.emit('game_start', game_start_event);

        playerCPU.getPlayAsync(100)
            .then(function(cpu_turn) {
            player1.game.emit('game_update', cpu_turn);
            player1.game.emit('wait_play');
            })
            
        playerCPU.getPlayAsync(5000)
            .then(function(cpu_turn) {
            player1.game.emit('game_update', cpu_turn);
            player1.game.emit('wait_play');
            })
            
        playerCPU.getPlayAsync(10000)
            .then(function(cpu_turn) {
            player1.game.emit('game_update', cpu_turn);
            player1.game.emit('wait_play');
            })

    } , 10);
     
});

