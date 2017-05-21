function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	$('#content').html( $('#main-content').html() ); 
}

function onDeviceReady() {
	navigator.notification.beep(2);
	
	var options      = new ContactFindOptions();
options.filter   = "";
options.multiple = true;
fillter="name
var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        for (var j = 0; j < contacts[i].addresses.length; j++) {
            alert("Pref: "         + contacts[i].addresses[j].pref          + "\n" +
                "Type: "           + contacts[i].addresses[j].type          + "\n" +
                "Formatted: "      + contacts[i].addresses[j].formatted     + "\n" +
                "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
                "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
                "Region: "         + contacts[i].addresses[j].region        + "\n" +
                "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
                "Country: "        + contacts[i].addresses[j].country);
        }
    }
};


function deviceInfo() {

	info =  'Device Model   : '    + device.model + '<br>' + 
			'Device Name    : '     + device.name + '<br>' + 
			'Device Cordova : '  + device.cordova + '<br>' + 
			'Device Platform: ' + device.platform + '<br>' + 
			'Device UUID    : '     + device.uuid + '<br>' + 
			'Device Version : '  + device.version + '<br>';

	navigator.notification.alert(info);	
}

$( document ).on( "pagecreate", "#demo-page", function() {
    $( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});
function mainView() {

	 $('#content').html( $('#main-content').html() ); 
	 
}

function meetingView() {

	 $('#content').html( $('#meeeting-content').html() ); 
	 
}

function addMeetingView() {

	 $('#content').html( $('#add-meeeting-content').html() ); 
	 
}

function authorView() {

	 $('#content').html( $('#author-content').html() ); 

	 
}function mapView() {

	 $('#content').html( $('#googleMap').html() ); 
	 
}

function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


