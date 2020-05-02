class Item {
    constructor(name, trip){
        this.name = name;
        this.trip = trip;
        AppContainer.items.push(this)
    }
}