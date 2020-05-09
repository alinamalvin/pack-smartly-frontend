class AppContainer {
    static items = []
    static trips = []
    url = "http://localhost:3000"
    static packingList= {}

    // RENDERING A PACKING LIST ONCE USER CLICKED THE BUTTON
    static getPackingList() {
        // refresh PackingList before each time the user click "Submit" button:
        document.getElementById('packingList').innerHTML = "";
        this.getCustomizedItems();
    }
    
    // RETRIEVING A LIST OF ITEMS FOR SELECTED TRIP
    static getCustomizedItems() { 
        // retrieving a list of items for selected Trip
        const chosenTrip= document.getElementById('chosenTrip').value;
        const customizedItems=AppContainer.items.filter(item => item.trip.name == chosenTrip);
        // initiate PackingList instance with filtered items
        new PackingList(customizedItems);
        // insert data into DOM
        const packingListDiv = document.getElementById('packingList');
        AppContainer.packingList.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = item.name;
            // creating a Delete button 
            const removeButton = document.createElement('button');
            removeButton.innerText= "Delete"
            removeButton.id = item.name
            removeButton.setAttribute("data-id", item.id)
            removeButton.classList.add('removeButtonClass')
            // inserting Delete button next to the item
            itemDiv.appendChild(removeButton)
            // inserting item a Packing List
            packingListDiv.appendChild(itemDiv);
        })  
            AppListeners.deleteButton()
    }

    // POPULATING DOM WITH ITEMS DATA FOR EACH TRIP
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


