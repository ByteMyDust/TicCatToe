export default class CatPaw extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, "catPaw")
        config.scene.add.existing(this)
        this.setInteractive()
    }
}
