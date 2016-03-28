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

    play() {       
         
        var rodada = 0;
        var j1 = 0;
        var j2 = 0;
        var win1 : ServerPlayer = null ;
        var resultado;

        var multiplas_rodada = fn_loop_rodadas.bind(this);

        multiplas_rodada();
                                
        function fn_loop_rodadas() {
            this.turn().then(function(result : any) {
                // determina quem ganhou a rodada
                var winner = result.winner; 

                // guarda quem ganhou a primeira rodada
                if( rodada == 0 && winner != null) {
                    win1 = winner;
                }
                
                // marca os pontos
                if(winner == p1)     j1++;        
                if(winner == pcpu)   j2++;
                
                if(winner == null) {
                    // caso tenha sido empate, vai para o desempate
                    if(j1 == j2) {
                        j1++;
                        j2++;
                    }

                    // se ganhar a primeira, mas empatar depois... entao e ganhador.
                    if( win1 != null ) {
                        j1 = ( win1 == p1 )   ? 2 : 1;
                        j2 = ( win1 == pcpu ) ? 2 : 1;                    
                    }
                }            
                
                // alert('placar: ' + JSON.stringify({ p1: j1, pcpu: j2 }) );
                
                if( 
                    (( j1 == 2 || j2 == 2 ) && ( j1 != j2 )) || // ha vencedor
                    ( j1 == 3 && j2 == 3) // empate no final
                )
                {
                    var winner = null;
                    
                    if ( j1 != j2 ) {
                        winner = (j1 > j2) ? p1 : pcpu;
                    }
                    resultado = { p1: j1, pcpu: j2, winner: winner };
                    alert('FINAL ' + JSON.stringify(resultado));
                }
                else {
                    rodada ++;
                    multiplas_rodada();
                }            
                
            });            
        }
                
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
                        
                        var winner = this.showWinner(turn, turn2);
                        
                        ( winner != null && p2 == winner ) && this.swapPlayers();                            
                        
                        return { m: m, p1: turn, p2: turn2, winner: winner };    
                    });
            })
    }
    
    swapPlayers() {
        var swp = this.p1;
        this.p1 = this.p2;
        this.p2 = swp;    
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
        cartas: [{ num: 6, tipo: 1 },{ num: 5, tipo: 2 },{ num: 7, tipo: 3 }]};

    var game = new Game(p1, pcpu);
    
    setTimeout(function() {
        
        game.start(game_start_event);
        game.play();
                
    } , 10);

});

