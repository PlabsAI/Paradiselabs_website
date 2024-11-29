const Nodes = {
    // Original settings
    density: 6,
    drawDistance: 1,
    baseRadius: 2,
    maxLineThickness: 4,
    reactionSensitivity: 4,
    lineThickness: 5,
    scaleX: 0.5,
    scaleY: 0.5,
    positionX: 0,
    positionY: 0,
    canvasPadding: 0,
    
    // Modified settings
    mouseRadius: 100,      // Default mouse interaction radius in pixels
    startDelay: 0,        // Delay before animation starts in milliseconds
    isAnimating: false,   // Flag to track if animation should be running
    isStartupPhase: true, // New flag to track initial animation phase

    points: [],
    mouse: {
        x: -1000,
        y: -1000,
        down: false
    },

    animation: null,
    canvas: null,
    context: null,
    imageInput: null,
    bgImage: null,
    bgCanvas: null,
    bgContext: null,
    bgContextPixelData: null,
    stage: new PIXI.Container(),
    manager: null,
    renderer: null,
    texture: null,
    newmouse: null,
    theta: null,
    blackhole: false,
    mouseDisabled: true,  // Start with mouse disabled
    startupMousePos: { x: 0, y: 0 }, // Store startup mouse position

    siteWidth: window.innerWidth,
    siteHeight: window.innerHeight,
    
    is_firefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    isLoaded: false,
    currentNum: 0,
    loadAttempts: 0,
    maxLoadAttempts: 3,
  
    init: function(image, particleDensity, particleWidth, particleHeight, dotColor, width, height, positionX, positionY, canvasPadding, mouseRadius, startDelay) {
		// Set dimensions and position
		this.siteWidth = width || window.innerWidth;
		this.siteHeight = height || window.innerHeight;
		this.positionX = positionX || 0;
		this.positionY = positionY || 0;
		this.canvasPadding = canvasPadding || 0;
		this.mouseRadius = mouseRadius || 100;
		this.startDelay = startDelay || 0;
		this.isAnimating = false;
		this.mouseDisabled = true;
		this.isStartupPhase = true;
	
		// Renderer setup with transparent background
		const rendererOptions = {
			transparent: true,
			backgroundAlpha: 0
		};
	
		this.scaleX = parseFloat(particleWidth || 0.5);
		this.scaleY = parseFloat(particleHeight || 0.5);
		this.density = this.siteWidth > 480 ? parseInt(particleDensity || 2) : 7;
	
		if (!this.isLoaded) {
			this.renderer = PIXI.autoDetectRenderer(
				this.siteWidth + (this.canvasPadding * 2), 
				this.siteHeight + (this.canvasPadding * 2), 
				rendererOptions
			);
		}
	
		this.manager = this.renderer.plugins.interaction;
	
		// Renderer position and initial opacity
		this.renderer.view.style.position = 'absolute';
		this.renderer.view.style.left = `${this.positionX}px`;
		this.renderer.view.style.top = `${this.positionY}px`;
		this.renderer.view.style.opacity = '0';
		this.renderer.view.style.transition = 'opacity 0.5s ease-in';
	
		// Start animation after delay
		setTimeout(() => {
			document.body.appendChild(this.renderer.view);
			setTimeout(() => {
				this.renderer.view.style.opacity = '1';
			}, 50);
	
			// Custom dot texture
			const canvas = document.createElement('canvas');
			canvas.width = 10;
			canvas.height = 10;
			const ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(5, 5, 5, 0, Math.PI * 2);
			ctx.fillStyle = dotColor || '#000000';
			ctx.fill();
			this.texture = PIXI.Texture.from(canvas);
	
			this.newmouse = this.manager.mouse;
			this.newmouse.global.x = -1000;
			this.newmouse.global.y = -1000;
	
			// Event listeners
			window.addEventListener('resize', () => {
				this.siteWidth = width || window.innerWidth;
				this.siteHeight = height || window.innerHeight;
				this.onWindowResize();
			});
	
			this.renderer.view.addEventListener('mousedown', () => {
				if (this.isAnimating && !this.mouseDisabled && !this.isStartupPhase) this.blackhole = true;
			});
			
			this.renderer.view.addEventListener('mouseup', () => {
				if (this.isAnimating && !this.mouseDisabled && !this.isStartupPhase) this.blackhole = false;
			});
	
			this.stage.interactive = true;
			this.stage.on('touchmove', this.onTouchMove.bind(this));
	
			window.addEventListener("touchend", this.onTouchEnd);
			window.addEventListener("mouseout", this.onTouchEnd);
	
			// Start loading the data and animate the starting blackhole effect
			setTimeout(() => {
				this.loadData(image || 'https://i.imgur.com/wTz7QCr.png');
				
				// Set startup mouse position
				this.startupMousePos = {
					x: (this.siteWidth / 2) + this.canvasPadding,
					y: (this.siteHeight / 2) + this.canvasPadding
				};
				
				// Trigger initial animation
				this.isAnimating = true;
				this.blackhole = true;
				this.reactionSensitivity = -10;  // Restored to original value
	
				// Schedule the end of initial animation
				setTimeout(() => {
					this.isStartupPhase = false;
					this.blackhole = false;
					this.reactionSensitivity = 4;  // Restored to original value
					this.newmouse.global.x = -1000;
					this.newmouse.global.y = -1000;
					
					// Enable mouse interactions after initial animation
					setTimeout(() => {
						this.mouseDisabled = false;
					}, 500);
				}, 1000);
			}, this.startDelay);
		}, 0);
	},
	
    loadData: function(data) {
        this.bgImage = new Image();
        this.bgImage.crossOrigin = "anonymous";
        this.bgImage.src = data;

        this.bgImage.onload = () => {
            this.drawImageToBackground();
        };

        this.bgImage.onerror = () => {
            this.loadAttempts++;
            if (this.loadAttempts < this.maxLoadAttempts) {
                console.warn(`Image load attempt ${this.loadAttempts} failed, retrying...`);
                setTimeout(() => this.loadData(data), 1000 * this.loadAttempts);
            } else {
                console.error('Failed to load image after multiple attempts');
            }
        };
    },

    drawImageToBackground: function() {
        this.bgCanvas = document.createElement('canvas');
        this.bgCanvas.width = this.siteWidth + (this.canvasPadding * 2);
        this.bgCanvas.height = this.siteHeight + (this.canvasPadding * 2);

        let newWidth, newHeight;

        // Scale image if too large
        if (this.bgImage.width > (this.bgCanvas.width - 100) || this.bgImage.height > (this.bgCanvas.height - 100)) {
            const maxRatio = Math.max(
                this.bgImage.width / (this.bgCanvas.width - this.canvasPadding * 2),
                this.bgImage.height / (this.bgCanvas.height - this.canvasPadding * 2)
            );
            newWidth = this.bgImage.width / maxRatio;
            newHeight = this.bgImage.height / maxRatio;
        } else {
            newWidth = this.bgImage.width;
            newHeight = this.bgImage.height;
        }

        // Draw to background canvas with padding offset
        this.bgContext = this.bgCanvas.getContext('2d');
        this.bgContext.drawImage(
            this.bgImage, 
            (this.siteWidth - newWidth) / 2 + this.canvasPadding, 
            (this.siteHeight - newHeight) / 2 + this.canvasPadding, 
            newWidth, 
            newHeight
        );

        try {
            this.bgContextPixelData = this.bgContext.getImageData(0, 0, this.bgCanvas.width, this.bgCanvas.height);
            this.preparePoints();
            this.draw();
            this.drawPixies();
        } catch (error) {
            console.error('Error processing image:', error);
        }
    },

    preparePoints: function() {
        this.points = [];
        const colors = this.bgContextPixelData.data;
    
        for (let i = 0; i < this.siteHeight; i += this.density) {
            for (let j = 0; j < this.siteWidth; j += this.density) {
                const pixelPosition = (j + i * this.bgContextPixelData.width) * 4;
    
                // Skip white pixels
                const threshold = 10;
                if (Math.abs(colors[pixelPosition] - 255) < threshold && Math.abs(colors[pixelPosition + 1] - 255) < threshold && Math.abs(colors[pixelPosition + 2] - 255) < threshold || colors[pixelPosition + 3] === 0) {
                    continue;
                }
    
                const color = `rgba(${colors[pixelPosition]},${colors[pixelPosition + 1]},${colors[pixelPosition + 2]},1)`;
                    
                this.points.push({
                    x: j,
                    y: i,
                    originalX: j,
                    originalY: i,
                    color: color
                });
            }
        }
    },
    
    updatePoints: function() {
        if (!this.isAnimating) {
            return;
        }

        // Use startup position during startup phase
        const mouseX = this.isStartupPhase ? this.startupMousePos.x : this.newmouse.global.x;
        const mouseY = this.isStartupPhase ? this.startupMousePos.y : this.newmouse.global.y;

        if (this.blackhole) {
            this.reactionSensitivity = this.isStartupPhase ? -25 : -25;  // Consistent force for blackhole effect
        } else {
            this.reactionSensitivity = this.isNear() ? 4 : 0;  // Restored to original value
        }

        for (let i = 0; i < this.stage.children.length; i++) {
            const originalPoint = this.points[i];
            const currentPoint = this.stage.children[i];

            // Calculate distance from mouse to point
            const dx = currentPoint.position.x - mouseX;
            const dy = currentPoint.position.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only affect points within mouseRadius
            if (distance <= this.mouseRadius) {
                this.theta = Math.atan2(dy, dx);
                
                const force = (this.reactionSensitivity * this.mouseRadius) / distance;

                currentPoint.position.x += Math.round(100 * (
                    Math.cos(this.theta) * force + 
                    (originalPoint.originalX - currentPoint.position.x) * 0.05
                )) / 100;

                currentPoint.position.y += Math.round(100 * (
                    Math.sin(this.theta) * force + 
                    (originalPoint.originalY - currentPoint.position.y) * 0.05
                )) / 100;
            } else {
                // Return to original position if outside radius
                currentPoint.position.x += (originalPoint.originalX - currentPoint.position.x) * 0.05;
                currentPoint.position.y += (originalPoint.originalY - currentPoint.position.y) * 0.05;
            }
        }
    },

    isNear: function() {
        const x = this.isStartupPhase ? this.startupMousePos.x : this.newmouse.global.x;
        const imageWidth = this.bgImage.width;
        const left = ((this.siteWidth/2) - (imageWidth/2)) - (this.siteWidth/10);
        const right = ((this.siteWidth/2) + (imageWidth/2)) + (this.siteWidth/10);
        return (x > left && x < right);
    },

    drawPoints: function() {
        this.renderer.render(this.stage);
    },

    draw: function() {
        this.animation = requestAnimationFrame(() => this.draw());
        this.updatePoints();
        this.drawPoints();
    },

    drawPixies: function() {
        for (let i = 0; i < this.points.length; i++) {
            const currentPoint = this.points[i];
            const dot = new PIXI.Sprite(this.texture);
            
            dot.scale = new PIXI.Point(this.scaleX, this.scaleY);
            dot.interactive = true;
            dot.anchor.x = 0.5;
            dot.anchor.y = 0.5;
            dot.position.x = currentPoint.x;
            dot.position.y = currentPoint.y;
            
            this.stage.addChild(dot);
        }
    },

    onTouchEnd: function() {
        if (!Nodes.mouseDisabled && !Nodes.isStartupPhase) {
            Nodes.newmouse.global.x = -1000;
            Nodes.newmouse.global.y = -1000;
        }
    },

    onTouchMove: function(event) {
        if (!this.mouseDisabled && !this.isStartupPhase) {
            this.newmouse.global.x = event.data.global.x;
            this.newmouse.global.y = event.data.global.y;
        }
    },

    onWindowResize: function() {
        this.renderer.resize(
            this.siteWidth + (this.canvasPadding * 2),
            this.siteHeight + (this.canvasPadding * 2)
        );

        // Update canvas dimensions
        this.bgCanvas.width = this.siteWidth + (this.canvasPadding * 2);
        this.bgCanvas.height = this.siteHeight + (this.canvasPadding * 2);

        // Redraw background image and points
        this.drawImageToBackground();

        // Adjust positions for the new dimensions
        this.stage.children.forEach((dot, index) => {
            const originalPoint = this.points[index];
            dot.position.x = originalPoint.x;
            dot.position.y = originalPoint.y;
        });

        // Update startup mouse position if in startup phase
        if (this.isStartupPhase) {
            this.startupMousePos = {
                x: (this.siteWidth / 2) + this.canvasPadding,
                y: (this.siteHeight / 2) + this.canvasPadding
            };
        }

        console.log("Window resized, renderer and points updated.");
    }
};

