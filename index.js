const boxes = document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Create the funtion to initialize rhe game 
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //needs to empty on UI
    boxes.forEach ((box,index) => {
      box.innerText = "";
      boxes[index].style.pointerEvents ="all";
       box.classList.remove("win"); //To remove the background color after win
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText= `Current player -${currentPlayer}`;
}

initGame();

function checkGameOver(){
   let answer = "";
   winningPosition.forEach((position) =>{
     //all 3 Boxes shouls be non empty and Exactly Same in value
     if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
     && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]] === "X")
              answer = "X";
            else
             answer = "O";
            //disable pointer events
            boxes.forEach((box) => {
            box.style.pointerEvents ="none";
            });

       //now we know X/O is winner
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
     }
   });
   //means we have winner
   if(answer !== ""){
     gameInfo.innerText = `Winner Player - ${answer}`;
     newGameBtn.classList.add("active");
     return;
   }
   //lets check game is tied or not 
   let fillCount =0;
   gameGrid.forEach ((box) => {
      if(box !== ""){
        fillCount ++;
      }
   });

   //board is filled ,game is Tied 
   if(fillCount === 9){
    gameInfo.innerText= `Game Tied !`;
    newGameBtn.classList.add("active");
   }
}

function swapTurn(){
      if(currentPlayer === "X"){
          currentPlayer = "O";
      }
      else{
         currentPlayer = "X";
      }
      //UI Update
      gameInfo.innerText= `Current player -${currentPlayer}`;
}
function handleClick(index) {
  if (gameGrid[index] === "") { // Assuming you have a way to check if the game is over
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap turn
    swapTurn(); // Function to change the current player
    //check for winner or is Game Over
    checkGameOver();
  }
}
boxes.forEach((box,index) => {
      box.addEventListener("click" ,() => handleClick(index));
});

newGameBtn.addEventListener("click",initGame);
