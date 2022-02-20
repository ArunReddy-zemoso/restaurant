let tables=document.getElementById("tables");
let menu=document.getElementById("menu");

let tableCount=3;

function addTable(){
    console.log(tables);
    let table=document.createElement('div');
    tables.appendChild(table);
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
    let totalPrice=document.createElement('h3')
    priceItemcount.appendChild(totalPrice);
    totalPrice.setAttribute("id",`table${tableCount}-price`);
    totalPrice.style.marginRight="20%"
    totalPrice.innerHTML="0"
    let totalItems=document.createElement("h3")
    priceItemcount.appendChild(totalItems);
    totalItems.innerHTML="Total items:"
    let itemCount=document.createElement("h3")
    priceItemcount.appendChild(itemCount)
    priceItemcount.setAttribute("id",`table${tableCount}-itemCount`)
    itemCount.innerHTML="0";
    
}
addTable();