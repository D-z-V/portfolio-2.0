import { Box } from "@mui/material";
import { keyframes } from '@mui/system';
import { useEffect, useState } from 'react';

const animationTime = 0.25;

const Story = (props) => {

    const [animation, setAnimation] = useState([ props.top + 50, props.left + 50]);

    const storyAnimation = keyframes`
        0% { height: 0; width: 0; top: ${props.top + 50}; left: ${props.left + 50}; background-size: 0; }
        100% { top: 0; left: 0; height: 100vh; width: 100vw; background-size: 100%; }
    `;

    


    if (props.clicked) {
        setTimeout(() => {
            setAnimation([0, 0]);
        }, animationTime * 1000);
    }

    useEffect(() => { 
    
    const images = [
        'https://images.unsplash.com/photo-1629809666562-baf250ce0593?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1629804861249-26cc9b4293e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
        'https://images.unsplash.com/photo-1629810222839-91468ac7c356?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1629781415336-cb00736ada19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1629808477866-496ef2a4e3e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1629770547093-dc6cc6c653df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
        'https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1629801892267-885d72f2dedf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      ]
      
      let touchX = 0
      let percentage = 0
      const scene = document.querySelector('.scene')
      const cube = document.querySelector('.cube')
      let index = 0
      let isMouseDownFlag = false
      
      setFaces()
      
      const touchStartHandler = (e) => {
        let target
        
        if (typeof e.touches !== 'undefined' && e.touches.length === 1) {
          target = e.touches[0]
        } else {
          target = e
          isMouseDownFlag = true
        }
        
        touchX = target.clientX
        
        e.preventDefault()
      }
      
      window.addEventListener('touchstart', touchStartHandler, {passive: false})
      window.addEventListener('mousedown', touchStartHandler, {passive: false})
      
      function isSwipeTo(direction, percentage) {
        if (direction === 'left') {
          return percentage > 0
        }
        
        if (direction === 'right') {
          return percentage < 0
        }
      }
      
      const touchMoveHandler = (e) => {
        let target
        
        if (typeof e.touches !== 'undefined' && e.touches.length === 1) {
          target = e.touches[0]
        } else {
          if (! isMouseDownFlag) {
            return
          }
          
          target = e
        }
        
        let offset = target.clientX - touchX
        percentage = offset / window.innerWidth
      
        // Keep the transition works
        if (percentage > 0.95) percentage = 0.95
        if (percentage < -0.95) percentage = -0.95
      
        // Prevent move to left for first image
        if (index === 0 && isSwipeTo('left', percentage)) {
          percentage = 0
        }
      
        // Prevent move to right for last image
        if (index === images.length - 1 && isSwipeTo('right', percentage)) {
          percentage = 0
        }
      
        scene.style.setProperty('--rotatePercent', `${percentage}`)
      
        e.preventDefault()
      }
      
      window.addEventListener('touchmove', touchMoveHandler, {passive: false})
      window.addEventListener('mousemove', touchMoveHandler, {passive: false})
      
      const touchEndHandler = (e) => {
        if (Math.abs(percentage) > 0.5 && Math.abs(percentage) <= 1) {
          if (percentage > 0) {
            percentage = 1
          } else {
            percentage = -1
          }
        } else {
          percentage = 0
        }
        
        turn(percentage)
        
        isMouseDownFlag = false
        
        e.preventDefault()
      }
      
      window.addEventListener('touchend', touchEndHandler, {passive: false})
      window.addEventListener('mouseup', touchEndHandler, {passive: false})
      
      function turn(direction) {
        if (direction === 1) { // Left
          index--
        } else if (direction === -1) { // Right
          index++
        }
        
        cube.classList.add('transition')
        scene.style.setProperty('--rotatePercent', direction)
      }
      
    cube.addEventListener('transitionend', () => {
        setFaces()
    })
      
      function setFaces() {
        const left = document.querySelector('.face-left')
        const front = document.querySelector('.face-front')
        const right = document.querySelector('.face-right')
        
        let leftIndex = (index === 0) ? 0 : index - 1
        let frontIndex = index
        let rightIndex = (index === images.length - 1) ? images.length - 1 : index + 1
        
        cube.classList.remove('transition')
        scene.style.setProperty('--rotatePercent', 0)
        
        left.style.backgroundImage = `url(${images[leftIndex]})`
        front.style.backgroundImage = `url(${images[frontIndex]})`
        right.style.backgroundImage = `url(${images[rightIndex]})`
      }

    }, []);

    return (
        <>

            <Box
                sx={{
                    backgroundColor: 'black',
                    height: '100vh',
                    position: 'absolute',
                    width: '100vw',
                    top: animation[0],
                    left: animation[1],
                    zIndex: '9999',
                    display: props.clicked ? 'block' : 'none',
                    animation: `${storyAnimation} ${animationTime}s ease-in`,

                }}
                className= "scene"
            >
                    <Box className="cube" sx={{ position: 'relative', width: '100vw', height: '100vh', transformStyle : 'preserve-3d', transform: 'translateZ(-50vw) rotateY(calc((1 - var(--rotatePercent)) * 90deg * -1))' }}>
                        <div class="face face-left" ></div>
                        <div class="face face-front"></div>
                        <div class="face face-right"></div>
                    </Box>
                </Box>
        </>
    )
}

export default Story;


