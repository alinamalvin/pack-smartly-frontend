class AppAdapter {
    static url = "http://localhost:3000"

    // CREATE ITEM
    static createItem(event) {
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
            AppContainer.getPackingList()
        })
        .catch(err => console.log(err))
    }

    // DELETE ITEM
    static deleteItem(event) {
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

    // READ ITEMS
    static getItems(){
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
            AppContainer.renderItems();
        })
        .catch(err => alert(err))
    }
}