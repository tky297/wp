/*
Interactive logos

jasonlabbe3d.com
twitter.com/russetPotato
*/

const SPIN_MULTIPLIER = 45;
const MIN_PARTICLE_COUNT = 1000;
const MAX_PARTICLE_COUNT = 1200;
const MIN_PARTICLE_SIZE = 5;
const MAX_PARTICLE_SIZE = 5;
const MIN_FORCE = 0.1;
const MAX_FORCE = 0.2;
const REPULSION_RADIUS = 30;
const REPULSION_STRENGTH = 0.25;
const IMG_RESIZED_WIDTH = 200;
const IMG_SCAN_STEPS = 1;

const DrawTypes = {
	Rect: 0,
	Ellipse: 1  ,
	Triangle: 2
};

var particles = [];
var indices = [];
var imgIndex = 0;
var drawType = 0;
var particleCount = 1000;
var maxSize = 0;
var img;

function setup() {
	let result = document.getElementById("canvas1");
	let canvas = createCanvas(300, 300);
	canvas.parent(result);
	canvas.canvas.oncontextmenu = () => false;
	loadImg("img/facebook.png");
}

function draw() {
	if (resetFlag) {
		if (frameCount % 300 == 0) {
			if (frameCount % 600 == 0) {
				imageParticle();
			} else {
		    	randomParticle();
	  		}
		}
	}

	background(0);
	
	fill(255);
	noStroke();
	
	if (img == null) {
		return;
	}
	
	push();
	translate(width / 2 - img.width / 2, height / 2 - img.height / 2);
	
	fill(255);
	noStroke();
	
	rectMode(CENTER);
	
	particles.forEach(particle => {
		particle.move();
		
		push();
		translate(particle.pos.x, particle.pos.y);
		
		let spin = particle.vel.mag() * SPIN_MULTIPLIER;
		rotate(radians(particle.mapped_angle + spin));
		
		fill(particle.color);
		
		switch(drawType) {
			case DrawTypes.Ellipse:
				ellipse(0, 0, particle.size, particle.size);
				break;
			case DrawTypes.Rect:
				rect(0, 0, particle.size, particle.size);
				break;
			case DrawTypes.Triangle:
				triangle(
					particle.size * -0.5, particle.size * -0.5, 
					0, particle.size, 
					particle.size * 0.5, particle.size * -0.5);
		}
		
		pop();
	});
	
	rectMode(CORNER);
	
	// if (mouseIsPressed && mouseButton == RIGHT) {
	// 	image(img, 0, 0);
	// }
	
	pop();
}

let posX = [];
let posY = [];

function randomParticle() {
	for (let i = 0; i < particles.length; i++) { 
		particles[i].target.x = Math.random() * 300 - 50;
		particles[i].target.y = Math.random() * 300 - 50;
	}
}

function imageParticle(){
	for (let i = 0; i < particles.length; i++) { 
		particles[i].target.x = posX[i];
		particles[i].target.y = posY[i];
	}
}

// function keyPressed() {
// 	if (key == '+') {
// 		particleCount = min(particleCount + 50, MAX_PARTICLE_COUNT);
// 		spawnParticles();
// 	}
	
// 	if (key == '-') {
// 		particleCount = max(particleCount - 50, MIN_PARTICLE_COUNT);
// 		spawnParticles();
// 	}
	
// 	if (key == ' ') {
// 		nextDrawType();
// 	}
// }

// function mousePressed() {
// 	if (mouseButton == LEFT) {
// 		loadNextImg();
// 	}
// }
