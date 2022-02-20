let tables=document.getElementById("tables");
let menu=document.getElementById("menu");

let tableCount=0;
let tableData=[]
let foodItems=[]


function addTable(name,price){
    tableCount++;
    let table=document.createElement('div');
    tables.appendChild(table);
    table.setAttribute("class","table");
    let tableName=document.createElement('h1');
    tableName.innerHTML=name;
    table.appendChild(tableName);
    let priceItemcount=document.createElement("div");
    priceItemcount.setAttribute("class","price-itemCount")
    table.appendChild(priceItemcount);
    let rsText=document.createElement("h3");
    rsText.innerHTML="Rs."
    priceItemcount.appendChild(rsText);
    let totalPrice=document.createElement('h3')
    priceItemcount.appendChild(totalPrice);
    totalPrice.setAttribute("id",`table${tableCount}-price`);
    totalPrice.style.marginRight="20%"
    totalPrice.innerHTML=price
    let totalItems=document.createElement("h3")
    priceItemcount.appendChild(totalItems);
    totalItems.innerHTML="Total items:"
    let itemCount=document.createElement("h3")
    priceItemcount.appendChild(itemCount)
    priceItemcount.setAttribute("id",`table${tableCount}-itemCount`)
    itemCount.innerHTML="0";
    
}

function addFoodItemToMenu(name,cost){
    let foodItem=document.createElement("div")
    menu.appendChild(foodItem)
    foodItem.setAttribute("class","foodItem "+name)
    let foodItemName=document.createElement("h1")
    foodItem.appendChild(foodItemName)
    foodItemName.innerHTML=name
    let foodItemPrice=document.createElement("h3");
    foodItem.appendChild(foodItemPrice)
    foodItemPrice.innerHTML=cost
}

function loadData(){
    fetch("./tables.txt").then(res=>res.text()).then(function(data){
        tableData=JSON.parse(data)
        console.log(tableData);
        tableData.forEach(item=>{
            addTable(item.tableName,item.totalPrice)
        })
    })
    fetch("./foodItems.txt").then(res=>res.text()).then(function(data){
        foodItems=JSON.parse(data)
        foodItems.forEach(item=>{
            addFoodItemToMenu(item.name,item.cost);
        })
    })
}
loadData();