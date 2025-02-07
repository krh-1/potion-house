document.addEventListener("DOMContentLoaded", function () {
    // Ensure the modal elements exist
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");
    var closeBtn = document.querySelector(".close");

    if (!modal || !iframe || !closeBtn) {
        console.error("Modal elements not found!");
        return;
    }

    // Use event delegation to detect clicks on game cards
    document.addEventListener("click", function (event) {
        var gameCard = event.target.closest(".game-card");
        if (gameCard) {
            modal.style.display = "flex"; // Show modal
            iframe.src = "games/dodge-the-creeps/index.html"; // Load game in iframe
        }
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Hide modal
        iframe.src = ""; // Stop game when modal is closed
    });
});