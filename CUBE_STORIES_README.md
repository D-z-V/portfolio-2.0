# Instagram-Style 3D Cube Stories Implementation

This implementation provides a high-fidelity, Instagram-inspired 3D cube stories component with smooth transitions, gesture navigation, and performance optimizations.

## 🎯 Features

### 1. True 3D Cube Navigation
- **Real 3D Transforms**: Uses CSS 3D transforms with `transform-style: preserve-3d` and `perspective` properties
- **Cube Rotation**: Each story is positioned on a different face of a 3D cube (front, left, right)
- **Smooth Transitions**: Spring-based animations with proper easing functions
- **Real-time Rotation**: 1:1 finger-to-rotation mapping during drag gestures

### 2. Advanced Gesture Recognition
- **Direction Locking**: Distinguishes between horizontal (navigation) and vertical (dismiss) gestures
- **Threshold-based Navigation**: 30% swipe threshold with velocity-based overrides
- **Elastic Boundaries**: Prevents navigation beyond available stories with visual feedback
- **Touch Optimizations**: Optimized for both mobile touch and desktop mouse interactions

### 3. Performance Optimizations
- **Hardware Acceleration**: All animations use GPU-accelerated CSS transforms
- **Memory Efficiency**: Only renders 3 story faces at any time (previous, current, next)
- **Will-change Properties**: Optimized for smooth 60fps animations
- **Backface Culling**: Uses `backface-visibility: hidden` to prevent rendering issues

### 4. Accessibility & UX
- **Keyboard Navigation**: Full arrow key and Escape key support
- **Focus Management**: Proper focus handling for screen readers
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences
- **High Contrast**: Enhanced visibility in high contrast mode
- **Debug Information**: Real-time feedback for development and testing

## 🏗️ Technical Architecture

### Core Technologies
- **React 18**: Modern React with hooks and concurrent features
- **Framer Motion**: Advanced animation library with gesture support
- **CSS 3D Transforms**: Native browser 3D rendering capabilities
- **Material-UI**: UI components and theming system

### File Structure
```
src/components/Stories/
├── StoryCube.js          # Main 3D cube component
├── StoryCube.css         # 3D cube specific styles
├── Story.js              # Original story component
└── index.js              # Stories container with toggle
```

### 3D Cube Mathematics
```css
/* Cube perspective and positioning */
perspective: 300vw;
transform: translateZ(-50vw) rotateY(${rotation}deg);

/* Face positions */
.story-left   { transform: rotateY(-90deg) translateZ(50vw); }
.story-front  { transform: rotateY(0deg) translateZ(50vw); }
.story-right  { transform: rotateY(90deg) translateZ(50vw); }
```

## 🚀 Usage

### Basic Implementation
```jsx
import StoryCube from '@/components/Stories/StoryCube';

function MyComponent() {
  const [activeStory, setActiveStory] = useState(null);
  
  return (
    <StoryCube
      clicked={activeStory !== null}
      setActiveIndex={setActiveStory}
      storyId={activeStory?.id}
      top={position?.top}
      left={position?.left}
    />
  );
}
```

### With Toggle Between Modes
```jsx
import Story from '@/components/Stories/Story';
import StoryCube from '@/components/Stories/StoryCube';

function StoriesContainer() {
  const [use3DCube, setUse3DCube] = useState(false);
  const StoryComponent = use3DCube ? StoryCube : Story;
  
  return (
    <>
      <button onClick={() => setUse3DCube(!use3DCube)}>
        {use3DCube ? '3D Cube ON' : '3D Cube OFF'}
      </button>
      
      <StoryComponent
        clicked={activeStory !== null}
        setActiveIndex={handleClose}
        storyId={activeStory?.id}
      />
    </>
  );
}
```

## 🎮 Interaction Guide

### Touch Gestures (Mobile)
- **Horizontal Swipe**: Navigate between stories with 3D cube rotation
- **Vertical Swipe Down**: Dismiss story viewer with scale/opacity feedback
- **Tap**: Activate story or close with close button

### Mouse Controls (Desktop)
- **Click & Drag Horizontal**: Rotate cube to navigate between stories
- **Click & Drag Vertical**: Dismiss story viewer
- **Click Close Button**: Exit story viewer

### Keyboard Controls
- **Arrow Left/Right**: Navigate between stories with smooth cube rotation
- **Escape**: Close story viewer
- **Tab**: Navigate between interactive elements (accessibility)

## 🔧 Configuration

### Animation Timing
```javascript
// Cube rotation spring configuration
const springConfig = {
  type: "spring",
  stiffness: 800,
  damping: 40,
  duration: 0.25
};

// Dismiss animation configuration
const dismissConfig = {
  type: "spring",
  stiffness: 1200,
  damping: 50,
  duration: 0.1
};
```

### Gesture Thresholds
```javascript
// Navigation threshold (30% of screen width)
const navigationThreshold = viewportWidth * 0.3;

// Dismiss threshold (10% of screen height)
const dismissThreshold = viewportHeight * 0.1;

// Velocity override threshold
const velocityThreshold = 500; // pixels per second
```

### 3D Perspective Settings
```css
/* Desktop perspective */
perspective: 300vw;
transform: translateZ(-50vw);

/* Mobile optimized perspective */
@media (max-width: 768px) {
  perspective: 200vw;
  transform: translateZ(-25vw);
}
```

## 📱 Responsive Design

### Mobile Optimizations
- Reduced perspective depth for better performance on mobile GPUs
- Touch-optimized gesture recognition with proper touch-action properties
- Optimized transform values for smaller screens

### Desktop Enhancements
- Full perspective depth for immersive 3D experience
- Mouse drag support with momentum-based navigation
- Enhanced keyboard navigation

## ♿ Accessibility Features

### Screen Reader Support
```jsx
<motion.div
  role="dialog"
  aria-label="Story viewer"
  aria-modal="true"
>
  <IconButton aria-label="Close story viewer">
    <CloseIcon />
  </IconButton>
</motion.div>
```

### Keyboard Navigation
- Full keyboard support for all interactions
- Logical tab order and focus management
- Clear focus indicators

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  .stories-cube {
    transition: none;
  }
}
```

## 🔍 Debug Features

### Real-time Information
The component includes debug overlays showing:
- Current story index and total count
- Cube rotation angle in degrees
- Drag direction detection (horizontal/vertical/none)
- Dragging state indicator
- Usage instructions

### Performance Monitoring
- Hardware acceleration status
- Transform optimization indicators
- Memory usage for rendered faces

## 🎨 Customization

### Cube Dimensions
```javascript
// Adjust cube size and perspective
const cubeSize = '50vw'; // Half viewport width
const perspective = '300vw'; // 6x cube size for optimal viewing
```

### Animation Curves
```javascript
// Custom easing functions
const customEasing = [0.4, 0, 0.2, 1]; // Material Design standard
const bounceEasing = [0.68, -0.55, 0.265, 1.55]; // Bounce effect
```

### Story Face Positioning
```javascript
// Custom face transforms for different cube layouts
const faceTransforms = {
  left: 'rotateY(-90deg) translateZ(50vw)',
  front: 'rotateY(0deg) translateZ(50vw)',
  right: 'rotateY(90deg) translateZ(50vw)',
  // Add more faces for complex layouts
  top: 'rotateX(90deg) translateZ(50vw)',
  bottom: 'rotateX(-90deg) translateZ(50vw)',
};
```

## 🐛 Troubleshooting

### Common Issues

1. **3D transforms not working**
   - Ensure `transform-style: preserve-3d` is set on parent
   - Check that `perspective` is applied to the container
   - Verify hardware acceleration is enabled

2. **Choppy animations on mobile**
   - Reduce perspective values for mobile devices
   - Ensure `will-change: transform` is set
   - Check for memory leaks in gesture handlers

3. **Gesture conflicts**
   - Verify `touch-action` properties are correctly set
   - Check drag direction detection logic
   - Ensure proper event handling cleanup

### Performance Optimization
```javascript
// Force hardware acceleration
style={{
  willChange: 'transform',
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden'
}}
```

## 🔮 Future Enhancements

### Planned Features
- **Multi-axis Rotation**: Support for vertical cube rotation
- **Infinite Scroll**: Seamless looping through large story collections
- **Custom Transitions**: Pluggable transition effects beyond cube rotation
- **Story Progress**: Visual progress indicators for each story
- **Social Features**: Like, share, and comment functionality

### Performance Improvements
- **Virtual Scrolling**: Only render visible story content
- **WebGL Acceleration**: GPU-accelerated 3D rendering for complex effects
- **Memory Pooling**: Reuse DOM elements for better performance
- **Intersection Observer**: Optimize loading and unloading of story content

## 📄 Browser Support

### Minimum Requirements
- **Chrome**: 36+ (full 3D transform support)
- **Firefox**: 16+ (CSS 3D transforms)
- **Safari**: 9+ (webkit 3D transforms)
- **Edge**: 12+ (modern transform support)

### Feature Detection
```javascript
// Check for 3D transform support
const has3DSupport = () => {
  const el = document.createElement('div');
  el.style.transform = 'translateZ(0)';
  return el.style.transform !== '';
};
```

## 🤝 Contributing

When contributing to the 3D cube stories implementation:

1. **Test on Multiple Devices**: Verify performance on various mobile and desktop devices
2. **Accessibility Compliance**: Ensure all changes maintain accessibility standards
3. **Performance Testing**: Check for memory leaks and animation performance
4. **Cross-browser Testing**: Verify compatibility across supported browsers
5. **Documentation**: Update this README for any new features or changes

## 📊 Performance Metrics

### Target Performance
- **60 FPS**: Smooth animations on all supported devices
- **< 100ms**: Gesture response time
- **< 16ms**: Frame render time
- **< 50MB**: Memory usage for 5 active stories

### Monitoring
```javascript
// Performance monitoring example
const startTime = performance.now();
// ... animation code ...
const endTime = performance.now();
console.log(`Animation took ${endTime - startTime} milliseconds`);
```

---

For technical questions or issues, please refer to the main project documentation or create an issue in the repository.