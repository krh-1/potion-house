extends Area2D

signal hit  # Signal emitted when the player collides with an enemy

@export var speed = 400  # Speed of the player in pixels per second
var screen_size  # Stores the size of the game window
var tilt_x = 0  # Normalized tilt value for forward/backward movement
var tilt_y = 0  # Normalized tilt value for left/right movement
var sensitivity = 2.0  # Multiplier to adjust how strong tilt movement is

func _ready() -> void:
	"""
	Called when the node enters the scene tree for the first time.
	Initializes screen size and sets up JavaScript interaction if running in a web browser.
	"""
	screen_size = get_viewport_rect().size  # Get game window size

	# Check if the game is running in a web browser
	if OS.has_feature("JavaScript"):
		print("✅ Running in Web Browser - Enabling Tilt Controls")

		# Load tilt_controls.js dynamically using the full URL
		var js_code = """
		var script = document.createElement('script');
		script.src = 'https://www.potionho.us/games/dodge-the-creeps/tilt_controls.js';
		script.onload = function() {
			console.log('✅ tilt_controls.js loaded successfully!');
			
			// Wait 1 second before checking if setGodotTilt is defined
			setTimeout(function() {
				if (typeof window.setGodotTilt !== 'function') {
					console.error('❌ setGodotTilt is still undefined after script load!');
				} else {
					console.log('✅ setGodotTilt is now available.');
				}
			}, 1000);
		};
		script.onerror = function() {
			console.error('❌ Failed to load tilt_controls.js! Check the URL or server settings.');
		};
		document.head.appendChild(script);
		"""
		
		# ✅ FIX: Use JavaScriptBridge instead of JavaScript
		JavaScriptBridge.eval(js_code, true)

func _process(delta: float) -> void:
	"""
	Called every frame. Handles player movement via keyboard and tilt input.
	"""
	var velocity = Vector2.ZERO  # Initialize movement vector

	# **Keyboard Controls (For Desktop)**
	if Input.is_action_pressed("move_right"):
		velocity.x += 1
	if Input.is_action_pressed("move_left"):
		velocity.x -= 1
	if Input.is_action_pressed("move_up"):
		velocity.y -= 1
	if Input.is_action_pressed("move_down"):
		velocity.y += 1

	# **Tilt Controls (For Mobile)**
	velocity.x += tilt_y * sensitivity  # Left/right tilt affects horizontal movement
	velocity.y += tilt_x * sensitivity  # Forward/backward tilt affects vertical movement

	# Normalize movement if there's input
	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		$AnimatedSprite2D.play()  # Play movement animation
	else:
		$AnimatedSprite2D.stop()  # Stop animation if not moving

	# Move player position and keep it within screen bounds
	position += velocity * delta
	position = position.clamp(Vector2.ZERO, screen_size)

	# Handle animation and sprite flipping based on movement direction
	if velocity.x != 0:
		$AnimatedSprite2D.animation = "walk"
		$AnimatedSprite2D.flip_v = false
		$AnimatedSprite2D.flip_h = velocity.x < 0  # Flip horizontally if moving left
	elif velocity.y != 0:
		$AnimatedSprite2D.animation = "up"
		$AnimatedSprite2D.flip_v = velocity.y > 0  # Flip vertically if moving downward

# Function to receive tilt data from JavaScript
func godotTilt(x, y):
	"""
	This function is called from JavaScript whenever tilt data is updated.
	It stores the tilt values and normalizes them between -1 and 1.
	"""
	tilt_x = x / 90.0  # Normalize tilt values (-1 to 1)
	tilt_y = y / 90.0

	# Debugging output to check tilt values
	print("📡 Tilt X:", tilt_x, "Tilt Y:", tilt_y)

func _on_body_entered(body: Node2D) -> void:
	"""
	Called when the player collides with an enemy.
	The player disappears, emits a hit signal, and disables the collision.
	"""
	hide()  # Player disappears after being hit
	hit.emit()  # Emit signal to notify other parts of the game
	$CollisionShape2D.set_deferred("disabled", true)  # Disable collision to prevent multiple hits

func start(pos):
	"""
	Resets the player's position, shows the player, and enables collision.
	Called when the game restarts.
	"""
	position = pos
	show()
	$CollisionShape2D.disabled = false
