// Ensure Godot function exists before calling
window.setGodotTilt = function (x, y) {
    console.log("✅ Received tilt:", x, y);

    if (typeof godotTilt === "function") {
        godotTilt(x, y); // Send tilt data to Godot
    } else {
        console.error("❌ godotTilt function is missing in Godot! Cannot send tilt data.");
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
                    console.error("❌ Motion permission denied! Tilt controls will not work.");
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
    console.log("🔄 Starting tilt tracking...");
    
    if (!window.setGodotTilt) {
        console.error("❌ setGodotTilt is undefined! Attempting to redefine...");
        window.setGodotTilt = function(x, y) {
            console.log("✅ Received tilt:", x, y);
            if (typeof godotTilt === "function") {
                godotTilt(x, y);
            } else {
                console.error("❌ godotTilt function is missing in Godot!");
            }
        };
    }

    window.addEventListener("deviceorientation", (event) => {
        let tiltX = event.beta; // Front-to-back tilt (-90 to 90 degrees)
        let tiltY = event.gamma; // Left-to-right tilt (-90 to 90 degrees)

        if (typeof window.setGodotTilt === "function") {
            window.setGodotTilt(tiltX, tiltY);
        } else {
            console.warn("⚠️ setGodotTilt is not defined yet! Tilt data not sent.");
        }
    }, true);

    console.log("✅ Tilt tracking enabled!");
}

// Automatically request motion permission on iOS
requestMotionPermission();