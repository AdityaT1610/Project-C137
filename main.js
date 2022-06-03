status = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 350);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status - detecting objects";
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
    input = document.getElementById("object_name");
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotRsults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 480, 350);

    if(status != "")
    {

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotRsults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - Object Detected !!";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +"  "+ percent +" % ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);

            if(objects[i].length = input)
            {
                document.getElementById("found_or_not").innerHTML = "Object Found !!";
            }
        } 
    }
}