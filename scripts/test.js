
var items = []; //global var for the list
var baseUrl = 'http://generalgeniusservices.co.za/api/items';


$(document).ready(function () {
    getItems(); //when the document is loaded, get the list of items
});

function getItems() {

    $.ajax({
        url: baseUrl,
        method: 'GET',
        success: function (response) {
            //from the web service, you will receive JSON text.  You need to parse this to an object.
            //Take a look at the object, and you'll see that it has a data property containing the list of items
            var itemsData = JSON.parse(response);
            items = itemsData.data;
            console.log(items); //check out your console to see what is logged when the items are loaded :)

        displayItems();
},
        error: function () {
            alert('Something went wrong while loading the list of items')
        }
    })
}

function postNewItem() {
    //get some variables from form inputs
    var item = {};
    item.name = document.getElementById('name').value; //do this for all the fields you need.
    //You should need a name and a description for new items in the shopper_api services.

    var itemJSON = JSON.stringify(item); //this converts the new item that you're creating to JSON text so that you can send it to the web service
    $.ajax({
        url: baseUrl,
        method: 'POST',
        data: itemJSON
        success: function () {
            alert('Your item was saved');
            getItems(); //reload the list
        },
        error: function () {
            alert('Your item could not be saved');
        }
    })
}

function displayItems() {
    var container = document.getElementById('listItemsContainer');  //this is just some container that you can display your items in

    //use jQuery.each to run through your list of items, one item at a time.  Google the $.each function :)
    $.each(items, function (item) {
        //add some HTML to the container
        //remember, your items array contains objects that have name and description properties.
        //this is where item.name and item.description come from
        $(container).append('<div>' + item.name + ': ' + item.description + '</div>');
    });
}
