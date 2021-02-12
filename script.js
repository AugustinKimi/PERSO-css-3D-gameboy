// All gameboy and background elements var
const container = document.querySelector('.container')
const gameboy = container.querySelector('.gameboy')
const screen = document.querySelector('.screen')
const gameboyPivot = gameboy.querySelector('.pivot')
const gameboyFaces = Array.from(gameboy.querySelectorAll('.gameboy-face'))
const backgroundElements = container.querySelector('.background-elements')
const bButton = backgroundElements.querySelector('.b-button')
const bButtonPivot = bButton.querySelector('.b-button .pivot')
const bButtonZNegFace = bButtonPivot.querySelector('.b-button .zneg-face')
const backgroundButtons = Array.from(backgroundElements.querySelectorAll('.background-buttons'))
const aButton = backgroundElements.querySelector('.a-button')
const aButtonPivot = aButton.querySelector('.a-button .pivot')
const aButtonZNegFace = aButtonPivot.querySelector('.a-button .zneg-face')
const crossButtonPivot = backgroundElements.querySelector('.pivot')
const gameButtons = gameboy.querySelector('.game-buttons')
const activeAButton = gameButtons.querySelector('.active-a-button')
const activeBButton = gameButtons.querySelector('.active-b-button')
const crossFaces = Array.from(gameButtons.querySelectorAll('.cross-button-section'))
const activeCrossButton = gameButtons.querySelector('.active-cross-button')
const topCrossButton = activeCrossButton.querySelector('.top-button')
const leftCrossButton = activeCrossButton.querySelector('.left-button')
const rightCrossButton = activeCrossButton.querySelector('.right-button')
const bottomCrossButton = activeCrossButton.querySelector('.bottom-button')
const gameContainer = screen.querySelector('.game-container')
const scoreContent = screen.querySelector('.score')


const menu = document.querySelector('.menu')
const playButton = menu.querySelector('.play-button')
const replayButton = menu.querySelector('.replay-button')
const music = new Audio('ressources/background-music.wav')

let gameboyRotationAnimation
let gameboyRotationX = 0
let gameboyRotationY = 0
let rotationYVariation = 'plus'

const colorTheme = { blackAndWhite : {globalColor : '#000000',
                     borderScreenColor : '#ffffff',
                     screenColor : '#000000'},
                    
                     yellow : {globalColor : '#ffee00',
                     borderScreenColor : '#ff9d00',
                     screenColor : '#ffe5a4'},
                    
                     blue : {globalColor : '#00c3ff',
                     borderScreenColor : '#0048e3',
                     screenColor : '#c3f1ff'},
                    
                    normal : {globalColor : '#4f00b0',
                     borderScreenColor : '#28186f',
                     screenColor : '#9656ff'}}

///// GAMEBOY PART /////
const blackAndWhiteButton = menu.querySelector('.black-and-white')
const yellowButton = menu.querySelector('.yellow')
const blueButton = menu.querySelector('.blue')
const normal = menu.querySelector('.normal')
let colorSelected = colorTheme.normal
blackAndWhiteButton.addEventListener('click', () =>
{
    colorSelected = colorTheme.blackAndWhite
    scoreContent.style.color = `${colorSelected.borderScreenColor}`
    screen.style.background = `${colorSelected.borderScreenColor}`
    activeAButton.style.background = `${colorSelected.borderScreenColor}`
    activeBButton.style.background = `${colorSelected.borderScreenColor}`
    for(const face of gameboyFaces)
    {
        face.style.background = `${colorSelected.globalColor}`
    }
    for(const crossFace of crossFaces)
    {
        crossFace.style.background = `${colorSelected.borderScreenColor}`
    }
})

yellowButton.addEventListener('click', () =>
{
    colorSelected = colorTheme.yellow
    scoreContent.style.color = `${colorSelected.borderScreenColor}`
    screen.style.background = `${colorSelected.borderScreenColor}`
    activeAButton.style.background = `${colorSelected.borderScreenColor}`
    activeBButton.style.background = `${colorSelected.borderScreenColor}`
    for(const face of gameboyFaces)
    {
        face.style.background = `${colorSelected.globalColor}`
    }
    for(const crossFace of crossFaces)
    {
        crossFace.style.background = `${colorSelected.borderScreenColor}`
    }
})

blueButton.addEventListener('click', () =>
{
    colorSelected = colorTheme.blue
    scoreContent.style.color = `${colorSelected.borderScreenColor}`
    screen.style.background = `${colorSelected.borderScreenColor}`
    activeAButton.style.background = `${colorSelected.borderScreenColor}`
    activeBButton.style.background = `${colorSelected.borderScreenColor}`
    for(const face of gameboyFaces)
    {
        face.style.background = `${colorSelected.globalColor}`
    }
    for(const crossFace of crossFaces)
    {
        crossFace.style.background = `${colorSelected.borderScreenColor}`
    }
})

normal.addEventListener('click', () =>
{
    colorSelected = colorTheme.normal
    scoreContent.style.color = `${colorSelected.borderScreenColor}`
    screen.style.background = `${colorSelected.borderScreenColor}`
    activeAButton.style.background = `${colorSelected.borderScreenColor}`
    activeBButton.style.background = `${colorSelected.borderScreenColor}`
    for(const face of gameboyFaces)
    {
        face.style.background = `${colorSelected.globalColor}`
    }
    for(const crossFace of crossFaces)
    {
        crossFace.style.background = `${colorSelected.screenColor}`
    }
})


// Display all the face on the decorations buttons to make the circle 
const borderFaces = (button) =>
{
    // Make 90 divs to make the round effect look real 
    for(i = 0; i < 90; i++)
    {
        const face = document.createElement('div')
        face.classList.add('round-face')
        face.style.width = `${(2 * Math.PI * 75) / 45}px` 
        const faceColor = '#19087c'
        face.style.background = `${faceColor}`
        const containerFace = document.createElement('div')
        containerFace.classList.add('container-face')
        containerFace.style.transform = `rotateZ(${i*4}deg) translateZ(20px)`
        button.appendChild(containerFace)
        containerFace.appendChild(face)
    }
}

// Call our function for a button and b button
borderFaces(bButtonZNegFace)
borderFaces(aButtonZNegFace)


// Listen the click on the play button to lunch the sound and the interactions with the gameboy
playButton.addEventListener('click' , () =>
{
    lunchGame()
})

replayButton.addEventListener('click' , () =>
{
    lunchGame()
})

const lunchGame = () =>
{
    menu.style.display = 'none'
    gameContainer.style.background = `${colorSelected.screenColor}`
    playButton.style.display = 'none'
    gameboyPivot.style.transform = 'rotateX(0deg) rotateY(0deg)'
    gameboy.style.transform = 'translateZ(0px)'
    clearInterval(gameboyRotationAnimation)
    music.loop = true
    music.volume = 0.2
    music.play()
}


// Gmae boy animation whe we are on the first page
gameboyRotationAnimation = setInterval(() => {
    gameboyRotation()
}, 100); 

const gameboyRotation = () =>
{
    if(gameboyRotationX == 360)
        gameboyRotationX = 0
    if(gameboyRotationY == 20)
        rotationYVariation = 'minus'
    if(gameboyRotationY == -20)
        rotationYVariation = 'plus'

    if(rotationYVariation == 'minus')
        gameboyRotationY = gameboyRotationY - 1
    if(rotationYVariation == 'plus')
        gameboyRotationY = gameboyRotationY + 1

    gameboyRotationX = gameboyRotationX + 2
    gameboyPivot.style.transform = `rotateX(${gameboyRotationY}deg) rotateY(${gameboyRotationX}deg)`
}


// INTERACTIONS PART /////

// All the var of the buttons on the gamboiy face
const width = 30
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2,1,0]
let direction = 1
let previousDirection = 1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0

// Crete all ours div 
for(let i=0; i<900; i++) 
{
    const block = document.createElement('div')
    block.classList.add('blocs')
    gameContainer.appendChild(block)
}
// Get all the blocks that we have previously set
const squares = Array.from(document.querySelectorAll('.blocs'))

// Create the fucntion to start teh game, we set up all our vars for the game
function startGame() {
    randomApple()
    direction = 1
    intervalTime = 200
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    // Make our loop start
    interval = setInterval(moveOutcomes, intervalTime)
}


// test all snake moves
function moveOutcomes() 
{

    // check if he hit a wall
    if(
        (currentSnake[0] + width >= (width * width) && direction == width) ||
        (currentSnake[0] % width == width -1 && direction == 1) ||
        (currentSnake[0] % width == 0 && direction == -1) || 
        (currentSnake[0] - width < 0 && direction == -width) || 
        squares[currentSnake[0] + direction].classList.contains('snake') && direction != - previousDirection) 
    {
        // if he hit we get him back  to menu
        loseDisplay()
        // And stop the loop
        return clearInterval(interval)
    }
    // Mange to make the snake correctly with the tail that has to follow the head
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction) 
    // Check if he eat an apple
    if(squares[currentSnake[0]].classList.contains('apple')) 
    {
        // Remove the apple
        squares[currentSnake[0]].classList.remove('apple')
        // Add a snake lenght
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        // Create a new apple
        randomApple()
        // increase the score
        score++
        scoreContent.textContent = score
        // Clear intervall to speed it up^right after 
        clearInterval(interval)
        // Speed the interval
        intervalTime = intervalTime * speed
        // Restart the interval
        interval = setInterval(moveOutcomes, intervalTime)
    }
    // Make the nsake move
    squares[currentSnake[0]].classList.add('snake')

}


// Function that make randmolmy span an apple
function randomApple() 
{
    // Ask to make a random position for the apple as long as the apple dont spawn on the snake, if it does, the instreuction restart

    do
    {
        appleIndex = Math.floor(Math.random() * squares.length)
    } 
    while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


// Set our controls
function control(e) {

    if(e.key === 'ArrowRight' || e.key == 'd') 
    {
        previousDirection = direction
        direction = 1
    } 

    else if (e.key === 'ArrowUp' || e.key == 'z') 
    {
        previousDirection = direction
        direction = -width
    } 

    else if (e.key === 'ArrowLeft' || e.key == 'q') 
    {
        previousDirection = direction
        direction = -1
    } 
    
    else if (e.key === 'ArrowDown' || e.key == 's') 
    {
        previousDirection = direction
        direction = +width
    }
}

topCrossButton.addEventListener('click', (e) =>
{
    console.log('click')
    previousDirection = direction
    direction = -width
})

leftCrossButton.addEventListener('click', (e) =>
{
    previousDirection = direction
    direction = -1
})

rightCrossButton.addEventListener('click', (e) =>
{
    previousDirection = direction
    direction = 1
})

bottomCrossButton.addEventListener('click', (e) =>
{
    previousDirection = direction
    direction = +width
})


document.addEventListener('keydown', control)
playButton.addEventListener('click', startGame)
replayButton.addEventListener('click', startGame)

  

const loseDisplay = () =>
{
    menu.style.display = 'flex'
    gameboyRotationX = 0
    gameboyRotationY = 0
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    score = 0
    gameContainer.style.background = `url(ressources/snake-screen.jpg)`
    scoreContent.textContent = ''
    replayButton.style.display = 'flex'
    gameboyPivot.style.transform = 'rotateX(0deg) rotateY(1deg)'
    gameboy.style.transform = 'translateZ(-500px)'
    gameboyRotationAnimation = setInterval(() => {
        gameboyRotation()
    }, 100);
    screen.style.display = 'flex'
}
