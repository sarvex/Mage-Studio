class Sample extends Script {

    constructor() {
        super('sample');
    }

    start() {
        this.angle = 0;
    }

    update(dt) {
        this.angle += 0.01;
        this.setRotation({ y: this.angle });
    }
}
