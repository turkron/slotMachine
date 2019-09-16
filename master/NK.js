//use this space to define the helper functions on a global scale. 
define(["postal", "howler"], (postal, Howler) => {

    const Graphic = (parent,optionals) => {
        _.defaults(optionals, { x: 0 }, { y: 0 }, { w: 0 }, { h: 0 }, { c: 0xFF00FF })

        let output = new PIXI.Graphics();
        output.beginFill(optionals.c);
        output.drawRect(optionals.x, optionals.y, optionals.w, optionals.h);
        output.endFill();
        parent.addChild(output);
        return output;
    }

    const PlusButton = (parent, optionals) => {
        let container = Container(parent, optionals.container);
        let background = Graphic(container, optionals.background);
        let line = Graphic(container, optionals.line);
        let pole = Graphic(container, optionals.pole);
        let button = Button(background, optionals.button);
        return { container, button};
    }

    const MinusButton = (parent, optionals) => {
        let container = Container(parent, optionals.container);
        let background = Graphic(container, optionals.background);
        let line = Graphic(container, optionals.line);
        let button = Button(background, optionals.button);
        return { container, button };
    }

    const TextButton = (parent, string, optionals) => {
        let container = Container(parent, optionals.container);
        let background = Graphic(container, optionals.background);
        let text = Text(string, container, optionals.text);
        text.position.x = optionals.text.x;
        text.position.y = optionals.text.y;
        let button = Button(background, optionals.button);
        return { container, button };
    }

    const Container = (parent, optionals) => {
        if (_.isUndefined(optionals)) { optionals = {} };
        _.defaults(optionals, { x: 0 }, { y: 0 });
        let container = new PIXI.Container();
        container.position.x = optionals.x;
        container.position.y = optionals.y;
        parent.addChild(container);
        return container;
    }

    const Text = (textValue,parent, optionals) => {
        if (_.isUndefined(optionals)) { optionals = {} };
        _.defaults(optionals, { x: 0 }, { y: 0 }, { fontFamily: 'Arial' }, { fontSize: 24 }, { fill: 0x000000 }, { align: 'center' })
        let text = new PIXI.Text(textValue, optionals)
        text.position.x = optionals.x;
        text.position.y = optionals.y;
        parent.addChild(text);
        return text;
    }

    const Button = (display, options) => {
        let button = display;
        button.buttonMode = true;
        if (_.isUndefined(options.oneShot)) {
            button.oneShot = true;
        } else {
            button.oneShot = options.oneShot
        }
        if (options.name) {
            button.name = options.name;
        } else {
            button.name = _.uniqueId("button_");
        }
        button.channel = button.name;
        
        button
            .on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('pointerupoutside', onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);

        function onButtonDown() {
            this.isdown = true;
            this.alpha = 1;
            postal.publish({
                channel: button.name,
                topic: "mouseDown"
            })
        }

        function onButtonUp() {
            this.isdown = false;
            if (button.oneShot == true) {
                button.deactivate();
            }
            if (options.soundName) {
                playSound(options.soundName);
            }
            postal.publish({
                channel: button.name,
                topic: "clicked"
            })
        }

        function onButtonOver() {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            postal.publish({
                channel: button.name,
                topic: "rollOver"
            })
        }

        function onButtonOut() {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            postal.publish({
                channel: button.name,
                topic: "rollOut"
            })
        }

        button.deactivate = () => {
            button.alpha = 0.5;
            button.interactive = false;
        };

        button.activate = () => {
            button.alpha = 1;
            button.interactive = true;
        }
        button.deactivate();
        return button;
    }

    const Delay = (delayTime) => {
        return new Promise((resolve) => {
            return setTimeout(()=> resolve(), delayTime)
        })
    }

    const playSound = (soundName, options) => {
        if (!_.isObject(options)) options = {};
        _.defaults(options, {loop:false})
        let sound = new Howler.Howl({
            src: ["assets/sounds/" + soundName + ".mp3"],
            loop: options.loop
        })
        sound.play();
    }

    return {
        Button,
        PlusButton,
        MinusButton,
        Graphic,
        Text,
        TextButton,
        Container,
        Delay,
        playSound
    };

}
);
