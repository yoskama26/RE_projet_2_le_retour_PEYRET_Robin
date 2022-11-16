 import { Vaisseau }from "./index";
 interface Command {
    execute(): void;
}


export class EnergyShieldCommand implements Command {

    private isActivate: boolean;

    public execute(): void {
        if (this.isActivate){
            console.log(`Bouclier activé !`);
            this.isActivate = true
        }
        else{
            console.log(`Bouclier désactivé !`);
            this.isActivate = false
        }

    }

    constructor(etatBouclier : boolean){
        this.isActivate = etatBouclier
    }

}


export class UseCannon implements Command {
    private receiver: Receiver;

    constructor(receiver: Receiver) {
        this.receiver = receiver;

    }


    public execute(): void {
        this.receiver.ActiveCannon();

    }
}


export class Receiver {

    public ActiveCannon(){
        console.log('Le cannon va faire feu');
    }
}


export class Invoker {
    private action: Command;

    public setaction(command: Command): void {
        this.action = command;
    }



    public executeOrder66(): void {
        if (this.isCommand(this.action)){
            this.action.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}


// const invoker = new Invoker();
// invoker.setaction(new EnergyShieldCommand());
// const receiver = new Receiver();
// invoker.setOnFinish(new UseCannon(receiver));

// invoker.doSomethingImportant();