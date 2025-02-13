// Ensure function is defined before use
window.setGodotTilt = function (x, y) {
    console.log("✅ Received tilt:", x, y);
    if (typeof godotTilt === "function") {
        godotTilt(x, y); // Send tilt data to Godot
    } else {
        console.warn("⚠️ godotTilt function is missing in Godot!");
    }
};

// Function to request motion sensor permissions on iOS
function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    console.log("✅ Motion sensors enabled!");
                    startTiltTracking(); // Start tracking tilt data
                } else {
                    console.error("❌ Motion permission denied!");
                }
            })
            .catch((error) => console.error("❌ Error requesting motion permission:", error));
    } else {
        console.log("⚠️ Motion permission request not needed on this device.");
        startTiltTracking(); // Start tracking immediately on non-iOS devices
    }
}

// Function to start listening for tilt events
function startTiltTracking() {
    window.addEventListener("deviceorientation", (event) => {
        let tiltX = event.beta; // Front-to-back tilt (-90 to 90 degrees)
        let tiltY = event.gamma; // Left-to-right tilt (-90 to 90 degrees)

        // Ensure function exists before calling
        if (typeof window.setGodotTilt === "function") {
            window.setGodotTilt(tiltX, tiltY);
        } else {
            console.warn("⚠️ setGodotTilt is not defined yet!");
        }
    }, true);
}

// Automatically request motion permission on iOS
requestMotionPermission();