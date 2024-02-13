let rocket;
let ground;

const space_width = 1000;
const space_height = 800;

const ground_width = 200;
const ground_height = 15;
const ground_color = "lime";

const rocket_x = space_width / 2;
const rocket_y = 100;
const rocket_width = 20;
const rocket_height = 150;
const rocket_color = "white";

function setup() {
    createCanvas(space_width, space_height);

    // create an engine
    let engine = Matter.Engine.create();
    let world = engine.world;

    // create a ground  
    ground = new Block(
        world,
        {
            x: space_width / 2,
            y: space_height - ground_height / 2,
            w: ground_width,
            h: ground_height,
            color: ground_color,
        },
        { isStatic: true, angle: PI }
    );

    // create a rocket
    rocket = new Block(world, {
        x: rocket_x,
        y: rocket_y,
        w: rocket_width,
        h: rocket_height,
        color: rocket_color,
    });

    // run the engine
    Matter.Runner.run(engine);
}

// thrust the rocket while spacebar is pressed and stop thrusting when it is released
function keyReleased() {
    if (keyCode === 32) {
        Matter.Body.setVelocity(rocket.body, { x: 0, y: 0 });
    }
}

function draw() {
    background("black");
    rocket.draw();
    ground.draw();

    if(keyIsDown(32)) {
        Matter.Body.applyForce(rocket.body, rocket.body.position, {
            x: 0,
            y: -0.005,
        });
    }
}
