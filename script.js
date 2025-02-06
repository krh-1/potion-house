// Open the game modal
function openModal(game) {
    document.getElementById("game-modal").style.display = "block";
    document.getElementById("game-frame").src = "games/dodge-the-creeps/index.html"; // Loads the game
}

// Close the game modal
function closeModal() {
    document.getElementById("game-modal").style.display = "none";
    document.getElementById("game-frame").src = ""; // Stops the game when closing
}
