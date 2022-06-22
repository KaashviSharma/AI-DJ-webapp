song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;

function preload()
{
	song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("poseNet model loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+"leftWristy = "+leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+"rightWristy = "+rightWristy);
    }
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristx,rightWristy,20);
        if(rightWristx > 0 && rightWristy <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristy>100 && rightWristy <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if(rightWristy>200 && rightWristy <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy>300 && rightWristy <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else if(rightWristy>400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx,leftWristy,20);
        inNumberleftWristY = Number(leftWristy);
        remove_decimals = floor(inNumberleftWristY);
        volume = remove_decimals /500;
        document.getElementById("volume").innerHTML = "volume = "+volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(2);
}