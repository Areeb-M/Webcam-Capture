var stream;
var clientPeer;
var connect_button;
var disconnect_button;
var server_id;
var status_msg;
var video_element;

var server_connection;
var connected = false;

async function on_connect() {
	if(!connected)
	{
		clientPeer = new Peer({ host: '192.168.1.69', port: 9090, path: '/' });
		try {
			stream = await navigator.mediaDevices.getUserMedia({video:true});
			video_element.srcObject = stream;
			status_msg.innerHTML = "Connected";
			
			server_connection = clientPeer.call('multistream-'+server_id.value, stream);
			connected = true;
		} catch(err) {
			console.log(err);
			status_msg.innerHTML = "Error!";
		}
	}
}

function on_disconnect() {
	clientPeer.destroy();
	status_msg.innerHTML = "Disconnected";
	stream.getTracks().forEach(track => track.stop());
	connected = false;
}

function on_load() {
	connect_button = document.querySelector("button#connect");
	disconnect_button = document.querySelector("button#disconnect");
	server_id = document.querySelector("input#serverID");
	status_msg = document.querySelector("span#status");
	video_element = document.querySelector("video#webcam");
	
	connect_button.onclick = on_connect;
	disconnect_button.onclick = on_disconnect;
}

window.onload = on_load;