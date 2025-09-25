let boxes=document.querySelectorAll(".box");
let msgcont=document.querySelector("#msg-cont");
let msg=document.querySelector("#msg");
let resetGame=document.querySelector("#reset-btn");
let cls=document.querySelector("#close-btn");
let container=document.querySelector(".container");

msgcont.classList.add("hide");
let turn=false;
let count=0;
let patterns=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let turnDisplay=document.createElement("p");
turnDisplay.id="turn-display";
turnDisplay.innerText="Turn: X";
container.prepend(turnDisplay);

for(let box of boxes)
{
    box.addEventListener("click",()=>
    {
        if(!turn)
        {
            box.innerText="X";
            turn=true;
            turnDisplay.innerText="Turn: O";
        }
        else
        {
            box.innerText="O";
            turn=false;
            turnDisplay.innerText="Turn: X";
        }
        count++;
        box.disabled=true;
        let winner=checkWinner();
        if(count===9 && !winner)
        {
            msg.innerText="Draw For Both";
            showPopup();
        }
    });
}

function checkWinner()
{
    for(let pattern of patterns)
    {
        let p1=boxes[pattern[0]].innerText;
        let p2=boxes[pattern[1]].innerText;
        let p3=boxes[pattern[2]].innerText;
        if(p1!="" && p2!="" && p3!="" && p1==p2 && p2==p3)
        {
            msg.innerText=`Winner is ${p1}`;
            showPopup();
            disableBoxes();
            return true;
        }
    }
    return false;
}

function showPopup()
{
    msgcont.classList.remove("hide");
    msgcont.classList.add("show");
}

function hidePopup()
{
    msgcont.classList.remove("show");
    msgcont.classList.add("hide");
}

function resetgame()
{
    enableBoxes();
    hidePopup();
    turn=false;
    count=0;
    turnDisplay.innerText="Turn: X";
}

function enableBoxes()
{
    for(let box of boxes) {box.disabled=false; box.innerText="";}
}

function disableBoxes()
{
    for(let box of boxes) box.disabled=true;
}

cls.addEventListener("click",hidePopup);
resetGame.addEventListener("click",resetgame);
