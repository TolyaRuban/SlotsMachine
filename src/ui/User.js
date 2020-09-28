class User extends Sprite{
    constructor(userId){
        super();

        this.userId = userId;

        this.title = this.addChild(new PIXI.Text(`USER ${this.userId}`, {
            fill: 0xfaff00,
            fontSize: 40,
            strokeThickness: 10
        }));
    }

    update(userId){
        this.userId = userId;

        this.title.text = `USER ${this.userId}`;
    }
}