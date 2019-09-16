//lets use this to set up the canvas and potential textures lib;
define(['NK', 'variableStake', 'endMessage'],(NK,VariableStake,EndMessage) => {
    const app = new PIXI.Application(1024, 600);
    document.body.appendChild(app.view);
    let backGround = new PIXI.Sprite();
    let VS = {};
   

    let gamePanel = {};
    gamePanel.container = NK.Container(app.stage);

    gamePanel.display = NK.Graphic(gamePanel.container, { w: 600, h: 440, x: 100, y: 100, c: 0xFFFFFF });
    gamePanel.mask = NK.Graphic(gamePanel.container, { w: 800, h: 640 });
    gamePanel.display.mask = gamePanel.mask;
    gamePanel.winningLine = NK.Text("Winning Line", gamePanel.container, { x: 100, y: 370 })
    gamePanel.winningLine.rotation = 4.7;
    gamePanel.lineGraphic = NK.Graphic(gamePanel.container, { w: 500, h: 10, x: 160, y: 290 });


    let drawButton = NK.TextButton(app.stage, "Draw", {
        container: { x: 760, y: 200 },
        background: { w: 80, h: 40 },
        text: { fontSize: 20, y: 10, x: 5 },
        button: { name: "draw", soundName:"click2"}
    });

    let createBlock = (displayValue) => {
        let block = {};//this is the block for the reel itself
        block.container = NK.Container(gamePanel.container);
        block.background = NK.Graphic(block.container, { w: 100, h: 100 })
        block.winBG = NK.Graphic(block.container, { w: 100, h: 100, c: 0xffff00 })
        block.winBG.alpha = 0;
        block.text = NK.Text(displayValue, block.container, { x: 40, y: 35 });
        return block;
    };

    let createVS = () => {
        
        VS.stakePanel = NK.Container(app.stage);
        VS.backPanel = NK.Graphic(VS.stakePanel, { x: 720, y: 50, w: 300, h: 200, c: 0xFFFFFF });
        VS.stakeContainer = NK.Container(VS.stakePanel);
        VS.stakeHeaderText = NK.Text("Stake", VS.stakePanel, { x: 775, y: 75 });
        VS.stakeTextBackGround = NK.Graphic(VS.stakeContainer, { x: 750, y: 140, w: 100, h: 50 })
        VS.stakeText = NK.Text("$1", VS.stakeContainer, { x: 785, y: 150, fill: 0xFFFFFF });
        VS.plusButton = NK.PlusButton(VS.stakeContainer, {
            container: { x: 860, y: 120 },
            background: { w: 80, h: 80 },
            line: { x: 15, y: 35, w: 50, h: 10, c: 0xFFFFFF },
            pole: { x: 35, y: 15, w: 10, h: 50, c: 0xFFFFFF },
            button: { name: "plusButton" , oneShot:false, soundName:"click2"}
        });
        VS.minusButton = NK.MinusButton(VS.stakeContainer, {
            container: { x: 660, y: 120 },
            background: { w: 80, h: 80 },
            line: { x: 15, y: 35, w: 50, h: 10, c: 0xFFFFFF },
            button: { name: "minusButton", oneShot: false , soundName:"click2"}
        });
        VS.confirmStakeButton = NK.TextButton(VS.stakeContainer, "Confirm", {
            container: { x: 760, y: 200 },
            background: { w: 80, h: 40 },
            text: { fontSize: 20, y: 10, x: 5 },
            button: { name: "confirmStake" , soundName:"test"}
        })
    }

    let endMessage = {};
    endMessage.container = NK.Container(app.stage, {x:720, y:-200});
    endMessage.background = NK.Graphic(endMessage.container, { x: 0, y: 0, w: 300, h: 200, c: 0xFFFFFF });
    endMessage.winHail = NK.Text("Congrats! You win!", endMessage.container, { x: 50, y: 20});
    endMessage.loseHail = NK.Text("Better luck next time!", endMessage.container, { x: 40, y: 20 });
    endMessage.prize = NK.Text("$1000", endMessage.container, {x: 120, y: 60});
    endMessage.playAgainButton = NK.TextButton(endMessage.container, "Play again", {
        container: { x: 20, y: 130 },
        background: { w: 110, h: 40 },
        text: { fontSize: 20, y: 10, x: 5 },
        button: { name: "playAgain" , soundName:"test"}
    });
    endMessage.setBetButton = NK.TextButton(endMessage.container, "Set Bet", {
        container: { x: 200, y: 130 },
        background: { w: 80, h: 40 },
        text: { fontSize: 20, y: 10, x: 5 },
        button: { name: "setBet" , soundName:"test"}
    })

    let balance = NK.Text("Balance: $9999", app.stage, {fill:0xFFFFFF});


    createVS();


    return {
        stage: app,
        variableStake: VariableStake(VS),
        endMessage: EndMessage(endMessage),
        createBlock: createBlock,
        mainGamePanel: gamePanel,
        drawButton,
        balance
    }
});
