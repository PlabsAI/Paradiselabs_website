# Project Structure Documentation

## Root Files

### index.html
- Entry point HTML file
- Contains:
  - Header with navigation and waitlist signup
  - Root div for React mounting
  - Links to:
    - styles.css
    - particles.css
    - jQuery (3.6.0)
    - PIXI.js (4.5.1)
    - main.tsx
    - particles.js
- Header Structure:
  - Logo section with image and text
  - Navigation menu with links (About, Features, Vision, Blog)
  - Action buttons (Join Waitlist, Early Access)
  - Mobile-responsive menu toggle
  - Waitlist counter display (Shows number of signups)
- Additional Dependencies:
  1. jQuery Integration
     - Version: 3.6.0
     - Loading priority: High
     - Placement: Head section
     - Purpose: DOM manipulation and events
  2. PIXI.js Integration
     - Version: 4.5.1
     - Loading priority: High
     - Placement: Head section
     - Purpose: Efficient particle rendering
  3. Particle System Files
     - particles.css: Style integration
     - particles.js: Core functionality
     - Loading priority: Deferred
     - Purpose: System initialization
- Script Loading Order:
  1. External dependencies (jQuery, PIXI.js)
  2. Core application styles
  3. Particle system styles
  4. React application
  5. Particle system initialization
- Technical Considerations:
  - Proper defer attributes
  - Dependency management
  - Load order optimization
  - Resource loading efficiency
- Purpose: Serves as the main HTML template for the React application and particle system integration

### styles.css
- Global stylesheet
- Contains:
  - Header styles:
    - Fixed positioning with blur backdrop
    - Responsive navigation menu
    - Logo and waitlist button styling
    - Mobile menu toggle animations
    - Waitlist counter animation effects
    - Media queries for responsive design
  - Black background setup
  - Gradient background effect with purple/pink hues
  - Star animation styles
  - Layout positioning for content
- Header Features:
  - Blur backdrop filter for modern glass effect
  - Gradient border bottom
  - Responsive navigation with mobile menu
  - Custom waitlist button with pulsing effect
  - Early access badge with exclusive styling
  - Smooth transitions and animations
  - Waitlist counter with dynamic number animation
- Purpose: Handles global styling, header layout, gradient background effect, and star animations

[Rest of the file remains unchanged...]
