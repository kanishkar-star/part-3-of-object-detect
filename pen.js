status = '';
objects = [];

function preload(){
    first_img = loadImage('Pen.jpg');
}

function setup(){
    canvas = createCanvas(680, 500);
    canvas.center();
    objDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status = Detecting Objects";
}

function draw(){
    image(first_img, 0, 0, 680, 500);

    if(status != ''){
        for(i = 0; i < objects.length; i++){
            percent = floor(objects[i].confidence * 100);
            object_name = objects[i].label;
            fill('#FF0000');
            text(object_name +' ' + percent + "%", objects[i].x, objects[i].y);
            stroke('#FF0000');
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log('Model Loaded');
    status = true;
    objDetector.detect(first_img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}

function back(){
    window.location = 'home.html'
}