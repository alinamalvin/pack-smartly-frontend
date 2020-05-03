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
        const chosenTrip= document.getElementById('chosenTrip').value
        let customizedItems=AppContainer.items.filter(item => item.trip.name == chosenTrip)
        let packing = new PackingList(customizedItems)
        debugger
        //initiate PackingList instance with this items
    }


     renderCustomizedItems(){
     } 
// do I need getItems if I don`t need them to show? Might need to remove everything below
    getItems(){
    // make a fetch request to /items
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
    const campingSelect = document.getElementById('camping')
    const beachSelect = document.getElementById('beach')
    const skiSelect = document.getElementById('ski')
    const culturalSelect = document.getElementById('cultural')
    AppContainer.items.forEach(item => {
        const option = document.createElement('option')
        option.innerText = item.name 
        // where  we append it will be conditional based on what trip it belongs to
        switch(item.trip.name) {
            case 'camping':
              camping.appendChild(option)
              break;
            case 'ski':
                ski.appendChild(option)
            break;
            case 'cultural':
                cultural.appendChild(option)
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
function newFunction() {
    return []
}

