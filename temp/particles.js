// Clean up existing instance if present
if (window.Nodes) {
    if (window.Nodes.animation) {
        cancelAnimationFrame(window.Nodes.animation);
    }
    if (window.Nodes.renderer) {
        window.Nodes.renderer.destroy(true);
    }
    if (window.Nodes.stage) {
        window.Nodes.stage.destroy(true);
    }
}

window.Nodes = {
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
    isInitialized: false, // Track initialization state

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
        // Prevent multiple initializations
        if (this.isInitialized) {
            // Update dimensions without reinitializing
            this.siteWidth = width || window.innerWidth;
            this.siteHeight = height || window.innerHeight;
            this.positionX = positionX || 0;
            this.positionY = positionY || 0;
            this.onWindowResize();
            return;
        }

        // Set dimensions and position with fixed values
        this.siteWidth = window.innerWidth;
        this.siteHeight = window.innerHeight;
        this.positionX = 0;
        this.positionY = 0;
        this.canvasPadding = 0;
        this.mouseRadius = 100;
        this.startDelay = 0;
        this.isAnimating = true;
        this.mouseDisabled = false;
        this.isStartupPhase = false;
    
        // Renderer setup with fixed positioning
        const rendererOptions = {
            transparent: true,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1
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
    
        if (!this.renderer) {
            console.error('Failed to initialize renderer');
            return;
        }

        this.manager = this.renderer.plugins.interaction;
    
        // Renderer position and initial opacity with fixed positioning
        this.renderer.view.style.position = 'fixed';
        this.renderer.view.style.left = '0';
        this.renderer.view.style.top = '-20%'; // Move particles higher
        this.renderer.view.style.width = '100vw';
        this.renderer.view.style.height = '100vh';
        this.renderer.view.style.opacity = '1';
        this.renderer.view.style.pointerEvents = 'none';
        this.renderer.view.style.zIndex = '1000';
    
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
            if (!ctx) {
                console.error('Failed to get canvas context');
                return;
            }
            ctx.beginPath();
            ctx.arc(5, 5, 5, 0, Math.PI * 2);
            ctx.fillStyle = dotColor || '#000000';
            ctx.fill();
            this.texture = PIXI.Texture.from(canvas);

            this.newmouse = this.manager.mouse;
            if (this.newmouse) {
                this.newmouse.global.x = -1000;
                this.newmouse.global.y = -1000;
            }

            // Event listeners
            window.addEventListener('resize', this.debounce(() => {
                this.siteWidth = window.innerWidth;
                this.siteHeight = window.innerHeight;
                this.onWindowResize();
            }, 250));

            this.renderer.view.addEventListener('mousedown', () => {
                if (this.isAnimating && !this.mouseDisabled && !this.isStartupPhase) this.blackhole = true;
            });
            
            this.renderer.view.addEventListener('mouseup', () => {
                if (this.isAnimating && !this.mouseDisabled && !this.isStartupPhase) this.blackhole = false;
            });

            if (this.stage) {
                this.stage.interactive = true;
                this.stage.on('mousemove', this.onMouseMove.bind(this));
                this.stage.on('touchmove', this.onTouchMove.bind(this));
            }

            window.addEventListener("touchend", this.onTouchEnd.bind(this));
            window.addEventListener("mouseout", this.onMouseOut.bind(this));

            // Start loading the data and animate the starting blackhole effect
            setTimeout(() => {
                this.loadData(image || 'https://i.imgur.com/gFVigiC.png');
                
                // Set startup mouse position
                this.startupMousePos = {
                    x: (this.siteWidth / 2) + this.canvasPadding,
                    y: (this.siteHeight / 2) + this.canvasPadding
                };
                
                // Trigger initial animation
                this.isAnimating = true;
                this.blackhole = true;
                this.reactionSensitivity = -500;

                // Schedule the end of initial animation
                setTimeout(() => {
                    this.isStartupPhase = false;
                    this.blackhole = false;
                    this.reactionSensitivity = 6;
                    if (this.newmouse) {
                        this.newmouse.global.x = -1000;
                        this.newmouse.global.y = -1000;
                    }
                    
                    // Enable mouse interactions after initial animation
                    setTimeout(() => {
                        this.mouseDisabled = false;
                    }, 500);
                }, 1000);
            }, this.startDelay);
        }, 0);

        // Mark as initialized
        this.isInitialized = true;
    },

    loadData: function(data) {
        if (!data) {
            console.error('No image data provided');
            return;
        }

        this.bgImage = new Image();
        this.bgImage.crossOrigin = "anonymous";
        this.bgImage.src = data;

        this.bgImage.onload = () => {
            this.bgCanvas = document.createElement('canvas');
            if (!this.bgCanvas) {
                console.error('Failed to create background canvas');
                return;
            }
            this.bgCanvas.width = this.siteWidth + (this.canvasPadding * 2);
            this.bgCanvas.height = this.siteHeight + (this.canvasPadding * 2);
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
        if (!this.bgImage || !this.bgCanvas) {
            console.error('Background image or canvas not initialized');
            return;
        }

        this.bgContext = this.bgCanvas.getContext('2d', { willReadFrequently: true });
        if (!this.bgContext) {
            console.error('Failed to get background context');
            return;
        }

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

        // Clear the background canvas before redrawing
        this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);

        // Draw to background canvas with padding offset
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
            this.drawPixies();
            this.draw();
        } catch (error) {
            console.error('Error processing image:', error);
        }
    },

    onWindowResize: function() {
        // Only proceed if initialization is complete
        if (!this.bgCanvas || !this.bgImage || !this.renderer) {
            console.log("Skipping resize - initialization not complete");
            return;
        }

        // Update dimensions
        this.siteWidth = window.innerWidth;
        this.siteHeight = window.innerHeight;

        // Clear the entire canvas
        this.clearCanvas();

        // Resize renderer
        this.renderer.resize(
            this.siteWidth + (this.canvasPadding * 2),
            this.siteHeight + (this.canvasPadding * 2)
        );

        // Update canvas dimensions
        this.bgCanvas.width = this.siteWidth + (this.canvasPadding * 2);
        this.bgCanvas.height = this.siteHeight + (this.canvasPadding * 2);

        // Redraw background image and recalculate points
        this.drawImageToBackground();

        // Update startup mouse position if in startup phase
        if (this.isStartupPhase) {
            this.startupMousePos = {
                x: (this.siteWidth / 2) + this.canvasPadding,
                y: (this.siteHeight / 2) + this.canvasPadding
            };
        }
    },

    clearCanvas: function() {
        // Clear the PIXI stage
        while(this.stage.children[0]) {
            this.stage.removeChild(this.stage.children[0]);
        }

        // Clear the background canvas
        if (this.bgCanvas) {
            this.bgContext = this.bgCanvas.getContext('2d', { willReadFrequently: true });
            if (this.bgContext) {
                this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
            }
        }

        // Clear the renderer
        this.renderer.clear();
    },

    preparePoints: function() {
        if (!this.bgContextPixelData) {
            console.error('Pixel data not available');
            return;
        }

        this.points = [];
        const colors = this.bgContextPixelData.data;
    
        for (let i = 0; i < this.siteHeight; i += this.density) {
            for (let j = 0; j < this.siteWidth; j += this.density) {
                const pixelPosition = (j + i * this.bgContextPixelData.width) * 4;
    
                // Skip if pixel position is out of bounds
                if (pixelPosition >= colors.length) continue;

                // Skip white pixels
                const threshold = 10;
                if (Math.abs(colors[pixelPosition] - 255) < threshold && 
                    Math.abs(colors[pixelPosition + 1] - 255) < threshold && 
                    Math.abs(colors[pixelPosition + 2] - 255) < threshold || 
                    colors[pixelPosition + 3] === 0) {
                    continue;
                }
    
                const color = `rgba(${colors[pixelPosition]},${colors[pixelPosition + 1]},${colors[pixelPosition + 2]},1)`;
                    
                this.points.push({
                    x: j + this.canvasPadding,
                    y: i + this.canvasPadding,
                    originalX: j + this.canvasPadding,
                    originalY: i + this.canvasPadding,
                    color: color
                });
            }
        }
    },
    
    updatePoints: function() {
        // Early return if animation is not running
        if (!this.isAnimating || !this.stage || !this.stage.children) {
            return;
        }

        // Use startup position during startup phase
        const mouseX = this.isStartupPhase ? this.startupMousePos.x : (this.newmouse ? this.newmouse.global.x : -1000);
        const mouseY = this.isStartupPhase ? this.startupMousePos.y : (this.newmouse ? this.newmouse.global.y : -1000);

        if (this.blackhole) {
            this.reactionSensitivity = this.isStartupPhase ? -500 : -10;
        } else {
            this.reactionSensitivity = this.isNear() ? 6 : 0;
        }

        // Safety check for points array
        if (!this.points || this.points.length === 0) {
            return;
        }

        for (let i = 0; i < this.stage.children.length; i++) {
            // Safety check for array bounds
            if (!this.points[i] || !this.stage.children[i]) {
                continue;
            }

            const originalPoint = this.points[i];
            const currentPoint = this.stage.children[i];

            if (!currentPoint.position) {
                continue;
            }

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
        // Only continue animation if we're properly initialized
        if (!this.stage || !this.renderer) {
            console.warn('Draw called before proper initialization');
            return;
        }

        this.animation = requestAnimationFrame(() => this.draw());
        this.updatePoints();
        this.drawPoints();
    },

    drawPixies: function() {
        // Clear existing sprites
        while(this.stage.children[0]) {
            this.stage.removeChild(this.stage.children[0]);
        }

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

        // Force a render to update the stage
        this.renderer.render(this.stage);
    },

    onMouseMove: function(event) {
        if (!this.mouseDisabled && !this.isStartupPhase) {
            this.newmouse.global.x = event.data.global.x;
            this.newmouse.global.y = event.data.global.y;
        }
    },

    onTouchMove: function(event) {
        if (!this.mouseDisabled && !this.isStartupPhase) {
            this.newmouse.global.x = event.data.global.x;
            this.newmouse.global.y = event.data.global.y;
        }
    },

    onTouchEnd: function() {
        if (!this.mouseDisabled && !this.isStartupPhase) {
            this.newmouse.global.x = -1000;
            this.newmouse.global.y = -1000;
        }
    },

    onMouseOut: function() {
        if (!this.mouseDisabled && !this.isStartupPhase) {
            this.newmouse.global.x = -1000;
            this.newmouse.global.y = -1000;
        }
    },

    updatePointPositions: function() {
        if (this.stage && this.stage.children && this.points) {
            this.stage.children.forEach((dot, index) => {
                if (this.points[index]) {
                    const point = this.points[index];
                    dot.position.x = point.x;
                    dot.position.y = point.y;
                }
            });
        }
    },

    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
};

// Ensure proper cleanup before re-initialization
window.initializeNodes = function() {
    // Only initialize if not already initialized
    if (window.Nodes && window.Nodes.isInitialized) {
        return;
    }

    window.Nodes.init(
        'https://i.imgur.com/gFVigiC.png', // image URL
        1,                                 // particle density
        0.15,                              // particle width
        0.15,                              // particle height
        '#D9D9BD',                         // dot color
        window.innerWidth,                 // width in pixels
        window.innerHeight,                // height in pixels
        0,                                 // positionX
        0,                                 // positionY
        0,                                 // canvasPadding
        70,                                // mouseRadius (in pixels)
        0                                  // startDelay (in milliseconds)
    );
    
    // Ensure renderer is visible
    if (window.Nodes && window.Nodes.renderer && window.Nodes.renderer.view) {
        window.Nodes.renderer.view.style.opacity = '1';
    }
};

// Call initialization
window.initializeNodes();
