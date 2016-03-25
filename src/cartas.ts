enum CartaNumero { N4, N5, N6, N7, Q, J, K, A, N2, N3, FIM };
enum CartaTipo   { T1, T2, T3, T4, FIM }

export class Baralho {
    _cartas: Carta[] = [];
    
    constructor() {
        for(let n=0; n<CartaNumero.FIM; n++) {
            for(let t=0; t<CartaTipo.FIM; t++) {
                let carta = new Carta(n, t);
                
                this._cartas.push(carta);
            }
        }
    } 
}

class Carta {
    num: CartaNumero;
    tipo: CartaTipo;
    
    constructor(n,t) {
        this.num = n;
        this.tipo = t;
    }
}

export function teste() {
    var baralho = new Baralho();    
}

