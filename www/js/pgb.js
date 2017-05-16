function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	$('#content').html( $('#main-content').html() ); 
}

function onDeviceReady() {
	navigator.notification.beep(2);
	deviceInfo();
}

function deviceInfo() {

	info =  'Device Model   : '    + device.model + '<br>' + 
			'Device Name    : '     + device.name + '<br>' + 
			'Device Cordova : '  + device.cordova + '<br>' + 
			'Device Platform: ' + device.platform + '<br>' + 
			'Device UUID    : '     + device.uuid + '<br>' + 
			'Device Version : '  + device.version + '<br>';

	navigator.notification.alert(myInfo);	
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


