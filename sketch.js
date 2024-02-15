let rocket;
let ground;
let thrustIndicator;

const space_width = 1200;
const space_height = 900;

const ground_width = 400;
const ground_height = 15;
const ground_color = "lime";

const rocket_x = space_width / 2;
const rocket_y = space_height / 2;
const rocket_width = 20;
const rocket_height = 150;
const rocket_color = "white";

const gravity = 0.4;

function setup() {
  createCanvas(space_width, space_height);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // set gravity
  world.gravity.y = 0.4;

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

  thrustIndicator = {
    width: rocket_width,
    height: 20,
    color: "orange",
  };

  // run the engine
  Matter.Runner.run(engine);
}

function thrust_rocket() {
  let thrust_force = Matter.Vector.rotate(
    { x: 0, y: -0.005 },
    rocket.body.angle
  );
  Matter.Body.applyForce(rocket.body, rocket.body.position, thrust_force);

  // draw thrust indicator
  push();
  translate(rocket.body.position.x, rocket.body.position.y);
  rotate(rocket.body.angle);
  fill(thrustIndicator.color);
  rect(
    -thrustIndicator.width / 2,
    rocket_height / 2,
    thrustIndicator.width,
    thrustIndicator.height
  );
  pop();
}

function draw() {
  background("black");

  rocket.draw();
  ground.draw();

  if (keyIsDown(32)) {
    thrust_rocket();
  }

  // tilt rocket on arrow key press
  const torque_pos = {
    x: rocket.body.position.x,
    y: rocket.body.position.y - 100,
  };
  if (keyIsDown(LEFT_ARROW)) {
    // apply force on rocket to tilt it
    Matter.Body.applyForce(rocket.body, torque_pos, { x: -0.001, y: 0 });
  } else if (keyIsDown(RIGHT_ARROW)) {
    Matter.Body.applyForce(rocket.body, torque_pos, { x: 0.001, y: 0 });
  }

  if (
    rocket.body.position.x < 0 ||
    rocket.body.position.x > space_width ||
    rocket.body.position.y < 0 ||
    rocket.body.position.y > space_height
  ) {
    // Reset rocket to initial position
    Matter.Body.setPosition(rocket.body, { x: rocket_x, y: rocket_y });
    Matter.Body.setVelocity(rocket.body, { x: 0, y: 0 });
    Matter.Body.setAngle(rocket.body, 0);
  }
}
