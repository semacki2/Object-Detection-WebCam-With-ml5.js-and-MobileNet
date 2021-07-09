let coco;

//let img;
let video;
let detections = [];

function preload() {
  //img = loadImage('dogcat.jpg');

  coco = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);
  background(0);
  video = createCapture(VIDEO);
  video.hide();
  video.size(width, height);
  
  createP('This application uses your webcam and the coco library to detect objects. </br>Hold objects in front of your webcam and it will try to detect and identify the object.')
}

function draw() {
  if (video.loadedmetadata) {
    image(video, 0, 0);
    coco.detect(video, gotResults);
  }

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(0);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    detections = results;
    //coco.detect(video, gotResults);
  }
}