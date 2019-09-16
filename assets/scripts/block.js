define(() => {
    //set constructor vars and potentially private vars
    return (display) => {
        //this is helpful for creating new modules. 
        console.log(display);
        let startingPosition = { x: 0, y: 0 };

        let setOutcome = (outcome) => {
            display.text.text = outcome;
        }
        let setPosition = (position) => {
            display.container.position.x = position.x;
            display.container.position.y = position.y;
        }
        let setStartingPosition = (position) => {
            if (!_.isObject(position)) {
                console.error("wasnt given a position obj, skipping for now");
                return;
            }
            startingPosition = position;
            setPosition(position);
        }

        let checkWin = (ticket) => {
            if (ticket.scenario.winner) {
                return win();
            } else {
                return lose();
            }
        };

        let enter = () => {
            return new Promise((resolve) => {
                setPosition(startingPosition)
                TweenMax.to(display.container.position, 1, {
                    y: startingPosition.y + 640,
                    onComplete: () => {
                        return resolve();
                    }
                })
            })
           
        }

        let exit = () => {
            return new Promise((resolve) => {
                TweenMax.to(display.container.position, 1, {
                    y: startingPosition.y + 1280,
                    onComplete: () => {
                        display.winBG.alpha = 0;
                        return resolve();
                    }
                })
            })
        }

        let win = () => {
            display.winBG.alpha = 1;
            return Promise.resolve();
        }

        let lose = () => {
            return Promise.resolve();
        }
      

        return {
            setStartingPosition,
            setOutcome,
            setPosition,
            enter,
            exit,
            checkWin
        }; 
    }
});