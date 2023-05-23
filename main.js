function setup() {
  canvas = createCanvas(300, 600);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log('Model Loaded!')
}
function draw(){
  image(video, 0, 250, 300, 300)
  classifier.classify(video, gotResult)
}
var previous_result='';


function gotResult(error,results) {
  if(error) {
console.error(error);
  }else{
    if((results[0].confidence >0.5) &&(previousResult != results[0].label)){
      previousResult = results[0].label;
      var synth = window.speechSynthsis;
      speakData = 'O objeto detectado é - '+results[0].label;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    
    document.getElementById("resultObjectName").innerHTML = results[0].label;
    document.getElementById("resultObjectAccuracy").innerHTML = results[0].confundence.toFixed(3);
    }
}
}
