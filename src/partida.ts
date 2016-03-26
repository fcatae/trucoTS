import { Baralho, Carta } from './cartas';

enum CartaNumero { N4, N5, N6, N7, Q, J, K, A, N2, N3, FIM };
enum CartaTipo   { T1, T2, T3, T4, FIM }

const TotalCartas = CartaNumero.FIM * CartaTipo.FIM;
 
class PlayerView {
    constructor(curinga: Carta, cartas: Carta[]) {
        this.curinga = curinga;
        this.cartas = cartas;
    }
    curinga: Carta;            
    cartas: Carta[];            
}

export class Partida {
    _cartas: number[];
    _baralho = new Baralho();
    
    constructor() {
        this._cartas = new Array(TotalCartas);
        for(let i=0; i<TotalCartas; i++) {
            this._cartas[i] = i;
        }
        
        this.embaralhar();
    }
    
    p1view() {
        return this.createPlayerView(0, [1,2,3]);                
    }
        
    p2view() {
        return this.createPlayerView(0, [4,5,6]);
    }
        
    embaralhar() {
        for(let i=0; i<TotalCartas; i++) {
            let rand = Math.floor(Math.random() * TotalCartas); 
            
            let swap = this._cartas[i]; 
            this._cartas[i] = this._cartas[rand];
            this._cartas[rand] = swap;
        }
    }
    
    private createPlayerView(curinga: number, ordem: number[]) : PlayerView {
        let carta_curinga = this.getCarta(curinga);

        let cartas = ordem.map( i => this.getCarta(i) );
        
        return new PlayerView(carta_curinga, cartas);
    }
    
    private getCarta(n: number) : Carta {
        return this._baralho.getCarta(this._cartas[n]);
    }
    
    private get proximo_curinga() {
        var carta_curinga = this.getCarta(0);
        var proximo_numero = (carta_curinga.num + 1) % CartaNumero.FIM;
        
        return proximo_numero;
    }
    
    private calculaPontos(carta: Carta) {
        if( carta.num == this.proximo_curinga ) {
            return (100 * CartaNumero.FIM) + carta.tipo; 
        } 
        
        return carta.num;
    }
    
    quemGanhou(p1: Carta, p2: Carta) : number {
        let pontos1 = this.calculaPontos(p1);
        let pontos2 = this.calculaPontos(p2);
        
        return (pontos2 - pontos1);       
    }
}

export function teste() {
    var partida = new Partida();
    
    var p1 = partida.p1view();
    var p2 = partida.p2view();
    
    var ganhador = partida.quemGanhou(p1.cartas[0], p2.cartas[0]);
}