# Project Structure

## Root Files

### index.html
- Entry point HTML file
- Structure:
  - Meta configurations for viewport and charset
  - External dependencies:
    - jQuery 3.6.0 (required for particle system)
    - PIXI.js 4.5.1 (particle rendering)
  - Stylesheet links:
    - particles.css
    - styles.css
  - Header section:
    - Logo with image
    - Navigation menu (About, Features, Vision, Blog)
    - Waitlist button with pulse effect
    - Mobile menu toggle
  - Root div for React mounting
  - Script imports:
    - particles.js
    - main.tsx (React entry)

### styles.css
- Global styling file
- Features:
  - Base styles and resets
  - Header styling:
    - Glass morphism effect with blur backdrop
    - Gradient border bottom
    - Responsive navigation
    - Logo and button styles
  - Animation keyframes:
    - hue-rotate for color effects
    - spiralToCenter for particle movement
  - Button styling:
    - Primary button with gradient effects
    - Border animations
    - Hover states
  - Responsive design:
    - Mobile menu adaptations
    - Breakpoint at 1248px
  - Black hole styling:
    - Container positioning
    - Star particle effects
    - Spiral animations
    - Performance optimizations

### Text_maker.py
- Python-based text image generator
- Features:
  - System font detection across Windows/macOS/Linux
  - GUI interface using tkinter
  - Image generation with:
    - Custom text input
    - Font selection with filtering
    - Color customization (background/text)
    - Padding and resolution control
  - Advanced image processing:
    - Oversampling for quality
    - Anti-aliasing
    - Proper text bounding
  - Save functionality with PNG output
- Components:
  - Font management system
  - Preview system
  - Error handling
  - File dialogs

### package.json
- Project configuration
- Scripts:
  - `dev`: Vite development server
  - `build`: TypeScript compilation
  - `preview`: Production build preview
- Dependencies:
  - react: ^18.2.0
  - react-dom: ^18.2.0
  - styled-components
  - PIXI.js
- Dev dependencies:
  - TypeScript tools
  - Vite build system
  - React type definitions

### .gitattributes
- Git configuration file
- Defines:
  - File handling rules
  - Line ending normalizations
  - Binary file markers

### Configuration Files
- tsconfig.json:
  - TypeScript compiler options
  - Module resolution settings
  - Strict type checking
- tsconfig.node.json:
  - Node-specific TypeScript settings
  - Build tool configurations
- vite.config.ts:
  - Vite bundler setup
  - Plugin configurations
  - Build optimizations

## Source Directory (src/)

### main.tsx
- React application entry point
- Initializes React with strict mode
- Mounts root App component

### App.tsx
- Root React component
- Features:
  - Particle system management
  - Black hole effect coordination
  - Star generation and physics
- Key systems:
  - Particle spawning (CONFIG object)
  - Physics calculations
  - Collision detection
  - Performance optimization
- Animations:
  - Particle movement
  - Star trails
  - Black hole effects

### components/

#### Loader.tsx
- Black hole visualization component
- Visual elements:
  - Event horizon
  - Photon rings
  - Accretion disk
  - Horizon lines
- Technical features:
  - CSS-based animations
  - Hardware acceleration
  - Error boundaries
  - Performance optimizations
- Styled components:
  - Complex gradients
  - Dynamic animations
  - Responsive scaling

### particles/

#### particles.js
- PIXI.js particle system
- Core features:
  - Dynamic particle generation
  - Physics-based movement
  - Interactive controls
  - Black hole effects
- Technical implementation:
  - Canvas management
  - Sprite handling
  - Event system
  - Performance optimization
- Configuration options:
  - Particle density
  - Animation timing
  - Interaction sensitivity
  - Visual parameters

#### particles.css
- Particle system styling
- Canvas positioning
- Layer management
- Performance classes

## Descriptive Files Directory

### descriptive_files/
#### core_product_description.md
- Product documentation
- Technical specifications
- Implementation details
- Usage guidelines

## Visual Effects System

### Black Hole Visualization
- Scientific elements:
  - Event horizon
  - Light bending
  - Gravitational lensing
  - Matter accretion
- Technical implementation:
  - CSS animations
  - WebGL acceleration
  - Canvas rendering
  - SVG patterns

### Particle Systems
1. React-based particles:
   - Orbital mechanics
   - Black hole interaction
   - Dynamic spawning
   - Performance optimization
2. PIXI.js particles:
   - Image-based generation
   - Physics simulation
   - Interactive behavior
   - Touch support

### Theme System
- Colors:
  - Deep purple: #9333EA
  - Bright purple: #A855F7
  - Light purple: #F5F3FF
  - Space black: #020C10
- Effects:
  - Glass morphism
  - Gradient patterns
  - Glow effects
  - Blur filters

## Integration Architecture

### Layer Management
- Z-index hierarchy:
  1. Header (z-index: 10)
  2. Base application
  3. Particle system
  4. Black hole visualization
- Positioning:
  - Fixed header
  - Absolute overlays
  - Responsive scaling

### Event System
- Mouse/Touch events
- Window resize handling
- Animation coordination
- Performance optimization

### Browser Support
- Modern browsers:
  - Chrome
  - Firefox
  - Safari
  - Edge
- Features:
  - WebGL
  - CSS3
  - Touch events
  - Hardware acceleration

## Development Workflow
1. Setup: `npm install`
2. Development: `npm run dev`
3. Building: `npm run build`
4. Preview: `npm run preview`
