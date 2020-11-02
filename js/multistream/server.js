var serverID = Math.floor(Math.random() * 1000);
var serverPeer;
var server_id_message;
var bottom_div;


function on_call(call) {
	call.answer();
	const video = document.createElement("video");
	call.on('stream', function(stream) {
		video.setAttribute("autoplay", "true");
		video.srcObject = stream;
		
		document.body.append(video);
	});
	call.on('close', function() {
		video.remove();
		console.log("close");
	});
	call.on('error', function() {
		video.remove();
		console.log("error");
	});
	//serverPeer.connections[call.peer].on('close', function() {
	//	video.remove();
	//	console.log("close");
	//});
}

function on_load() {
	server_id_message = document.querySelector("span#serverid");
	bottom_div = document.querySelector("div#bottom");
	
	
	serverPeer = new Peer('multistream-'+serverID , { host: '192.168.1.69', port: 9090, path: '/' });
	server_id_message.innerHTML = serverID;
	serverPeer.on('call', on_call);
}


window.onload = on_load;