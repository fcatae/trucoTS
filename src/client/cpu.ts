class CPU {

    private jogada = 0;
    private game_update = [
        { cmd: 'play', carta: { num: 5, tipo: 3 } },
        { cmd: 'play', carta: { num: 6, tipo: 3 } },
        { cmd: 'play', carta: { num: 7, tipo: 3 } }
    ];

    start(curinga, carta) {
        this.game_update = [
            { cmd: 'play', carta: carta[0] },
            { cmd: 'play', carta: carta[1] },
            { cmd: 'play', carta: carta[2] }
        ];
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
    
}

var playerCPU = new CPU();