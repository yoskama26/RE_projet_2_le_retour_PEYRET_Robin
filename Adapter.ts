/**
 * The Target defines the domain-specific interface used by the client code.
 */
 export class Target {
    public request(): string {
        return "ajout du heat sensor";
    }
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
export class Adaptee {
    public specificRequest(): string {
        return ("ajout du motion sensor").split('').reverse().join('');
    }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
export class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
// function clientCode(target: Target) {
//     console.log(target.request());
// }

// console.log('Client: I can work just fine with the Target objects:');
// const target = new Target();
// clientCode(target);

// console.log('');

// const adaptee = new Adaptee();
// console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
// console.log(`Adaptee: ${adaptee.specificRequest()}`);

// console.log('');

// console.log('Client: But I can work with it via the Adapter:');
// const adapter = new Adapter(adaptee);
// clientCode(adapter);