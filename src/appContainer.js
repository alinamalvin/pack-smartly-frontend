class AppContainer {
    static items = []
    static trips = []
    url = "http://localhost:3000"
    static packingList= {}

    static bindEventListeners() {
        // can join two codes into one later
        const btn = document.getElementById('createPackingList')
        // clicking the button initiates an empty funcition that calls getPackingList method on the eventListener: 
        btn.addEventListener('click', () => this.getPackingList(this))

        const newItemForm = document.getElementById('newItem')
        newItemForm.addEventListener('submit', () => AppAdapter.createItem(event))
    }

    static getPackingList() {
        // refresh PackingList before each time the user click "Submit" button:
        document.getElementById('packingList').innerHTML = "";
        this.getCustomizedItems();
    }

    static getCustomizedItems() { 
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
            deleteButtonName.addEventListener('click', () => AppAdapter.deleteItem(event) & event.target.parentElement.remove())
        })
    }

    static renderItems() {
    // create DOM nodes and insert data into them to render in the DOM
        const tripDiv = document.getElementById('chosenTrip')
        AppContainer.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = item.name;
            tripDiv.appendChild(itemDiv)
        })
    }
} 


