interface ServerPlayer {
    gameStart(game_start_event);
    gameUpdate(cpu_turn);
    getPlayAsync() : Promise<any>;
}

class ServerPlayer1 implements ServerPlayer {
    gameStart(game_start_event) {
        player1.game.emit('game_start', game_start_event);
    }
    gameUpdate(cpu_turn) {
        player1.game.emit('game_update', cpu_turn);
    }
    getPlayAsync() : Promise<any>  {
        return new Promise<any>(function(resolve, reject) {
            player1.game.emit('wait_play', resolve);
        });             
    }
}
class ServerPlayerCPU implements ServerPlayer {
    gameStart(game_start_event) {
    }
    gameUpdate(cpu_turn) {    
    }
    getPlayAsync() : Promise<any> {
        return playerCPU.getPlayAsync(1000);
    }    
}

var p1 = new ServerPlayer1();
var pcpu = new ServerPlayerCPU();

var $: any;
$(document).ready(function() {

    var game_start_event = { curinga: { num: 1, tipo: 0 },
        cartas: [{ num: 1, tipo: 1 },{ num: 3, tipo: 2 },{ num: 4, tipo: 3 }]};

    setTimeout(function() {
        p1.gameStart(game_start_event);
        pcpu.gameStart(game_start_event);
        
        // jogada do computador
        pcpu.getPlayAsync()
            .then(function(cpu_turn) {
                p1.gameUpdate(cpu_turn);
                p1.getPlayAsync();
            });
                  
        pcpu.getPlayAsync()
            .then(function(cpu_turn) {
                p1.gameUpdate(cpu_turn);
                p1.getPlayAsync();
            });
            
        pcpu.getPlayAsync()
            .then(function(cpu_turn) {
                p1.gameUpdate(cpu_turn);
                p1.getPlayAsync();
            });

    } , 10);
     
     
    function iniciar_rodada(p1: ServerPlayer, p2: ServerPlayer) {
        p1.getPlayAsync();
    } 
});

