// Open the game modal
// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get the game card and modal elements
    var gameCard = document.querySelector(".game-card");
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");
    var closeBtn = document.querySelector(".close");

    // Ensure elements exist before adding event listeners
    if (gameCard && modal && iframe && closeBtn) {
        // Open modal when clicking the game card
        gameCard.addEventListener("click", function () {
            modal.style.display = "flex"; // Show modal
            iframe.src = "games/dodge-the-creeps/index.html"; // Load game in iframe
        });

        // Close modal when clicking the close button
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none"; // Hide modal
            iframe.src = ""; // Stop game when modal is closed
        });
    } else {
        console.error("One or more modal elements not found.");
    }
});

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