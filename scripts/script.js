//these variables are available in all the below functions, also known as the Global Scope
var items = [];
var baseUrl = 'http://generalgeniusservices.co.za/api/items';
var currentItem = 0;
var itemIsNew = false;

$(document).ready(function () {
    getItems();
});

//this function gets all the information from the server and selects which function is used to edit that particular item (get, post, delete, put)
function getItems() {
   $.ajax({
       dataType: 'json',
       url: baseUrl, //tells this function where to receive this information
       method: 'GET', //what function is being used (GET receives the information from the server)
       //then it is to a JSON.parse to create an object so that it can be used in the following functions to come

       //this is what will happen if the above function is successful
       success: function (response) {
           items =response.data;
           console.log(items);
           displayItems();
       },

       //this is will happen if the above function fails
       error: function () {
           alert('Something has gone wrong while loading the list of items')
       }
   });

}

function saveItem() {
    if(itemIsNew){
        postNewItem();
    }
    else {
        updateItem();
    }
}


function postNewItem() {
    var item = {}; //create an object to contain our new item
    //get some variables from form inputs
    item.name = $('#name').val(); //this means document.getElementyId('name').value
    item.description = $('#description').val();

    $.ajax({
        url: baseUrl, //tell this function where to send the information
        method: 'POST', //what function is being used (POST sends information to the server)
        data: item, //this tells the server what kind of data is being sent (JSON text)

        //this is what will happen if the above function is successful
        success: function () {
            alert('Your item was saved.');
            getItems();
        },
        //this is will happen if the above function fails
        error: function () {
            alert('Your item could not be saved.');
        }
    });
}

function displayItems() {
    //jQuery.each ($.each) runs through the list of items one by one
    var container = document.getElementById('tableItems'); //this doesn't have a .value because this is where the items will be displayed
    $(container).html('');

    if(items.length > 0) {
        $('#listEmpty').hide();
    }
    else{
        $('#listEmpty').show();
    }

    $.each(false); {
        var bought = 'boughtText';
        if (item.bought === 1) {
            bought = 'Yes';
        } else {
            bought = 'No';
        }
    }

    //add some HTML to the container
    //remember, your items array contains objects that have name and description properties.
    //this is where item.name and item.description come from
    $.each(items, function (key, item){
        console.log(key + ' is: ', item);
        //adding rows to the display table. Note: You are first using html, then after the onclick function you're adding javascript and then back to html.
        $(container).append('<tr><td>' + item.name + '</td><td>' + item.description + '</td><td>' + boughtText + '</td><td>' + '<button class="btn btn-success" onclick="editItem(' + key + ')">Edit</button>' + ' <button class="btn btn-danger" onclick="deleteItem(' + key + ')">Delete item</button>' + '</td></tr>');
    });
}

//creating a function to edit the items that already exist by calling the index in the items array. [index is referring to an index in the array].
function editItem(index) {
    $('#name').val(items[index].name);
    $('#description').val(items[index].description);
    //the modal is being reused.
    $('#newItemModal').modal('show');
    currentItem = index;
    itemIsNew = false;
}

function updateItem(){
    //update variables from form inputs
    items[currentItem].name = $('#name').val(); //this means document.getElementyId('name').value
    items[currentItem].description = $('#description').val();
    items[currentItem].bought = $('#bought').val();

    var url = baseUrl + '/' + items[currentItem].id + '/?_method=PUT' ;

    $.ajax({
        url: url, //tell this function where to send the information
        method: 'POST', //what function is being used (POST sends information to the server)
        data: items[currentItem], //this tells the server what kind of data is being sent (JSON text)

        //this is what will happen if the above function is successful
        success: function () {
            alert('Your item was saved.');
            getItems();
        },
        //this is will happen if the above function fails
        error: function () {
            alert('Your item could not be saved.');
        }
    });
}

function deleteItem(index) {
    //all variables from form inputs are deleted


    var url = baseUrl + '/' + items[index].id + '/?_method=DELETE';

    $.ajax({
        url: url, //tell this function where to send the information
        method: 'POST', //what function is being used (POST sends information to the server)


        //this is what will happen if the above function is successful
        success: function () {
            alert('Your item was deleted.');
            getItems();
        },
        //this is will happen if the above function fails
        error: function () {
            alert('Your item could not be deleted.');
        }
    });
}