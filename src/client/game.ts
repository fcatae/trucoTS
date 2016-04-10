enum GameState { inicio, p1, p2, turn, fim };

class Game {
    
    m: Carta;
    p1: ServerPlayer;
    p2: ServerPlayer;
    manilha: number;
    
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    
    start(baralho) {        
        this.defineManilha(baralho);
        this.p1.gameStart(baralho.curinga, baralho.p1);
        this.p2.gameStart(baralho.curinga, baralho.p2);
        
        this.updateState(GameState.inicio);             
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
            this.turn().then( (result : any) => {
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

                    this.updateState(GameState.fim);
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
        
        this.updateState(GameState.p1, p1);
        
        return p1.getPlayAsync()
            .then( (turn) => {
                p2.gameUpdatePlayer(turn);
                
                this.updateState(GameState.p2, p2);
                
                return p2.getPlayAsync()
                    .then( (turn2) => {
                        p1.gameUpdatePlayer(turn2);
                        
                        var winner = this.showWinner(turn, turn2);
                        
                        this.updateState(GameState.turn, winner);
                        
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
    
    private updateState(state: GameState, param?) {
        showMessage(GameState[state]);
    }
}

var showMessage: Function;

var $: any;
$(document).ready(function() {

    var game_start_event = { curinga: { num: 1, tipo: 0 },
        p1: [{ num: 6, tipo: 1 },{ num: 5, tipo: 2 },{ num: 7, tipo: 3 }],
        p2: [{ num: 6, tipo: 1 },{ num: 5, tipo: 2 },{ num: 7, tipo: 3 }]
    };

    var baralho = new Baralho();
    var game = new Game(p1, pcpu);
    
    setTimeout(function() {

        var cartas = baralho.distribuir();         
        game.start(cartas);
        game.play();
                
    } , 10);

});

