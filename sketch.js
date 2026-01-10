let faceMesh;
let classifier;
let video;
let faces = [];
let label = "Scanning...";

// 1. YOUR TEACHABLE MACHINE LINK
const modelURL = 'https://teachablemachine.withgoogle.com/models/xEHcGu-VJ/';

function preload() {
  // Load FaceMesh to detect up to 3 faces
  faceMesh = ml5.faceMesh({ maxFaces: 3 });
  
  // Load your custom identity model
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start face detection
  faceMesh.detectStart(video, gotFaces);
  
  // Start the identity recognition loop
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  // MIRROR THE VIDEO VISUALLY
  // We use push/pop so only the video is flipped, not our coordinates yet
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // LOOP through detected faces
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let box = face.box;

    if (box) {
      // MIRROR FIX: The magic formula to stop the box from moving opposite
      let mirroredX = width - box.xMin - box.width;

      // Draw the Bounding Box
      noFill();
      stroke(0, 255, 136);
      strokeWeight(3);
      rect(mirroredX, box.yMin, box.width, box.height, 10);

      // Draw the Name
      fill(0, 255, 136);
      noStroke();
      textSize(22);
      textStyle(BOLD);
      text(label, mirroredX, box.yMin - 15);
      
      // OPTIONAL: Draw Face Mesh Points (the dots)
       //for (let keypoint of face.keypoints) {
        // let mirX = width - keypoint.x; // Mirror each point too
        // fill(0, 255, 136);
        // circle(mirX, keypoint.y, 2);
      // }
    }
  }
}

function gotFaces(results) {
  faces = results;
}

function gotResult(results) {
  // Update the identified person's name from Teachable Machine
  label = results[0].label;
  classifyVideo(); // Continue the loop
}