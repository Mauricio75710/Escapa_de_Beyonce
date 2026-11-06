const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');

const velJugador = document.getElementById('velJugador');
const velEnemigo = document.getElementById('velEnemigo');
const fondo = document.getElementById('fondo');

let playerPosition = {x: 100, y: 100 };
let beyoncePosition = {x: 900, y: 900 };

let playerSpeed = 40;

velJugador.addEventListener('input', () => {
	playerSpeed = Number(velJugador.value);
});
 
velEnemigo.addEventListener('input', () => {
	beyonceSpeed = Number(velEnemigo.value);
});
 
fondo.addEventListener('input', () => {
	if (fondo.value){
		gameArea.style.backgroundImage = `url('${fondo.value}')`;
	}else{
		gameArea.style.backgroundImage = 'none';
	}
});

velJugador.addEventListener('change', () => velJugador.blur());
velEnemigo.addEventListener('change', () => velEnemigo.blur());
fondo.addEventListener('change', () => fondo.blur());

window.addEventListener('keydown', (event) => {
	switch (event.key){
		case 'ArrowUp' :
			if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
		break;
		case 'ArrowDown' :
			if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
		break;
		case 'ArrowLeft' :
			if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
		break;
		case 'ArrowRight' :
			if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
		break;
	}
	updatePositions();
});

let beyonceSpeed = 1;

function moveBeyonce(){
	if (beyoncePosition.x < playerPosition.x){
		beyoncePosition.x += beyonceSpeed;
	}else if (beyoncePosition.x > playerPosition.x){
		beyoncePosition.x -= beyonceSpeed;
	}

	if (beyoncePosition.y < playerPosition.y){
		beyoncePosition.y += beyonceSpeed;
	}else if (beyoncePosition.y > playerPosition.y){
		beyoncePosition.y -= beyonceSpeed;
	}

	updatePositions();
	checkCollisions();

}

function updatePositions(){
	player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
	beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollisions(){
	if(Math.abs(playerPosition.x - beyoncePosition.x) < 50 && Math.abs(playerPosition.y - beyoncePosition.y) < 50){
		alert('¡¡Te atrapó!!');

		playerPosition = {x: 100, y: 100 };
		beyoncePosition = {x: 900, y: 900 };
	}
}

function gameLoop(){
	moveBeyonce();
	requestAnimationFrame(gameLoop);
}

gameLoop();
