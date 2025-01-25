import {createServer} from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server);

let count = 0;
app.use(express.static('public')); // <-- Serveur de fichiers statiques

app.get('/', (req, res) => {
	res.redirect('/index.html'); // <-- Redirection vers la page d'accueil
});


io.on('connection', (socket) => {
	console.log('Client connected');

	// On écoute l'événement 'click' envoyé par le client
	socket.on('click', () => {
		count++;
		// On envoie l'événement 'click' avec le compteur de clics à tous les clients connectés
		io.emit('click', count);	
	});
});

server.listen(3000, () => { // <-- Démarrage du serveur
	console.log('Server is running on port 3000');
});

// Exemple de serveur Express avec un serveur HTTP

io.on('connection', (socket)=>{
	console.log('A user connected');

	io.emit('system_message', {
		content: `Welcome to ${socket.id} !`,	
	});

	socket.on ('disconnected', ()=> {
		console.log('User disconnected');
		io.emit('system_message',{
			content: `A jamais to  ${socket.id}	!`,})

	});

socket.on('user_message_send',(data)=>{
	console.log('nouveau message' ,data);
	io.emit('user_message', {
		author: socket.id,
		content: data.content,
		time : new Date().toLocaleTimeString(),
		isMe : false
});
}
)


});