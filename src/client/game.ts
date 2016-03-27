enum CartaNumero { N4, N5, N6, N7, Q, J, K, A, N2, N3, FIM };
enum CartaTipo   { T1, T2, T3, T4, FIM }
 
class PlayerView {
    constructor(curinga: ICarta, cartas: ICarta[]) {
        this.curinga = curinga;
        this.cartas = cartas;
    }
    curinga: ICarta;            
    cartas: ICarta[];            
}
interface ICarta {
    num: CartaNumero;
    tipo: CartaTipo;
}
//////////////////////////////////////////////////////////////////////////////

var eventemitter : any;

interface Carta {
    num: number;
    tipo: number;        
}

class PlayerClient {
    
    playable = false;
    ultima: Carta;
    
    game = new eventemitter.EventEmitter();
    
    play(carta: Carta) {
        this.playable = false;
        this.ultima = carta;
       
        // http.send
        // emit('server-player1')
        
        // done
    }
}

var player1 = new PlayerClient();

//////////////////////////////////////////////////////////////////////////////


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

