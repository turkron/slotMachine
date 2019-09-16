define(() => {
        //this is helpful for creating new modules. 
    return {
        isLocal: true,
        data: {
            stakes: [1, 2, 3],
            prizeTable: [0, 0.5, 1, 3],
            tickets: [
               {
                   tier:0,
                   data:"{\"tier\": 0, \"outcome\":[1,2,3,1,2,3,1,2,3],\"winner\":false}"
               },
               {
                   tier:1,
                   data: "{\"tier\": 1, \"outcome\":[1,2,3,1,1,1,1,2,3],\"winner\":true}"
               },
               {
                   tier: 2,
                   data: "{\"tier\": 2, \"outcome\":[1,2,3,2,2,2,1,2,3],\"winner\":true}"
               },
               {
                   tier: 3,
                   data: "{\"tier\": 3, \"outcome\":[1,2,3,3,3,3,1,2,3],\"winner\":true}"
               }
            ]
        }
    
    }; 
});