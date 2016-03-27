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

var playerView = {
    curinga: { num: 0, tipo: 0 },
    cartas: [{ num: 0, tipo: 0 }, { num: 0, tipo: 0 }, { num: 0, tipo: 0 }]
}
