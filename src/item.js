class Item {
    constructor(id, name, trip){
        this.name = name
        this.trip = trip
        this.id = id
        AppContainer.items.push(this)
    }
}