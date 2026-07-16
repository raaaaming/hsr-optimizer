export class Action {

    constructor(){

        this.id = crypto.randomUUID();

        this.actor = "";

        this.actionId = "";

        this.target = "";

        this.targetIndex = 0;

    }

}