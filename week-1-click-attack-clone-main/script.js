let score = 0;
const attacks=[];

const playerNameInput=document.getElementById("playerName");
const attackValueInput=document.getElementById("attackValue");
const message= document.getElementById("message");
const historyList = document.getElementById("history");


const scoreDisplay = document.getElementById("score");
const title = document.getElementById("title");
const attackButton = document.getElementById("attackButton");
const powerButton=document.getElementById("powerButton")
const resetButton = document.getElementById("resetButton");
// TODO: create addPoint()
function performAttack() {
  const playerName = playerNameInput.value.trim();
 const attackValue = getAttackValue();

  if (playerName===""){
    message.innerText="Please enter your name";
    return;
  }
  if (attackValue===null){
    return;
  }
  const isCritical=attackValue===10;
  const damage=calculateDamage(attackValue,isCritical);

  score +=damage;
  attacks.push(damage);
  message.innerText=`${playerName} caused ${damage} damage`;
updateDisplay();
}

function updateHistory(){
  historyList.innterHTML="";

  for (let index=0; index<attacks.length; index++){
    const listItem= document.createElement("li");
    listItem.innerText=`Attack${index + 1}:${attacks[index]}damage`;
    historyList.appendChild(listItem);
    const totalAttacks=attacks.length;
  }
}

// TODO: create resetGame()
function resetGame() {
  score = 0;
  attacks.length=0;
  playerNameInput.value="";
  attackValueInput.value="1";
  title.innerText = "Click Attack";
 message.innetText="Enter your name and chosen attack value";
 updateDisplay();
}
//Update display
function updateDisplay() {
  scoreDisplay.innerText = score;
  updateHistory();

  if (score>=20) {
    title.innerText = "You Win!";
    attackButton.disabled = true;
  }else{
    title.innerText="Click Attack!";
    attackButton.disabled=false;
  }
}
function powerPoint(){
  score+=5;
  updateDisplay()
}
function getAttackValue(){
  const rawValue = attackValueInput.value.trim();

  if(rawValue===""){
    message.innerText="Enter a valid number";
    return null;
  }

  const attackValue=Number(rawValue);

  if (Number.isNaN(attackValue)){
    message.innerText="Enter a valid number";
    return null;
  }
  if (attackValue<1 || attackValue>10){
    message.innerText="Choose an attack value from 1 to 10";
    return null;
  }
  return attackValue;
}
function updateDisplay() {
  scoreDisplay.innerText = score;
  updateHistory();
  if (score >= 20) {
    title.innerText = "YOU WIN!";
  }
}
function calculateDamage(baseDamage, isCritical){
  if(isCritical){
    return baseDamage*2;
  }
  return baseDamage;
}





// TODO: connect both functions to buttons
attackButton.addEventListener("click", performAttack);
resetButton.addEventListener("click", resetGame);
powerButton.addEventListener("click", powerPoint);
