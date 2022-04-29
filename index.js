const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const unit = 2

let previous_canvas_width = canvas.width
let previous_canvas_height = canvas.height

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
        this.base_velocity = 0.001
        this.x_velocity = this.base_velocity * canvas.width
        this.y_velocity = this.base_velocity * canvas.height
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }

    set_direction(){
        let forward = Math.random()

        if(forward <= 0.5){
            ball.x_velocity = -ball.base_velocity * canvas.width
        }
        else if (forward >= 0.6){
            ball.x_velocity = ball.base_velocity * canvas.width
        }

        let up = Math.random()

        if(up <= 0.5){
            ball.y_velocity = -ball.base_velocity * canvas.height
        }
        else if(up >= 0.6){
            ball.y_velocity = ball.base_velocity * canvas.height
        }
    }

    update(){
        this.draw()
        this.x += this.x_velocity
        this.y += this.y_velocity
    }
}

let ball_relative_x
let ball_relative_y
let ball_relative_radius
let player1_relative_width
let player1_relative_height
let player1_relative_x
let player1_relative_y
let player2_relative_width
let player2_relative_height
let player2_relative_x
let player2_relative_y

function set_relative_measurements(){
    ball_relative_x = canvas.width * 0.5
    ball_relative_y = canvas.height * 0.5
    ball_relative_radius = (canvas.width * canvas.height) * 0.00001
    player1_relative_width = canvas.width * 0.005
    player1_relative_height = canvas.height * 0.25
    player1_relative_x = canvas.width * 0.1 - player1_relative_width
    player1_relative_y = canvas.height * 0.5
    player2_relative_width = canvas.width * 0.005
    player2_relative_height = canvas.height * 0.25
    player2_relative_x = canvas.width - canvas.width * 0.1
    player2_relative_y = canvas.height * 0.5
}

set_relative_measurements()

const player_speed = 0.005

const player1 = new Player(player1_relative_x, player1_relative_y, player1_relative_width, player1_relative_height, 'black')
const player2 = new Player(player2_relative_x, player2_relative_y, player2_relative_width, player2_relative_height, 'black')
const ball = new Ball(ball_relative_x, ball_relative_y, ball_relative_radius, 'black')

ball.set_direction()

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.update()
    player1.update()
    player2.update()


    // Keep Ball in Bounds
    if(ball.y <= 0 || ball.y >= canvas.height){
        ball.y_velocity *= -1
    }

    if(ball.x <= 0){
        ball.x = canvas.width/2
        ball.y = canvas.height/2
        ball.set_direction()
    }

    if(ball.x >= canvas.width){
        ball.x = canvas.width/2
        ball.y = canvas.height/2
        ball.set_direction()
    }

    if (ball.x <= player1.x + player1.width && ball.x > player1.x) {
        if (ball.y >= player1.y && ball.y <= player1.y + player1.height) {
            if(ball.x < player1.x + player1.width){
                if (ball.y <= player1.y){
                    ball.y_velocity = -ball.base_velocity * canvas.height
                }
                else if (ball.y >= player1.y + player1.height){
                    ball.y_velocity = ball.base_velocity * canvas.height
                }
            }
            ball.x_velocity *= -1
        }
    }
    if (ball.x >= player2.x && ball.x < player2.x + player2.width) {
        if (ball.y >= player2.y && ball.y <= player2.y + player2.height) {
            if(ball.x > player2.x){
                if (ball.y <= player2.y){
                    ball.y_velocity = -ball.base_velocity * canvas.height
                }
                else if (ball.y >= player2.y + player2.height){
                    ball.y_velocity = ball.base_velocity * canvas.height
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

onresize = function(){
    canvas.height = innerHeight
    canvas.width = innerWidth
    set_relative_measurements()
    ball.radius = ball_relative_radius
    ball.x += previous_canvas_width - canvas.width
    ball.y += previous_canvas_height - canvas.height
    player1.width = player1_relative_width
    player1.height = player1_relative_height
    player1.x = player1_relative_x
    player2.width = player2_relative_width
    player2.height = player2_relative_height
    player2.x = player2_relative_x

    // Keep track of previous dimensions
    previous_canvas_width = canvas.width
    previous_canvas_height = canvas.height
    location.reload();
}

animate()
