let mobilenet;
let classifier;
let video;
let label = 'Custom_Image_Classifier';
let ukeButton;
let whistleButton;
let trainButton;


function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}
redCount=0
blueCount=0
function setup() {
  createCanvas(640, 540).position((windowWidth - width) / 2,(windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  redButton = createButton('object_1 🔴');
  redButton.position(((windowWidth - width) / 2),((windowHeight - height) / 2))
  redButton.mousePressed(function() {
    redCount++
    label=redCount+' images in 🔴'
    classifier.addImage('object_1');
  });

  blueButton = createButton('object_2 🔵');
  blueButton.position(((windowWidth - width) / 2)+100,(windowHeight - height) / 2)
  blueButton.mousePressed(function() {
    blueCount++
    label=blueCount+' images in 🔵'
    classifier.addImage('object_2 🔵');
  });

  trainButton = createButton('Train 🚋');
  trainButton.position(((windowWidth - width) / 2)+200,((windowHeight - height) / 2))
  trainButton.mousePressed(function() {
    label='Model is Training 🚋'
    classifier.train(whileTraining);
  });

  saveButton = createButton('Save 💾');
  saveButton.position(((windowWidth - width) / 2)+281,((windowHeight - height) / 2))
  saveButton.mousePressed(function() {
    classifier.save();
  });



}

function draw() {
  background(0);
  image(video, 0, 0, 640, 500);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}
