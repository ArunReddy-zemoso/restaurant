let tables=document.getElementById("tables");
let menu=document.getElementById("menu");

let tableCount=3;

function addTable(){
    let table=document.createElement('div');
    table.setAttribute("class","table");
    let h1=document.createElement('h1');
    h1.innerHTML=`Table-${++tableCount}`;
    table.appendChild(h1);
    let priceItemcount=document.createElement("div");
    priceItemcount.setAttribute("class","price-itemCount")
    table.appendChild(priceItemcount);
    let rsText=document.createElement("div");
    rsText.innerHTML="Rs."
    priceItemcount.appendChild(rsText);
    let totalPrice=createElement('h3')
    totalPrice
}