class AppListeners {
    // EVENT LISTENERS
    static bindEventListeners() {
    // clicking the button initiates an empty funcition that calls getPackingList method on the eventListener: 
        document.getElementById('createPackingList').addEventListener('click', () => AppContainer.getPackingList(this))
        document.getElementById('newItem').addEventListener('submit', () => AppAdapter.createItem(event))
    }

    static deleteButton() {
        const deleteButtonName = Array.from(document.getElementsByClassName('removeButtonClass'))
        deleteButtonName.forEach(deleteButtonName => {
            deleteButtonName.addEventListener('click', () => AppAdapter.deleteItem(event) & event.target.parentElement.remove())
        })
 
    }
}