export class Build {

    constructor(){

        this.id = crypto.randomUUID();

        this.name = "New Build";

        this.character = "";

        this.element = "";

        this.path = "";

        this.eidolon = 0;

        this.lightCone = {

            id:null,

            superimposition:1

        };

        this.relics = [];

        this.stats = {};

        this.memo = "";

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

    }

}