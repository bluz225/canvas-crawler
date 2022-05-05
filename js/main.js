// DOM Selectors
const canvas = document.querySelector("#canvas")

//hud for the player
const movementDisplay = document.querySelector("#movement")

// CANVAS set up / Game State
// set the rendering context of the canvas
const ctx = canvas.getContext("2d")

// set the canvas width and height to be the same as the pages width and height
// hardcode it in pixel values OR do this:
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

//game loop interval
const gameLoopInterval = setInterval(gameLoop,60) // every 60ms update the game logic and render

// // just tinkering with canvas for the first time

// //set rendering properties
// // works with rgb rgba hex colors and named colors
// ctx.fillStyle = "green" // set color prop to green

// //invoke rending methods
// // ctx.fillRect(x,y,width,height)
// ctx.fillRect(20,20,40,40)

// ctx.strokeStyle = "pink"
// ctx.lineWidth = 7 // 7pixels

// //invoke rendering methods
// ctx.strokeRect(200,200,50,80)

// console.log(ctx)

// Classes
class Crawler {
    constructor(x,y,width,height,color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y, this.width,this.height)
    }
}
//test crawler
// const myCrawler = new Crawler(100,100,40,40,"orange")
// //render yourself
// myCrawler.render()

//Game Objects
//Game Hero 
const hero = new Crawler(5,5,30,30, "hotpink")
hero.render()

const ogre = new Crawler(200,100,75,120,"green")
ogre.render()


// game functions

function drawBox(x,y,w,h,color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
}

// handles keyboard input
function movementHandler(e){
    // console.log(e)
    const speed = 10
    switch(e.key) {
        case("s"):
            hero.y = hero.y + speed
            break
        case("w"):
            hero.y = hero.y - speed
            break
        case("d"):
            hero.x = hero.x + speed
            break
        case("a"):
            hero.x = hero.x - speed
            break
      
    }
    // console.log(hero)
    // hero.render()
    movementDisplay.innerText = `x: ${hero.x} y:${hero.y}`
    
}

function detectHit(){
    //Axis Aligned bounding box collisional algorithm
    // AABB Colision Detection
    const ogreLeft = hero.x + hero.width >= ogre.x
    // console.log("ogre left:", ogreLeft)
    const ogreRight = hero.x <= ogre.x + ogre.width
    // console.log("ogre Right:", ogreRight)
    const ogreTop = hero.y + hero.height >= ogre.y
    // console.log("ogre Top:", ogreTop)
    const ogreBot = hero.y <= ogre.y + ogre.height
    // console.log("ogre Top:", ogreTop)

    if (ogreLeft === true && ogreRight===true && ogreTop === true && ogreBot === true) {
        // console.log("hit")
        ogre.alive = false
        movementDisplay.innerText= "you killed Shrek! Who is the monster now?"
        clearInterval(gameLoopInterval)

    }
}

// all of the main game logic is executed every frame
function gameLoop() {
    // clear the canvas
    // do all the game logic
    // render the game objects
    ctx.clearRect(0,0,canvas.width,canvas.height)
    detectHit()
    if (ogre.alive === true){
        ogre.render()
    }
    hero.render()

}


//Event Listeners
// draw a box whenever you click on the canvas

canvas.addEventListener("click", function(e){
    console.log(e.offsetX, e.offsetY)
    // let width = 30
    // let height = 30
    // const red = Math.floor(Math.random()*256)
    // const green = Math.floor(Math.random()*256)
    // const blue = Math.floor(Math.random()*256)
    // const color = `rgb(${red},${green},${blue})`
    // drawBox(e.offsetX-width/2,e.offsetY-height/2,width,height,color)
})

document.addEventListener("keydown", movementHandler)