import { Box, Button, IconButton } from "@mui/material";
import { keyframes } from '@mui/system';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';

const animationTime = 0.2;

const Story = (props) => {

    const [clicked, setClicked] = useState(props.clicked);
    const [animation, setAnimation] = useState([props.top + 50, props.left + 50]);
    const [background, setBackground] = useState('0');
    const [progress, setProgress] = useState(0);

    const storyAnimation = keyframes`
                0% { height: 0; width: 0; top: ${props.top + 50}; left: ${props.left + 50}; }
                100% { top: 0; left: 0; height: 100vh; width: 100vw; }
        `;


    if (props.clicked) {
        setTimeout(() => {
            setBackground('100% 80svh');
            setAnimation([0, 0]);
        }, animationTime * 700);
    }

    const handleClose = () => {
        setClicked(false);
        props.setActiveIndex(null);

    };



    useEffect(() => {
        const duration = 3000; // 5 seconds
        const steps = 100;
        const interval = duration / steps;

        const timer = setInterval(() => {
        setProgress((oldProgress) => {
            const increment = 100 / steps;
            const newProgress = Math.min(oldProgress + increment, 100);

            if (newProgress === 100) {
            clearInterval(timer);
            }

            return newProgress;
        });
        }, interval);

        return () => {
        clearInterval(timer);
        };
    }, []);

    let index = 0;

    function turnOnClick(direction) {

        let scene = document.querySelector('.scene')
        let cube = document.querySelector('.cube')

        if (direction === 1) { // Left
            setProgress(0);
            index--
        } else if (direction === -1) { // Right
            setProgress(0);
            index++
        }

        if (cube) {
            cube.classList.add('transition')
        }

        if (scene) {
            scene.style.setProperty('--rotatePercent', direction)
        }
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

        window.addEventListener('touchstart', touchStartHandler, { passive: false })
        window.addEventListener('mousedown', touchStartHandler, { passive: false })

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
                if (!isMouseDownFlag) {
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

        window.addEventListener('touchmove', touchMoveHandler, { passive: false })
        window.addEventListener('mousemove', touchMoveHandler, { passive: false })

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

        window.addEventListener('touchend', touchEndHandler, { passive: false })
        window.addEventListener('mouseup', touchEndHandler, { passive: false })

        function turn(direction) {
            if (direction === 1) { // Left
                setProgress(0);
                index--
            } else if (direction === -1) { // Right
                setProgress(0);
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

            if (left) {
                left.style.backgroundImage = `url(${images[leftIndex]})`
            }

            if (front) {

                front.style.backgroundImage = `url(${images[frontIndex]})`
            }

            if (right) {
                right.style.backgroundImage = `url(${images[rightIndex]})`

            }
        }

        return () => {
            window.removeEventListener('touchstart', touchStartHandler)
            window.removeEventListener('mousedown', touchStartHandler)
            window.removeEventListener('touchmove', touchMoveHandler)
            window.removeEventListener('mousemove', touchMoveHandler)
            window.removeEventListener('touchend', touchEndHandler)
            window.removeEventListener('mouseup', touchEndHandler)
        }


    }, [clicked]);


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
                    zIndex: '9998',
                    display: clicked ? 'block' : 'none',
                    animation: `${storyAnimation} ${animationTime}s ease-in`,
                }}
                className="scene"
            >
                <IconButton aria-label="close" sx={{ color: 'white', position: 'absolute', top: '1rem', right: '1rem', zIndex: '9999' }} onClick={handleClose}

                    onTouchEnd={handleClose}
                >
                    <CloseIcon height={32} width={32} />
                </IconButton>

                <Box className="cube" sx={{ position: 'relative', width: '100vw', height: '100vh', transformStyle: 'preserve-3d', transform: 'translateZ(-50vw) rotateY(calc((1 - var(--rotatePercent)) * 90deg * -1))' }}>
                    <Box className="face face-left" sx={{ backgroundSize: background, backgroundPosition: "0% 30%", cursor: 'pointer' }} ></Box>
                    <Box className="face face-front" sx={{ backgroundSize: background, backgroundPosition: "0% 30%", cursor: 'pointer' }}>
                        <LinearProgress variant="determinate" value={progress} sx={{ margin: '0.5rem 0 0.75rem 0', backgroundColor: 'rgba(255, 255, 255, 0.2)', mx: '0.5rem'}} />
                    </Box>
                    <Box className="face face-right" sx={{ backgroundSize: background, backgroundPosition: "0% 30%", cursor: 'pointer' }} onClick={() => turn(1)}></Box>
                </Box>
            </Box>
        </>
    )
}

export default Story;
