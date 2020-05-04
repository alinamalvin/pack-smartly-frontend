class AppContainer {
    static items = []
    static trips = []
    url = "http://localhost:3000"
    static packingList= {}

    bindEventListeners() {
        // can join two codes into one later
        const btn = document.getElementById('createPackingList')
        // clicking the button initiates an empty funcition that calls getPackingList method on the eventListener: 
        btn.addEventListener('click', () => this.getPackingList(this))

        const newItemForm = document.getElementById('newItem')
        newItemForm.addEventListener('submit', () => this.createItem(event))
    }

    createItem(event) {
        event.preventDefault()
        const form = document.getElementById('newItem')
        // const itemSelect = document.getElementById('tripSelect').selectIndex
        debugger
        // this => instance of app container if we bind the app instance execution context when we pass in this function as an argument to the event listener
        console.log(this)
        fetch(`${this.url}/items`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: "blanket",
                trip: "Camping"
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    getPackingList() {
        // refresh PackingList before each time the user click "Submit" button:
        document.getElementById('packingList').innerHTML = "";
        this.getCustomizedItems()
    }

    getCustomizedItems() { 
        const chosenTrip= document.getElementById('chosenTrip').value;
        const customizedItems=AppContainer.items.filter(item => item.trip.name == chosenTrip);
        // initiate PackingList instance with this items
        new PackingList(customizedItems);
        // insert data into DOM
        const packingListDiv = document.getElementById('packingList');
        AppContainer.packingList.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = item.name;
            packingListDiv.appendChild(itemDiv);
        })   
    }

    getItems(){
        // make a fetch request to /items
        fetch(this.url + '/items')
        .then(resp => resp.json())
        // populate the items properties with the returned data
        .then(data => {
            console.log(data)
            data.forEach(item => {
                new Item(item.id, item.name, item.trip)
            });
            // call renderItems
            this.renderItems();
        })
        .catch(err => alert(err))
    }

    renderItems() {
    // can I use 'chosen trip" id instead of all the trips id? or use .value at the end of getElementByID?
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

