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
                trip: data.tripSelect.value  
            })
        })
        .then(resp => resp.json())
        .then(data => {
            const { id, name, trip } = data; 
            new Item(id, name, trip)
            this.getPackingList()
        })
        .catch(err => console.log(err))
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
            removeButton.id = item.name
            removeButton.setAttribute("data-id", item.id)
            removeButton.classList.add('removeButtonClass')
            itemDiv.appendChild(removeButton)
            packingListDiv.appendChild(itemDiv);
        })  
        const deleteButtonName = Array.from(document.getElementsByClassName('removeButtonClass'))
        deleteButtonName.forEach(deleteButtonName => {
            deleteButtonName.addEventListener('click', () => this.deleteItem(event) & event.target.parentElement.remove())
        })
    }

    deleteItem(event) {
        event.preventDefault()
        const data = event.target.dataset.id
        fetch(`http://localhost:3000/items/${data}`, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    getItems(){
        // make a fetch request to /items
        fetch('http://localhost:3000/items')
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
    // create DOM nodes and insert data into them to render in the DOM
        const tripDiv = document.getElementById('chosenTrip')
        AppContainer.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = item.name;
            tripDiv.appendChild(itemDiv)
        })
    }
} 


