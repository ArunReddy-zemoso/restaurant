let tables=document.getElementById("tables");
let menu=document.getElementById("menu");
let tableSearch=document.getElementById("search-table");
let menuSearch=document.getElementById("search-foodItem");

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
    let foodItemName=document.createElement("h2")
    foodItem.appendChild(foodItemName)
    foodItemName.innerHTML=name
    let foodItemPrice=document.createElement("h3");
    foodItem.appendChild(foodItemPrice)
    foodItemPrice.innerHTML=cost
}

function loadData(){
    fetch("./tables.txt").then(res=>res.text()).then(function(data){
        tableData=JSON.parse(data)
        tableData.forEach(item=>{
            addTable(item.tableName,item.totalPrice)
        })
    }).catch(function(){
        console.log("Error while loading tables data");
    })
    fetch("./foodItems.txt").then(res=>res.text()).then(function(data){
        foodItems=JSON.parse(data)
        console.log(foodItems);
        foodItems.forEach(item=>{
            let categoryNameDiv=document.createElement("div");
            menu.appendChild(categoryNameDiv);
            categoryNameDiv.style.marginLeft="43%";
            let categoryName=document.createElement("h1");
            categoryNameDiv.appendChild(categoryName);
            categoryName.setAttribute("class","categoryName")
            categoryName.innerHTML=item.category_name;
            
            //categoryName.style.border="solid #000000";

            console.log(categoryName);
            item.menuItems.forEach(fooditem=>{
                addFoodItemToMenu(fooditem.name,fooditem.price)
            })
        })
    }).catch(function(){
        console.log("Error while loading foodMenu");
    })
}

tableSearch.addEventListener("keyup",function(event){
    let value=event.target.value;
    if(value!==null){
        let tableslist=document.querySelectorAll(".table");
        tableslist.forEach(table =>{
            if(!table.children[0].innerHTML.includes(value)){
                table.style.display="none";
            }
            else{
                table.style.display="";
            }
        })
    }

})

loadData();