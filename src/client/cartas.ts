enum CartaNumero { N4, N5, N6, N7, Q, J, K, A, N2, N3, FIM };
enum CartaTipo   { T1, T2, T3, T4, FIM }

const TotalCartas = CartaNumero.FIM * CartaTipo.FIM;

class Baralho {
    _cartas: Carta[] = [];
    
    constructor() {
        for(let n=0; n<CartaNumero.FIM; n++) {
            for(let t=0; t<CartaTipo.FIM; t++) {
                let carta = new Carta(n, t);
                
                this._cartas.push(carta);
            }
        }
    }

    distribuir() {
        this.embaralhar();
        
        return {
            curinga: this._cartas[0],
            p1: [ this._cartas[1], this._cartas[2], this._cartas[3] ],
            p2: [ this._cartas[4], this._cartas[5], this._cartas[6] ]            
        };
    } 
    
    private embaralhar() {
        for(let i=0; i<TotalCartas; i++) {
            let rand = Math.floor(Math.random() * TotalCartas); 
            
            let swap = this._cartas[i]; 
            this._cartas[i] = this._cartas[rand];
            this._cartas[rand] = swap;
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
