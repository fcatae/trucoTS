interface ServerPlayer {
    gameStart(game_start_event);
    gameUpdate(cpu_turn);
    gameUpdatePlayer(cpu_turn);
    getPlayAsync() : Promise<any>;
}

class ServerPlayer1 implements ServerPlayer {
    name= 'P1'
    gameStart(game_start_event) {
        player1.game.emit('game_start', game_start_event);
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
    gameStart(game_start_event) {
    }
    gameUpdate(cpu_turn) {    
    }
    gameUpdatePlayer(cpu_turn) {        
    }
    getPlayAsync() : Promise<any> {
        return playerCPU.getPlayAsync(1000);
    }    
}

var p1 = new ServerPlayer1();
var pcpu = new ServerPlayerCPU();

class Game {
    
    m: Carta;
    p1: ServerPlayer;
    p2: ServerPlayer;
    manilha: number;
    
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    
    start(game_start_event) {
        this.defineManilha(game_start_event);
        this.p1.gameStart(game_start_event);
        this.p2.gameStart(game_start_event);             
    }
    
    private defineManilha(game_start_event) {
        this.m = game_start_event.curinga;
        this.manilha = (game_start_event.curinga.num + 1) % 10;
    }
    swapPlayers() {
        var swp = this.p1;
        this.p1 = this.p2;
        this.p2 = swp;    
    }
    
    turn() : Promise<{}> {
        var p1 = this.p1;
        var p2 = this.p2;
        var m = this.m;
        
        return p1.getPlayAsync()
            .then( (turn) => {
                p2.gameUpdatePlayer(turn);
                
                return p2
                    .getPlayAsync()
                    .then( (turn2) => {
                        p1.gameUpdatePlayer(turn2);
                        return { m: m, p1: turn, p2: turn2, winner: this.showWinner(turn, turn2) };    
                    });
            })
    }
    
    private calculaPontos(carta: Carta) {
        if(carta.num == this.manilha) {
            return 100 + carta.tipo;
        }        
        return carta.num;
    }
    
    private showWinner(turn1, turn2) {
        var pontos1 = this.calculaPontos(turn1);
        var pontos2 = this.calculaPontos(turn2);
        
        if( pontos1 == pontos2 ) return null;
        
        return (pontos1 > pontos2) ? this.p1 : this.p2;
    }
    
}

var $: any;
$(document).ready(function() {

    var game_start_event = { curinga: { num: 1, tipo: 0 },
        cartas: [{ num: 2, tipo: 1 },{ num: 3, tipo: 2 },{ num: 8, tipo: 3 }]};

    var game = new Game(p1, pcpu);
    
    setTimeout(function() {
        
        game.start(game_start_event);

        game.swapPlayers();
        
        game.turn()
            .then(function(result){
                
                alert(JSON.stringify(result))
                
                alert('rodada 2')
                game.turn()
                    .then(function() {
                        alert('rodada 3')
                        game.turn();
                    })
            });        

    } , 10);
     
     
    function iniciar_rodada(p1: ServerPlayer, p2: ServerPlayer) {
        p1.getPlayAsync();
    } 
});

