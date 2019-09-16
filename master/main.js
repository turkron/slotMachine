requirejs.config({
    baseUrl: "./",
    paths: {
        master: "master",
        scripts:"assets/scripts",
        config: "assets/scripts/config",
        connector: "master/connector",
        setup: "master/setup",
        parsing: "master/parsing",
        game: "assets/scripts/game",
        variableStake: "master/variableStake",
        endMessage: "master/endMessage",
        NK: "master/NK",
        postal: "node_modules/postal/lib/postal",
        lodash: "node_modules/lodash/lodash",
        howler: "node_modules/howler/dist/howler"
    }
})

requirejs(["setup", "connector", "config"], function (Setup, Connector, Config) {

    //define short cuts here? 
    return Connector("dev", Config, Setup);
});