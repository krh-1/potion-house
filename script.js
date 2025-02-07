// Open the game modal
function openModal() {
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");

    if (modal && iframe) {
        modal.style.display = "flex"; // Show the modal
        iframe.src = "games/dodge-the-creeps/index.html"; // Load the game inside the modal
    } else {
        console.error("Modal or iframe not found!");
    }
}

// Close the game modal
function closeModal() {
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");

    if (modal && iframe) {
        modal.style.display = "none"; // Hide the modal
        iframe.src = ""; // Clear the game when closing
    } else {
        console.error("Modal or iframe not found!");
    }
}