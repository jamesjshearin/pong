const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y - y/4
        this.width = width
        this.height = height
        this.color = color
        this.y_velocity = 0
    }

    draw(){
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()
        if(this.y < 0){
            this.y += 1
        }
        else if(this.y + this.height > canvas.height){
            this.y -= 1
        }
        else{
            this.y += this.y_velocity
        }
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.x_velocity = 0.001 * canvas.width
        this.y_velocity = 0.001 * canvas.height
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()
        this.x += this.x_velocity
        this.y += this.y_velocity
    }
}

const ball_x = canvas.width/2
const ball_y = canvas.height/2

const player1_x = canvas.width/10 - canvas.width/50
const player1_y = canvas.height/2

const player2_x = canvas.width - canvas.width/10
const player2_y = canvas.height/2

const player_speed = 0.005

const player1 = new Player(player1_x, player1_y, canvas.width/50, canvas.height/4, 'black')
const player2 = new Player(player2_x, player2_y, canvas.width/50, canvas.height/4, 'black')
const ball = new Ball(ball_x, ball_y, (canvas.width * canvas.height) * 0.00001, 'black')


function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.update()
    player1.update()
    player2.update()

    const player_1_distance = Math.hypot(player1.x - ball.x, player1.y - ball.y)
    const player_2_distance = Math.hypot(player2.x - ball.x, player2.y - ball.y)

    console.log("player 2 Y: " + player2.y)
    console.log("ball Y: " + ball.y)

    // Keep Ball in Bounds
    if(ball.y <= 0 || ball.y >= canvas.height){
        ball.y_velocity *= -1
    }

    if(ball.x <= 0){
        ball.x = canvas.width/2
        ball.y = canvas.height/2
    }

    if(ball.x >= canvas.width){
        ball.x = canvas.width/2
        ball.y = canvas.height/2
    }

    if (ball.x <= player1.x + player1.width && ball.x > player1.x) {
        if (ball.y >= player1.y && ball.y <= player1.y + player1.height) {
            if(ball.x < player1.x + player1.width){
                if (ball.y <= player1.y){
                    ball.y_velocity = -0.001 * canvas.height
                }
                else if (ball.y >= player1.y + player1.height){
                    ball.y_velocity = 0.001 * canvas.height
                }
            }
            ball.x_velocity *= -1
        }
    }
    if (ball.x >= player2.x && ball.x < player2.x + player2.width) {
        if (ball.y >= player2.y && ball.y <= player2.y + player2.height) {
            if(ball.x > player2.x){
                if (ball.y <= player2.y){
                    ball.y_velocity = -0.001 * canvas.height
                }
                else if (ball.y >= player2.y + player2.height){
                    ball.y_velocity = 0.001 * canvas.height
                }
            }
            ball.x_velocity *= -1
        }
    }
}

addEventListener('keydown', (e) => {

    if(e.key === "w"){
        player1.y_velocity = -player_speed * canvas.height
    }

    if(e.key === "s"){
        player1.y_velocity = player_speed * canvas.height
    }

    if(e.key === "ArrowUp"){
        player2.y_velocity = -player_speed * canvas.height
    }

    if(e.key === "ArrowDown"){
        player2.y_velocity = player_speed * canvas.height
    }


})

addEventListener('keyup', (e) => {
    if(e.key === "w"){
        player1.y_velocity = 0
    }

    if(e.key === "s"){
        player1.y_velocity = 0
    }

    if(e.key === "ArrowUp"){
        player2.y_velocity = 0

    }

    if(e.key === "ArrowDown"){
        player2.y_velocity = 0

    }
})

animate()
