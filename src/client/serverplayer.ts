interface ServerPlayer {
    gameListen(callback: Function);
    gameStart(curinga: Carta, cartas: Carta[], callback: Function);
    gameUpdate(cpu_turn);
    gameUpdatePlayer(cpu_turn);
    getPlayAsync() : Promise<any>;
    game;
}

class ServerPlayer1 implements ServerPlayer {
    
    constructor(player) {
        this.player = player;
        this.game = new eventemitter.EventEmitter();
        
        player.server = this.game;         
    }
    
    player : any = null
    game : any = null
    name= 'P1'
    
    gameListen(callback) {
        var talkCallback = callback;
        var that = this;
        
        this.player.game.emit('game_listen', null);
        
        this.game.once('talk', 
            function talk(param) {
                talkCallback(that, param);
            });
    }
    gameStart(curinga: Carta, cartas: Carta[], callback: Function) {
        this.player.game.emit('game_start', { curinga: curinga, cartas: cartas } );

        var talkCallback = callback;
        var that = this;
        
        this.player.game.emit('game_start_listen', null);

        this.game.on('talk', talk);
                    
        function talk(param) {
            talkCallback(that, param);
        }
    }
    gameUpdate(cpu_turn) {
        this.player.game.emit('game_update', cpu_turn);
    }
    gameUpdatePlayer(cpu_turn) {
        this.player.game.emit('game_update', { cmd: 'play', carta: cpu_turn});
    }
    
    getPlayAsync() : Promise<any>  {
        return new Promise<any>( (resolve, reject) => {
            this.player.game.emit('wait_play');
            
            this.game.on('play', play);
            
            function play(param) {
                var carta = param.carta;
                resolve(carta);
            };
            
        });             
    }
    
}

class ServerPlayerCPU implements ServerPlayer {
    name= 'CPU'
    gameStart(curinga: Carta, cartas: Carta[], callback: Function) { 
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

