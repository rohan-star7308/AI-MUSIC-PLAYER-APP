song="";
song1="";
lwc=0;
rwc=0;
song_status="";
song1_status="";

function preload(){
    song=loadSound("believer.mp3");
    song1=loadSound("Faded_320(PaglaSongs).mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modeloaded);
    posenet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song_status=song.isPlaying();
    song1_status=song1.isPlaying();
    fill("red");
    stroke("red");
    if(lwc>0.2){
        circle(lwx,lwy,20);
        song1.stop();
        if(song_status=="false"){
            song.play();
            document.getElementById("play").innerHTML="Song Name = BELIEVER";
        }
    }
    if(rwc>0.2){
        circle(rwx,rwy,20);
        song.stop();
        if(song1_status=="false"){
            song1.play();
            document.getElementById("play").innerHTML="Song Name = FADED";
        }
    }
}

function modeloaded(){
    console.log("posenet Initialized!!!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lwx=results[0].pose.leftWrist.x;
        rwx=results[0].pose.rightWrist.x;
        lwy=results[0].pose.leftWrist.y;
        rwy=results[0].pose.rightWrist.y;
        lwc=results[0].pose.keypoints[9].score;
        rwc=results[0].pose.keypoints[10].score;
    }
}