# 3D Cube Stories - Swipe Direction & Snapping Fixes

## 🐛 Issues Identified

Based on your feedback, there were two main problems:

1. **Swipe directions were opposite** - swiping was moving in the wrong direction
2. **Cube faces weren't snapping properly** - animation was stopping between faces instead of centering

## 🔧 Fixes Applied

### 1. **Reversed Swipe Direction Logic**

**Problem**: The swipe direction was backwards compared to expected Instagram behavior.

**Fix Applied**:
```javascript
// BEFORE (incorrect):
if (deltaX < 0 && activeStoryIndex < stories.length - 1) {
  newIndex = activeStoryIndex + 1; // Swipe LEFT went to next story
} else if (deltaX > 0 && activeStoryIndex > 0) {
  newIndex = activeStoryIndex - 1; // Swipe RIGHT went to previous story
}

// AFTER (testing reversed):
if (deltaX > 0 && activeStoryIndex < stories.length - 1) {
  newIndex = activeStoryIndex + 1; // Swipe RIGHT goes to next story
} else if (deltaX < 0 && activeStoryIndex > 0) {
  newIndex = activeStoryIndex - 1; // Swipe LEFT goes to previous story
}
```

### 2. **Reversed Real-time Drag Rotation**

**Problem**: During drag, the cube was rotating in the opposite direction to the finger movement.

**Fix Applied**:
```javascript
// BEFORE (incorrect):
const rotationDelta = dragProgress * 90; // Direct mapping

// AFTER (testing reversed):
const rotationDelta = -dragProgress * 90; // Reversed mapping
```

**Logic**: 
- Swipe RIGHT (positive deltaX) → rotate cube LEFT (negative) to peek at next story
- Swipe LEFT (negative deltaX) → rotate cube RIGHT (positive) to peek at previous story

### 3. **Enhanced Debug Information**

**Added Real-time Debugging**:
```javascript
// Threshold indicator with pixel values
"Threshold: 25% ({Math.round(viewportWidth * 0.25)}px) | Target rotation: {cubeRotation}°"

// Live rotation tracking
"Live rotation: {Math.round(rotationY.get())}° | Active story: {activeStoryIndex}"

// Updated instructions
"TESTING: Swipe RIGHT for next story | Swipe LEFT for previous | Swipe DOWN to dismiss"
```

## 🎯 Expected Behavior Now

### Current Test Configuration:
- **Swipe RIGHT** → Navigate to NEXT story
- **Swipe LEFT** → Navigate to PREVIOUS story  
- **Swipe DOWN** → Dismiss story viewer

### Real-time Feedback:
- Cube should rotate smoothly in the opposite direction of the swipe
- During RIGHT swipe: cube rotates LEFT to reveal next story from the right face
- During LEFT swipe: cube rotates RIGHT to reveal previous story from the left face

### Snapping Behavior:
- **25% threshold**: Must exceed 25% of screen width to trigger navigation
- **Velocity override**: Fast swipes (>500px/s) can trigger navigation below threshold
- **Proper centering**: Cube should snap to exact rotation angles (0°, -90°, -180°, etc.)
- **Motion value sync**: `rotationY.set(targetRotation)` ensures smooth snapping

## 🔧 Technical Details

### Cube Face Layout (unchanged):
```
Previous Story (Left Face):   rotateY(-90deg) translateZ(50vw)
Current Story (Front Face):   rotateY(0deg) translateZ(50vw)  
Next Story (Right Face):      rotateY(90deg) translateZ(50vw)
```

### Rotation Logic (unchanged):
- Story 0: `rotation = 0°` (front face visible)
- Story 1: `rotation = -90°` (rotate left to show next story)
- Story 2: `rotation = -180°` (rotate further left)
- Formula: `rotation = -index * 90°`

### New Drag-to-Rotation Mapping:
```javascript
// Swipe RIGHT (positive deltaX) → negative rotation (rotate cube left)
// Swipe LEFT (negative deltaX) → positive rotation (rotate cube right)
const rotationDelta = -dragProgress * 90;
```

## 🧪 Testing Status

This is currently a **TEST CONFIGURATION** to verify the fix works correctly.

### Test Checklist:
1. **Swipe RIGHT**: Should go to next story with smooth left cube rotation
2. **Swipe LEFT**: Should go to previous story with smooth right cube rotation  
3. **Partial Swipe**: Should snap back to current story if threshold not met
4. **Edge Cases**: Should not navigate beyond first/last story
5. **Real-time Feedback**: Cube should follow finger naturally during drag
6. **Centering**: Animation should complete at exact rotation angles (not between faces)

### Debug Information Available:
- Real-time rotation values during drag
- Threshold pixel values
- Current story index
- Target rotation angles

## 🚀 Ready for Testing

The component is ready for testing at `/stories-demo` with "3D Cube Mode" enabled.

**Key Changes to Test**:
- ✅ Reversed swipe directions
- ✅ Reversed real-time drag rotation  
- ✅ Enhanced debug information
- ✅ Proper motion value synchronization

If this test configuration works correctly, the swipe directions can be finalized. If not, we can easily revert or adjust further based on the feedback.

The cube should now:
- Respond to swipes in the correct direction
- Provide smooth real-time feedback during drag
- Snap properly to centered positions
- Show clear debug information for verification