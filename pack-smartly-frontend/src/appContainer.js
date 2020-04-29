class AppContainer {
    items = []
    trips = []
    url = "http://localhost:3000"
    packingList= {}

    getItems(){
        // make a fetch request to /weathers
        console.log('something')
        fetch(this.url + '/items')
        .then(resp => resp.json())
        .then(data => console.log(data))
        // populate the weathers and tripStyles properties with the returned data
        // call renderWeathers
        .catch(err => alert(err))
    }

    renderItems(){
        // create DOM nodes and insert data into them to render in the DOM

    }
}