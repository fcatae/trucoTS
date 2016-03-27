// enum CartaNumero { N4, N5, N6, N7, Q, J, K, A, N2, N3, FIM };
// enum CartaTipo   { T1, T2, T3, T4, FIM }

// const TotalCartas = CartaNumero.FIM * CartaTipo.FIM;
 
// class PlayerView {
//     constructor(curinga: Carta, cartas: Carta[]) {
//         this.curinga = curinga;
//         this.cartas = cartas;
//     }
//     curinga: Carta;            
//     cartas: Carta[];            
// }

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

// p.game.on('game_start', function() {    
// });

// p.game.on('game_update', function() {    
// });

// p.game.on('wait_play', function() {    
// });

setTimeout(function() {
    player1.game.emit('game_start');
} , 1000)