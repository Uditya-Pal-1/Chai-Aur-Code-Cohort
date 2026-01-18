const remote = {
    color:"black",
    brand:"Sony",
    dimensions:{
        height:10,
        width:5,
        depth:3
    },
    turnedOn:false,
    turnOn:function(){
        this.turnedOn=true;
        console.log("Remote is turned on")

    },
    turnOff:function(){
        this.turnOff=true;
        console.log("Remote is turned off")
    }
}
remote.turnOn();
remote.turnOff();