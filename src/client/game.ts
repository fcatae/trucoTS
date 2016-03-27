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
    game = new eventemitter.EventEmitter();
    
    play(Carta carta) {
        // http.send
        // emit('server-player1')
    }
}

var player1 = new PlayerClient();

//////////////////////////////////////////////////////////////////////////////

var game_start_event = { curinga: { num: 1, tipo: 0 },
    cartas: [{ num: 2, tipo: 0 },{ num: 3, tipo: 0 },{ num: 4, tipo: 0 }]};
    
// p.game.on('game_start', function() {    
// });

// p.game.on('game_update', function() {    
// });

// p.game.on('wait_play', function() {    
// });

setTimeout(function() {
    player1.game.emit('game_start', game_start_event);
} , 1000)