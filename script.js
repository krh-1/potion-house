// Open the game modal
function openModal() {
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");

    modal.style.display = "flex"; // Show the modal
    iframe.src = "games/dodge-the-creeps/index.html"; // Load the game
}

// Close the game modal
function closeModal() {
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");

    modal.style.display = "none"; // Hide the modal
    iframe.src = ""; // Clear the game to stop it when closing
}