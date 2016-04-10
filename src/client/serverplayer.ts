interface ServerPlayer {
    gameListen(callback: Function);
    gameStart(curinga: Carta, cartas: Carta[]);
    gameUpdate(cpu_turn);
    gameUpdatePlayer(cpu_turn);
    getPlayAsync() : Promise<any>;
}

class ServerPlayer1 implements ServerPlayer {
    name= 'P1'
    gameListen(callback) {
        var talkCallback = callback;
        var that = this;
        
        player1.game.emit('game_listen', talk);
        
        function talk(param) {
            talkCallback(that, param);
        }
    }
    gameStart(curinga: Carta, cartas: Carta[]) {
        player1.game.emit('game_start', { curinga: curinga, cartas: cartas } );
    }
    gameUpdate(cpu_turn) {
        player1.game.emit('game_update', cpu_turn);
    }
    gameUpdatePlayer(cpu_turn) {
        player1.game.emit('game_update', { cmd: 'play', carta: cpu_turn});
    }
    
    getPlayAsync() : Promise<any>  {
        return new Promise<any>(function(resolve, reject) {
            player1.game.emit('wait_play', resolve);
        });             
    }
}
class ServerPlayerCPU implements ServerPlayer {
    name= 'CPU'
    gameStart(curinga: Carta, cartas: Carta[]) { 
        playerCPU.start(curinga, cartas);       
    }
    gameUpdate(cpu_turn) {    
    }
    gameUpdatePlayer(cpu_turn) {        
    }
    getPlayAsync() : Promise<any> {
        return playerCPU.getPlayAsync(1000);
    }    
    gameListen(callback) {
    }    
}

var p1 = new ServerPlayer1();
var pcpu = new ServerPlayerCPU();
