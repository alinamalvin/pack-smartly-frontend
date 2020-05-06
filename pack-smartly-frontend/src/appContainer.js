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

        // buttton doesn`t work-prob because each button must have unique id, but now it belongs to entire division
        const removeButton = document.getElementById('button')
        removeButton.addEventListener("click", () => this.deleteItem);
    }

    createItem(event) {
        event.preventDefault()
        // maybe use object destructuring to be more DRY
        const data = event.target; 
        // this => instance of app container if we bind the app instance execution context when we pass in this function as an argument to the event listener
        console.log(this)
        fetch(`${this.url}/items`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.item.value,
                trip: data.children[2].value // refactor this to be more abstract
            })
        })
        .then(resp => resp.json())
        // fix the problem - the new item doesn`t have id and trip, so it is not pushing to Packing List
        .then(data => {
            const { id, name, trip } = data; 
            new Item(id, name, trip)
            this.packingList()
        })
        .catch(err => console.log(err))
    }

    // the method needs to be revisited
    deleteItems() {
        customizedItems.forEach(item =>  {
        fetch(`http://localhost:3000/items/${customizedItems.name}`, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json'
            }
            })
        })
        .then(resp => resp.json())
        .then(data => console.log('hello'))
    }


    getPackingList() {
        // refresh PackingList before each time the user click "Submit" button:
        document.getElementById('packingList').innerHTML = "";
        this.getCustomizedItems();
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
            const removeButton = document.createElement('button');
            removeButton.innerText= "Delete"
            itemDiv.appendChild(removeButton)
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
        const tripDiv = document.getElementById('chosenTrip')
        AppContainer.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = item.name;
            tripDiv.appendChild(itemDiv)
        // where  we append it will be conditional based on what trip it belongs to
        })
    }
} 


