define(['postal','NK'],(postal, NK) => {
    //set constructor vars and potentially private vars
    return (display) => {

        console.log(display);
        const isWinning = ticket => {
            console.log(ticket);
            return ticket.tier > 0;
        }

        let buttons = [display.playAgainButton.button, display.setBetButton.button];
        let activateButtons = () => {
            buttons.map(button => button.activate());
        }

        const showOutcome = ticket => {
            if (isWinning(ticket)) {
                display.winHail.alpha = 1;
                display.loseHail.alpha = 0;
                display.prize.alpha = 1;
                display.prize.text = "$" + ticket.prizeTable[ticket.tier];
                NK.playSound("win");
            } else {
                display.winHail.alpha = 0;
                display.loseHail.alpha = 1;
                display.prize.alpha = 0;
                NK.playSound("lose");
            }
        }

        const enter = (ticket) => {
            console.log("nete", ticket)
            showOutcome(ticket);
            return new Promise((resolve) => {
                TweenMax.to(display.container, 1, {
                    y: 50,
                    onComplete: () => {
                        activateButtons();
                        return resolve();
                    }
                })
            })
        }

        const exit = () => {
            return new Promise((resolve) => {
                TweenMax.to(display.container, 1, {
                    y: -200,
                    onComplete: () => {
                        return resolve();
                    }
                })
            })
        }

        postal.subscribe({
            channel: "endMessage",
            topic: "enter",
            callback: (data) =>{
                return enter(data)
            }
        })

        postal.subscribe({
            channel: "endMessage",
            topic: "exit",
            callback: exit
        })
    }
});