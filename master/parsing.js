define(() => {
    
    const defaultParser = (ticket) => {
        ticket.scenario = JSON.parse(ticket.data);
        return ticket;
    }

    return {
        default: defaultParser
    }

});