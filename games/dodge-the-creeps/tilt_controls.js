// ✅ Ensure `setGodotTilt` is globally available
window.setGodotTilt = function (x, y) {
    console.log("✅ Received tilt:", x, y);
    if (typeof godotTilt === "function") {
        godotTilt(x, y); // Send tilt data to Godot
    } else if (typeof GodotRuntime !== "undefined" && GodotRuntime.call) {
        console.log("📡 Sending tilt data via GodotRuntime...");
        GodotRuntime.call("godotTilt", x, y);
    } else {
        console.error("❌ godotTilt function is missing in Godot! Cannot send tilt data.");
    }
};

// ✅ Ensure `godotTilt` is globally available before sending data
window.godotTilt = function (x, y) {
    console.log("📡 JavaScript -> Godot: Tilt X:", x, "Y:", y);
    if (typeof GodotRuntime !== "undefined" && GodotRuntime.call) {
        GodotRuntime.call("godotTilt", x, y);
    } else {
        console.warn("⚠️ GodotRuntime is not available yet. Retrying...");
        setTimeout(() => { window.godotTilt(x, y); }, 1000);
    }
};

// ✅ Function to start listening for tilt events
function startTiltTracking() {
    console.log("🔄 Starting tilt tracking...");

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

// ✅ Ensure `requestMotionPermission` is globally accessible
window.requestMotionPermission = function() {
    console.log("🔍 Checking for motion permissions...");

    if (typeof DeviceMotionEvent.requestPermission === "function") {
        console.log("🔍 iOS detected: Creating user-triggered button...");

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
            console.log("🟢 Button clicked: Requesting motion access...");
            DeviceMotionEvent.requestPermission()
                .then((permissionState) => {
                    if (permissionState === "granted") {
                        console.log("✅ Motion sensors enabled!");
                        button.remove(); // Remove button after permission is granted
                        startTiltTracking();
                    } else {
                        console.error("❌ Motion permission denied! Tilt controls will not work.");
                    }
                })
                .catch((error) => {
                    console.error("❌ Error requesting motion permission:", error);
                });
        };

        document.body.appendChild(button);
        console.log("✅ Button added to page.");
    } else {
        console.log("⚠️ Motion permission request not needed.");
        startTiltTracking();
    }
};

// ✅ Automatically request motion permission on page load
window.requestMotionPermission();

// ✅ Ensure `godotTilt` is available before sending tilt data
(function() {
    "use strict";
    console.log("🔧 Checking if godotTilt is available...");

    function waitForGodot() {
        if (typeof godotTilt === "function") {
            console.log("✅ godotTilt is available! Tilt data will be sent.");
            return;
        }
        console.warn("⚠️ Waiting for godotTilt to be defined...");
        setTimeout(waitForGodot, 1000);
    }

    waitForGodot();
})();