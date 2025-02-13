// ✅ Ensure `setGodotTilt` is globally available
window.setGodotTilt = function (x, y) {
    console.log("✅ Received tilt:", x, y);
    if (typeof godotTilt === "function") {
        godotTilt(x, y); // Send tilt data to Godot
    } else {
        console.error("❌ godotTilt function is missing in Godot! Cannot send tilt data.");
    }
};

console.log("✅ setGodotTilt function is now defined globally.");

// ✅ Ensure `godotTilt` is exposed properly to JavaScript
if (!window.godotTilt) {
    console.warn("⚠️ godotTilt is not defined! Creating a placeholder.");
    window.godotTilt = function (x, y) {
        console.warn("⚠️ godotTilt was called but is not connected to Godot yet.");
    };
}

// ✅ Function to start listening for tilt events
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

// ✅ Function to request motion permission
function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        console.log("🔍 iOS detected: Requesting motion access...");

        // ✅ Create a user-triggered button
        var button = document.createElement("button");
        button.innerText = "Enable Tilt Controls";
        button.style.position = "absolute";
        button.style.top = "10px";
        button.style.left = "10px";
        button.style.zIndex = "1000";
        button.style.padding = "10px";
        button.style.background = "#28a745";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.onclick = function () {
            DeviceMotionEvent.requestPermission()
                .then((permissionState) => {
                    if (permissionState === "granted") {
                        console.log("✅ Motion sensors enabled!");
                        startTiltTracking();
                        button.remove(); // Remove button after permission is granted
                    } else {
                        console.error("❌ Motion permission denied! Tilt controls will not work.");
                    }
                })
                .catch((error) => {
                    console.error("❌ Error requesting motion permission:", error);
                });
        };

        document.body.appendChild(button);
    } else {
        console.log("⚠️ Motion permission request not needed.");
        startTiltTracking();
    }
}

// ✅ Ensure JavaScript function is available in Godot
if (typeof GodotRuntime !== "undefined") {
    console.log("✅ GodotRuntime detected, exposing `godotTilt`.");
    GodotRuntime.expose("godotTilt", function (x, y) {
        console.log("📡 Godot -> JavaScript: Tilt X:", x, "Y:", y);
    });
}

// ✅ Request motion permission on iOS
requestMotionPermission();