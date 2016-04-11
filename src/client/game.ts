enum GameState { inicio, p1, p2, truco, truco_aceito, turn, giveup, fim };

class Game {
    
    m: Carta;
    initial_p1: ServerPlayer;
    initial_p2: ServerPlayer;
    p1: ServerPlayer;
    p2: ServerPlayer;
    manilha: number;
    gameFinished = false;
    
    lastTalkPlayer: string;
    lastTrucoOutstanding = false;
    lastTrucoBasePoints = 0;
    
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.initial_p1 = p1;
        this.initial_p2 = p2;
    }
    
    start(baralho) {        
        this.defineManilha(baralho);
        this.p1.gameStart(baralho.curinga, baralho.p1, this.listen.bind(this) );
        this.p2.gameStart(baralho.curinga, baralho.p2, this.listen.bind(this) );
        
        this.updateState(GameState.inicio);
    }
   
   listen(player, text) {       
       if( this.gameFinished ) 
            return;
       
       // ignore if it is the same player
       if( player.name == this.lastTalkPlayer ) {
           return;
       }

       if( text == 'truco' && this.lastTrucoBasePoints<12 ) {
           
           if( this.lastTrucoOutstanding == false || this.lastTrucoBasePoints<9 ) {
               this.update_truco_state(player);
               this.truco(player);    
           }           
       }
           
       if( text == 'truco_aceito' && this.lastTalkPlayer != null ) {
           this.truco_aceito(player);   
       }
   }

    truco(player) {
        this.lastTrucoOutstanding = true;
        this.lastTalkPlayer = player.name;
        
        this.p1.gameTalk('truco');
        this.p2.gameTalk('truco');

        this.updateState(GameState.truco, player);        
    }
    
    truco_aceito(player) {
        if( this.lastTrucoOutstanding && this.lastTalkPlayer != player ) {
            this.lastTrucoOutstanding = false;
            this.lastTrucoBasePoints += 3;

            this.p1.gameTalk('truco_aceito');
            this.p2.gameTalk('truco_aceito');            
            this.updateState(GameState.truco_aceito);    
        }
    }
    
    update_truco_state(player) {
        (this.lastTrucoOutstanding) && this.truco_aceito(player);
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
                
                if( result.cmd == 'giveup' ) {
                    var winner = result.winner;
                    
                    this.updateState(GameState.giveup);
                    this.updateState(GameState.fim, winner);

                    this.p1.gameTalk('giveup');
                    this.p2.gameTalk('giveup');
                        
                    this.p1.gameEnd(winner);
                    this.p2.gameEnd(winner);
                    this.gameFinished = true;
                                            
                    return;
                }
                
                // determina quem ganhou a rodada
                var winner = result.winner; 

                // guarda quem ganhou a primeira rodada
                if( rodada == 0 && winner != null) {
                    win1 = winner;
                }
                
                // marca os pontos
                if(winner == this.initial_p1)     j1++;        
                if(winner == this.initial_p2)   j2++;
                
                if(winner == null) {
                    // caso tenha sido empate, vai para o desempate
                    if(j1 == j2) {
                        j1++;
                        j2++;
                    }

                    // se ganhar a primeira, mas empatar depois... entao e ganhador.
                    if( win1 != null ) {
                        j1 = ( win1 == this.initial_p1 )   ? 2 : 1;
                        j2 = ( win1 == this.initial_p2 ) ? 2 : 1;                    
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
                        winner = (j1 > j2) ? this.initial_p1 : this.initial_p2;
                    }
                    resultado = { p1: j1, pcpu: j2, winner: winner };

                    this.p1.gameEnd(winner);
                    this.p2.gameEnd(winner);
                    this.gameFinished = true;
                        
                    this.updateState(GameState.fim, winner);
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
                
                if( turn == null )
                    return {  m: m, p1: null, p2: null, winner: p2, cmd: 'giveup' };
                this.update_truco_state(p1);
                
                this.updateState(GameState.p2, p2);
                
                return p2.getPlayAsync()
                    .then( (turn2) => {
                        p1.gameUpdatePlayer(turn2);

                        if( turn2 == null )
                            return {  m: m, p1: turn, p2: null, winner: p1, cmd: 'giveup' };
                        this.update_truco_state(p2);
                        
                        var winner = this.showWinner(turn, turn2);
                        
                        this.updateState(GameState.turn, winner);
                        
                        ( winner != null && p2 == winner ) && this.swapPlayers();                            
                        
                        return { m: m, p1: turn, p2: turn2, winner: winner, cmd: 'turn' };    
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
        
        var player = (param && (param.name + ': ' )) || '';
        var msg = player + GameState[state];
        
        // showMessage(msg);
    }
}

var showMessage: Function;

function startGame(player1, player2) {
    
    var p1 = new ServerPlayer1(player1);
    var pcpu = new ServerPlayerCPU();

    var baralho = new Baralho();
    var game = new Game(p1, pcpu);
    
    var cartas = baralho.distribuir();         
    game.start(cartas);
    game.play();
    
}