var img = "";
var status = "";
var objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
}
function start() {
    detector = ml5.objectDetector('cocossd', modelo);
    document.getElementById("status").innerHTML = "Detectando objetos";
}
function modelo() {
    console.log("Carregado!");
    status = true;
    
}
function resultado(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != " ") {
        detector.detect(video, resultado);
        r=random(255);
        g=random(255);
        b=random(255);

        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objetos detectados";
            document.getElementById("numberobjects").innerHTML="Quantidade de objetos: "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            noFill();

        }
    }

}