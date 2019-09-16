define(["postal", "connector","config", "NK"],(postal,connector,Config, NK) => {
    //set constructor vars and potentially private vars
    return (objs) => {
        
        //this is helpful for creating new modules.
        const confirmStake = objs.confirmStakeButton.button;

        let currentStakeIndex = 0;
        let activateButtons = () => {
            console.log("activate");
            [
                objs.confirmStakeButton.button,
                objs.plusButton.button,
                objs.minusButton.button
            ].map(button => {
                return button.activate();
            });
            return;
        };

        const enter = () => {
            new Promise((resolve) => {
                TweenMax.to(objs.stakePanel.position, 1, {
                    y:50,
                    onComplete: () => {
                        activateButtons();
                        return resolve;
                    }
                })
            });
        }

        const exit = () => {
            new Promise((resolve) => {
                TweenMax.to(objs.stakePanel.position, 1, {
                    y:-400,
                    onComplete:() => {return resolve;}
                }
            )})
            }

        const increaseStake = () => {
            if (currentStakeIndex < Config.data.stakes.length -1) {
                currentStakeIndex++;
                objs.stakeText.text = "$" + Config.data.stakes[currentStakeIndex];
            }
        }

        const decreaseStake = () => {
            if (currentStakeIndex > 0) {
                currentStakeIndex--;
                objs.stakeText.text = "$" + Config.data.stakes[currentStakeIndex];
            }
        }

        postal.subscribe({
            channel:"confirmStake",
            topic: "clicked",
            callback: () => {
                postal.publish({
                    channel: "confirmStake",
                    topic: "purchase",
                    data: {stake:currentStakeIndex}
                })
            }
        })

        postal.subscribe({
            channel: "variableStake",
            topic: "enter",
            callback: enter
        })

        postal.subscribe({
            channel: "plusButton",
            topic: "clicked",
            callback: increaseStake
        })
        postal.subscribe({
            channel: "minusButton",
            topic: "clicked",
            callback: decreaseStake
        })

        postal.subscribe({
            channel: "variableStake",
            topic: "exit",
            callback: exit
        })




        return {
            enter,
            exit
        };
    }
});