
status="";
objects = [];

function preload() {

}

function setup() {
    canvas =createCanvas(500, 400);
    canvas.center();
    create = createCapture(VIDEO);
    create.size(500, 400);
    create.hide()
}

function modelLoaded() {
   console.log("Model Loaded");
   status = true;
   }

   function start()
 {
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
    objects_name = document.getElementById("object_name").value;
 }

 function gotResult(error, results) {
   if(error) {
      console.log(error);
   }
   console.log(results);
   objects = results;
 }
 
 function draw() {
    image(create, 0, 0, 500, 450 );
    if(status!= ""){
      objectDetector.detect(create, gotResult);
      for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Status :  Objects Detected";
        

    fill("#00ff00");
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke('#FF0000');
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     
    if(objects[i].label == object_name)
          {
            create.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
          }          
         }
      }
      }
 
 
 
 

