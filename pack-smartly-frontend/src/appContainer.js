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
            console.log(data)
            data.forEach(item => {
                new Item(item.name, item.trip)
            })
            // call renderItems
            this.renderItems()
        })
        .catch(err => alert(err))
    }

    renderItems() {
        // create DOM nodes and insert data into them to render in the DOM
        const hotCampingSelect = document.getElementById('hotCamping')
        const coldCampingSelect = document.getElementById('coldCamping')
        const beachSelect = document.getElementById('beach')
        AppContainer.items.forEach(item => {
            const option = document.createElement('option')
            option.innerText = item.name 
            // where  we append it will be conditional based on what trip it belongs to
            switch(item.trip.name) {
                case 'hotCamping':
                  hotCamping.appendChild(option)
                  break;
                case 'coldCamping':
                    coldCamping.appendChild(option)
                  break;
                  case 'beach':
                  beach.appendChild(option)
                  break;
                default:
                  // code block
              }
        })
    } 

}