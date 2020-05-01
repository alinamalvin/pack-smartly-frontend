class AppContainer {
    static items = []
    trips = []
    url = "http://localhost:3000"
    packingList= {}

    bindEventListeners() {
        const btn = document.getElementById('createPackingList')
        btn.addEventListener('click', this.getCustomizedItems.bind(this))
    }

    getCustomizedItems(){ 
        const chosenTrip= document.getElementById('chosenTrip')
        let customizedItems=AppContainer.items.filter(item => item.trip === chosenTrip)
        return customizedItems 
    }


    getItems(){
        // make a fetch request to /weathers
        console.log('something')
        fetch(this.url + '/items')
        .then(resp => resp.json())
        // populate the items properties with the returned data
        .then(data => {
            data.forEach(item => {
                new Item(item.name, item.trip_id)
            })
        })
        // call renderItems
        .catch(err => alert(err))
    }

    renderItems(){
        // create DOM nodes and insert data into them to render in the DOM

    }
}