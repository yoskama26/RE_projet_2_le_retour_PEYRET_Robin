import { SensorBuilder, Director } from "./Builder";
import { EventManager, IObserver }from "./Observer";
import { Target,Adaptee,Adapter }from "./Adapter";
import { EnergyShieldCommand,UseCannon,Invoker,Receiver }from "./Command";

export class Vaisseau {

    sensors : String[];
    name : String;
    heatSensor : boolean;
    motionSensor : boolean;
    public constructor(){
        this.name = "Yamato";    
        this.sensors = [];
        this.heatSensor = false;
        this.motionSensor = false;
    }

    public add(sensor:String){
        this.sensors.push(sensor);
    }
    public activeSensor(targetSensor){
        
        switch(targetSensor){
            case'heatSensor' : 
                this.heatSensor = true
                console.log(`${targetSensor} est activé`);
                break;
            case'motionSensor' :
                this.motionSensor = true
                console.log(`${targetSensor} est activé`);
                break;
            default :
                console.log(`${targetSensor} N'existe pas`);

        }
        
    }

    public resetSensor() {
        this.heatSensor = false;
        this.motionSensor = false;
        console.log('Ennemi annihilé -> Aucune menace détécté');
    }
    


} 
const vaisseau = new Vaisseau(); 

const evenement:IObserver = {
    update(data: String){
        console.log(data);
    }
}

const eventManager = EventManager.getInstance();

const target = new Target();
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

eventManager.on("ajout-sensor",evenement)

const director = new Director();
const sensorBuilder = new SensorBuilder();

director.setBuilder(sensorBuilder)
director.Heat_Sensor();
const heatSensor = sensorBuilder.getProduct().getSensorName()

vaisseau.add(heatSensor);
eventManager.emit("ajout-sensor",target.request());


director.Motion_Sensor();
const motionSensor = sensorBuilder.getProduct().getSensorName()
vaisseau.add(motionSensor)
eventManager.emit("ajout-sensor",adapter.request());

const invoker = new Invoker();
const receiver = new Receiver();

vaisseau.activeSensor("heatSensor");
invoker.setaction(new EnergyShieldCommand(true));
invoker.executeOrder66();

vaisseau.activeSensor("motionSensor");

invoker.setaction(new EnergyShieldCommand(false));
invoker.executeOrder66();

invoker.setaction(new UseCannon(receiver));
invoker.executeOrder66();

vaisseau.resetSensor();

