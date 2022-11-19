let inputDir={x:0, y:0};

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');

let speed=4;
let score =0;
let hiscoreval=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
],
food={x:6,y:7};


//FUNCTIONS
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //snake collides with itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }
    //collision with wall
        if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0)
        {
            return true;
        }
}

function gameEngine(){
    //Update snake array & food
    if(isCollide(snakeArr)){
    gameOverSound.play();
    inputDir= {x:0,y:0};
    alert("Game Over. Press any key to play again!!");
    snakeArr=[
        {x:13, y:15}
    ];
    score=0;speed=4;
    scoreBox.innerHTML="Score : "+score;
    }

    //eating the food
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        foodSound.play();
        speed+=1;
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Highest : "+hiscoreval; 
        }
        scoreBox.innerHTML="Score : "+score;
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }
    //Moving snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+= inputDir.x;
    snakeArr[0].y+= inputDir.y; 

    //Display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index ===0){
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display food
        foodElement= document.createElement("div");
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


//GAME LOGIC
let hiscore = localStorage.getItem("hiscore");
if(hiscore ===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else
{
    hiscoreval= JSON.parse(hiscore);
    hiscoreBox.innerHTML="Highest : "+hiscoreval; 
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0,y:1};   //start game
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});