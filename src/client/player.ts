var selectionarCarta: Function;
var depositarCarta: Function;
var eventemitter : any;

class PlayerClient {
    
    playable = false;
    promiseResolve: Function;
    server: any;
    
    game = new eventemitter.EventEmitter();
    
    talk(msg) {
        this.server.emit('talk', msg);
    }
    
    waitPlayer() {
        this.playable = true;
    }
    
    play(carta: Carta) {
        // done
        this.playable = false;
        this.server.emit('play', { cmd: 'play', carta: carta });
    }
        
    giveUp() {
        this.playable = false;
        this.server.emit('play', { cmd: 'play', carta: null });
    }
}

var player1 = new PlayerClient();

var p = player1;

player1.game.on('game_start', function(param) {
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

var cpu = { jogada: 0 };

player1.game.on('game_update', function(comando) {
    
    if(comando.cmd == 'play') {
        var elements = ['c1','c2','c3'];
        
        var jogada = elements[cpu.jogada++];
        var carta = comando.carta;
        
        selectionarCarta(jogada, carta);
        depositarCarta(jogada);

    }
});

player1.game.on('game_end', function(winner) {
    showMessage('Winner: ' + winner);
});

player1.game.on('game_talk', function(text) {
    showMessage('Message: ' + text);
});

player1.game.on('wait_play', function() {
    showMessage('Your turn');
    player1.waitPlayer();
});
