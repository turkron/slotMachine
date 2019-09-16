define(["parsing", "game", "variableStake","postal"], (Parsing, Game, VariableStake, postal) => {
    
    return (platform, Config, displayList) => {

        const game = Game(displayList);
        let currentTicketIndex = -1;
        let currentStakeIndex = -1;
	let currentBalance = 9999;

        const getTicketData = (stakeIndex) => {
            if (Config.isLocal) {
                currentTicketIndex++;
                if (currentTicketIndex > Config.data.tickets.length -1) {
                    currentTicketIndex = 0;
                }
                let ticket = Config.data.tickets[currentTicketIndex];
                ticket.stakeIndex = stakeIndex;
                ticket.stake = Config.data.stakes[stakeIndex];
                ticket.prizeTable = Config.data.prizeTable.map(prize => prize * ticket.stake);
                return ticket;
            }
        };
        const getStakes = () => {
            if (Config.isLocal) {
                return Config.data.stakes;
            }
        }
        const getPrizeTable = () => {
            if (Config.isLocal) {
                return Config.data.prizeTable;
            }
        }
        const parseTicket = Parsing[platform] || Parsing["default"];

        const purchaseTicket = (stakeIndex) => {
            currentStakeIndex = stakeIndex;
	    currentBalance -= Config.data.stakes[stakeIndex];
		displayList.balance.text = "Balance: $" + currentBalance;
            let ticket = getTicketData(stakeIndex);
            ticket = parseTicket(ticket);
            return ticket;
        }

        postal.publish({
            channel: "variableStake",
            topic:"enter"
        })


        postal.subscribe({
            channel: "confirmStake",
            topic: "purchase",
            callback: (data) => {
                let ticket = purchaseTicket(data.stake);
                postal.publish({
                    channel: "variableStake",
                    topic:"exit"
                })
                return game.startGame(ticket)
                    .then(()=> game.endGame(ticket))
                    .then(() =>{
                        postal.publish({
                            channel: "endMessage",
                            topic: "enter",
                            data:ticket
                        })
                        
                    })
            }
        })

        postal.subscribe({
            channel: "playAgain",
            topic: "clicked",
            callback: () => {
                postal.publish({
                    channel: "endMessage",
                    topic:"exit"
                })
                return game.reset().then(() => {
                    postal.publish({
                        channel: "confirmStake",
                        topic: "purchase",
                        data: { stake: currentStakeIndex }
                    })
                })
                
            }
        })

        postal.subscribe({
            channel: "setBet",
            topic: "clicked",
            callback: () => {
                game.reset();
                postal.publish({
                    channel: "endMessage",
                    topic:"exit"
                })
                postal.publish({
                    channel: "variableStake",
                    topic:"enter"
                })
            }
        })
	
	postal.subscribe({
		channel:"setBalance",
		topic:"add",
		callback:(data) => {
			console.log(data);
			currentBalance += data;
			displayList.balance.text = "Balance: $"+currentBalance;
		}
	});
        

        return {

        };
    }
});
