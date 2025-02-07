document.addEventListener("DOMContentLoaded", function () {
    // Ensure the modal elements exist
    var modal = document.getElementById("game-modal");
    var iframe = document.getElementById("gameFrame");
    var closeBtn = document.querySelector(".close");

    if (!modal || !iframe || !closeBtn) {
        console.error("Modal elements not found!");
        return;
    }

    // Function to check WebGL 2 support
    function supportsWebGL2() {
        try {
            var canvas = document.createElement("canvas");
            return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
        } catch (e) {
            return false;
        }
    }

    // Open the game modal and force iframe reload
    function openModal() {
        var modal = document.getElementById("game-modal");
        var iframe = document.getElementById("gameFrame");
    
        if (modal && iframe) {
            modal.style.display = "flex"; // Show modal
            iframe.src = ""; // Clear previous game
    
            // Force game to reload to avoid WebGL issues
            setTimeout(function () {
                iframe.src = "games/dodge-the-creeps/index.html";
            }, 300); // Delayed reload helps avoid WebGL errors
        } else {
            console.error("Modal or iframe not found!");
        }
    }

    // Close the game modal
    function closeModal() {
        modal.style.display = "none"; // Hide modal
        iframe.src = ""; // Stop game when modal is closed
    }

    // Use event delegation to detect clicks on game cards
    document.addEventListener("click", function (event) {
        var gameCard = event.target.closest(".game-card");
        if (gameCard) {
            openModal(); // Open modal when clicking a game
        }
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", closeModal);
});