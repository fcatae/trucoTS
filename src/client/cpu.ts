class CPU {

    private talkCallback: Function;
    private jogada = 0;
    private game_update = [
        { cmd: 'play', carta: { num: 5, tipo: 3 } },
        { cmd: 'play', carta: { num: 6, tipo: 3 } },
        { cmd: 'play', carta: { num: 7, tipo: 3 } }
    ];

    start(curinga, carta, callback) {
        this.game_update = [
            { cmd: 'play', carta: carta[0] },
            { cmd: 'play', carta: carta[1] },
            { cmd: 'play', carta: carta[2] }
        ];
        this.talkCallback = callback;
        
        this.enableDebugKeys();
    }
    
    private getCommand() {
        var jogada = this.jogada;
        var command = this.game_update[jogada];
        this.jogada ++;
        return command;        
    }
    
    getPlayAsync(t) {
        return new Promise((resolve, reject) => {
            
            var cmd = this.getCommand();
            setTimeout(function() { 
                resolve(cmd.carta);
            }, t)
            
        });
    }
    
    private enableDebugKeys() {

        window.addEventListener('keydown', (ev) => {
            if(ev.keyCode == 84) { // T = truco
                this.talkCallback('truco');
            }
            if(ev.keyCode == 89) { // Y = yes
                this.talkCallback('truco_aceito');
            }
        });
        
    }
    
}

 
var playerCPU = new CPU();