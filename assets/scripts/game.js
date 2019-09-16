define(["scripts/block", "postal", "NK"],(Block, postal, NK) => {
    //set constructor vars and potentially private vars
    return (displayList) => {
        NK.playSound("backgroundLoop", { loop: true });
        NK.playSound("slowbeat", { loop: true });
        let xPositions = [200, 350, 500],
            yPositions = [150, 250, 350],
            blocks = _.range(9).map((i) => {
                let display = displayList.createBlock(i);
                let Revealer = Block(display);
                Revealer.setStartingPosition({ x: xPositions[i % 3], y: yPositions[_.floor(i / 3)] - 640 })
                return Revealer;
            }),
            potentialWinningBlocks = [blocks[3], blocks[4], blocks[5]];


        let startGame = (ticket) => {
            blocks.map((block,i) => {
                block.setOutcome(ticket.scenario.outcome[i]);
            })
            displayList.drawButton.button.activate();


            return new Promise((resolve) => {
                postal.subscribe({
                    channel: "draw",
                    topic: "clicked",
                    callback: () => {
                        Promise.all(blocks.map((revealer, i) => {
                            return NK.Delay(50 * i).then(revealer.enter)
                        })).then(resolve);
                    }
                })
            }).then(() => {
                return Promise.all(potentialWinningBlocks.map((block) => {return block.checkWin(ticket) }));
            });
        };

        let endGame = (ticket) => {
            console.log(ticket);
            postal.publish({
                channel: "setBalance",
                topic: "add",
                data:ticket.prizeTable[ticket.scenario.tier]
        });
            return Promise.resolve();
        }

        let reset = () => {
            return Promise.all(blocks.map(block => block.exit()))
        }

        return {
            startGame,
            endGame,
            reset
        }
    };
});