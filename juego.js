// Referencias a los elementos
const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const goal = document.getElementById("goal");
const obstacles = document.querySelectorAll(".obstacle");

// Variables de estado del juego y posición
let playerX = 10;   // Posición horizontal (eje X)
let playerY = 35;   // Posición vertical (eje Y)
const playerSize = 30;

// Dimensiones del juego
const gameWidth = 600;
const gameHeight = 100; // Alto del contenedor (ver style.css)

// Dimensiones de los obstáculos (Ajustamos estos valores)
const obsWidth = 25;  // Ancho de los nuevos cuadrados
const obsHeight = 25; // Alto de los nuevos cuadrados

const moveSpeed = 10;
let isGameOver = false;

// ---------------------------------------------
// 1. Manejo del Movimiento con Teclado (4 Direcciones)
// ---------------------------------------------

document.addEventListener("keydown", (event) => {
    if (isGameOver) return;

    if (event.key === "ArrowRight") {
        // Mover a la derecha (eje X)
        playerX = Math.min(playerX + moveSpeed, gameWidth - playerSize);
    } else if (event.key === "ArrowLeft") {
        // Mover a la izquierda (eje X)
        playerX = Math.max(playerX - moveSpeed, 0);
    } else if (event.key === "ArrowUp") {
        // Mover hacia arriba (eje Y)
        playerY = Math.max(playerY - moveSpeed, 0); 
    } else if (event.key === "ArrowDown") {
        // Mover hacia abajo (eje Y)
        playerY = Math.min(playerY + moveSpeed, gameHeight - playerSize);
    }

    // Actualizar la posición del personaje en la pantalla para AMBOS ejes
    player.style.left = playerX + "px";
    player.style.top = playerY + "px"; 
});

// ---------------------------------------------
// 2. Bucle de Chequeo de Estado (Colisión y Victoria)
// ---------------------------------------------

function checkGameStatus() {
    if (isGameOver) return;

    // A) Chequeo de Colisión con Obstáculos
    obstacles.forEach(obstacle => {
        // NOTA: Usamos getComputedStyle para obtener las posiciones actuales del CSS
        const obsX = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        const obsY = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
        
        // Lógica de Colisión 2D: Superposición en el Eje X Y Superposición en el Eje Y
        
        // Superposición en el Eje X (horizontal)
        const overlapX = playerX + playerSize > obsX && playerX < obsX + obsWidth;
        
        // Superposición en el Eje Y (vertical)
        const overlapY = playerY + playerSize > obsY && playerY < obsY + obsHeight;

        if (overlapX && overlapY) {
            endGame("¡Perdiste! Has chocado con un obstáculo.", false);
        }
    });

    // B) Chequeo de Victoria (llegar a la meta)
    const goalX = gameWidth - 50; // La meta empieza en 600px - 50px de ancho

    if (playerX + playerSize >= goalX) {
        endGame("🎉 ¡Felicidades! ¡Has llegado a la meta! 🎉", true);
    }
}

// ---------------------------------------------
// 3. Función de Fin de Juego
// ---------------------------------------------

function endGame(message, isWin) {
    isGameOver = true;
    
    player.style.backgroundColor = isWin ? "gold" : "black";
    
    document.getElementById("message").textContent = message + " Recarga para volver a jugar.";
}

// ---------------------------------------------
// 4. Iniciar el Bucle de Chequeo
// ---------------------------------------------
setInterval(checkGameStatus, 50);