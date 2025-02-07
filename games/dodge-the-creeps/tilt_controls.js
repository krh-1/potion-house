// Listen for device orientation changes and send tilt data to Godot
window.addEventListener("deviceorientation", (event) => {
    let tiltX = event.beta;  // Front-to-back tilt (-90 to 90 degrees)
    let tiltY = event.gamma; // Left-to-right tilt (-90 to 90 degrees)

    // Check if the Godot function exists before calling it
    if (typeof window.setGodotTilt === "function") {
        window.setGodotTilt(tiltX, tiltY);
    }
}, true);

/**
 * Function to request motion sensor permissions on iOS.
 * iOS requires user interaction before allowing access to motion sensors.
 */
function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    console.log("Motion sensors enabled"); // Debugging message
                }
            })
            .catch(console.error); // Log errors if permission request fails
    }
}