var ball;
var database, position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballref = database.ref('ball/position');
    ballref.on("value", readposition, showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    var dbref = database.ref('ball/position');
    dbref.set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function readposition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;

}

function showerror(){
    console.log("error connecting to the database");
}