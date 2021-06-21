leftWristX=0;
leftWristY=0; 
rightWristX=0;
rightWristY=0;
socreleftWrist=0;
song="";
function preload(){
song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);

        socreleftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LWX"+leftWristX+"LWY"+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y
        console.log("RWX"+rightWristX+"RWY"+rightWristY);
    }   
}


function modelLoaded(){
    console.log("poseNet is initialized");
}

 function stop(){
    song.stop(); 
 }

function draw(){
    image(video,0,0,600,500);
fill("red");
stroke("red");

if (socreleftWrist >0.2){
circle(leftWristX,leftWristY,20);
InNumberleftWristY=Number(leftWristY);
remove_decimals=floor(InNumberleftWristY);
volume=remove_decimals/500;
document.getElementById("volume").innerHTML="volume=" +volume;
song.setVolume(volume);
}
}



function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
