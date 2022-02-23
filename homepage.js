let tables=document.getElementById("tables");
let menu=document.getElementById("menu");
let tableSearch=document.getElementById("search-table");
let menuSearch=document.getElementById("search-foodItem");
const closeButton=document.querySelector(".close-button")
const modal=document.querySelector(".modal")
const billingTableName=document.getElementById("bill_heading");

closeButton.addEventListener("click",()=>{
    modal.classList.toggle("show-modal")
})


let tableCount=0;
let tableData=[]
let foodItems=[]


function addTable(name,price,itemcount){
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
    itemCount.setAttribute("id",`table${tableCount}-itemCount`)
    itemCount.innerHTML=itemcount;

    table.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    table.addEventListener("drop",(e)=>{
        e.preventDefault();
        console.log("drop");
        let foodItemName=e.dataTransfer.getData("foodItem")
        let foodItemPrice=e.dataTransfer.getData("price")
        console.log(foodItemName,foodItemPrice,tableName.innerHTML);
        totalPrice.innerHTML=parseFloat(totalPrice.innerHTML)+parseFloat(foodItemPrice)
        itemCount.innerHTML=parseFloat(itemCount.innerHTML)+1
        addFoodItemToTable(foodItemName,foodItemPrice,tableName.innerHTML)
    })
    table.addEventListener("click",()=>{
        modal.classList.toggle("show-modal")
        billingTableName.innerHTML=`${name} | Order Details`
    })
}

function addFoodItemToTable(foodItemName,foodItemPrice,tableName){
    let tablesData=JSON.parse(localStorage.getItem("tables"))
    tablesData.forEach(item=>{
        if(tableName===item.tableName){
            let isFoodItemPresent=false;
            item.foodItems.forEach(food=>{
                if(foodItemName===food.fooditem){
                    isFoodItemPresent=true
                    food.count=parseInt(food.count)+1
                }
            })
            if(!isFoodItemPresent){
                item.foodItems.push({"fooditem":foodItemName,"price":foodItemPrice,"count":1})
            }
            item.totalPrice=parseFloat(item.totalPrice)+parseFloat(foodItemPrice)
            
        }

    })
    localStorage.setItem("tables",JSON.stringify(tablesData));
}

function addFoodItemToMenu(name,cost){
    let foodItem=document.createElement("div")
    menu.appendChild(foodItem)
    foodItem.setAttribute("class","foodItem "+name)
    foodItem.setAttribute("draggable","true")
    let foodItemName=document.createElement("h2")
    foodItem.appendChild(foodItemName)
    foodItemName.innerHTML=name
    let foodItemPrice=document.createElement("h3");
    foodItem.appendChild(foodItemPrice)
    foodItemPrice.innerHTML=cost

    foodItem.addEventListener("dragstart",(e)=>{
        console.log("dragstart");
        e.dataTransfer.setData("foodItem",name)
        e.dataTransfer.setData("price",cost)
    })
}

function loadMenu(){
    fetch("./foodItems.txt").then(res=>res.text()).then(function(data){
        foodItems=JSON.parse(data)
        foodItems.forEach(item=>{
            let categoryNameDiv=document.createElement("div");
            menu.appendChild(categoryNameDiv);
            categoryNameDiv.style.marginLeft="43%";
            let categoryName=document.createElement("h1");
            categoryNameDiv.appendChild(categoryName);
            categoryName.setAttribute("class","categoryName")
            categoryName.innerHTML=item.category_name;
            item.menuItems.forEach(fooditem=>{
                addFoodItemToMenu(fooditem.name,fooditem.price)
            })
        })
    }).catch(function(){
        console.log("Error while loading foodMenu");
    })
}

function loadTables(){
    let tablesData=localStorage.getItem("tables")
    if(tablesData){
        JSON.parse(tablesData).forEach(item=>{
            let itemCount=0;
            item.foodItems.forEach(fooditem=>{
                itemCount+=fooditem.count
            })
            addTable(item.tableName,item.totalPrice,itemCount)
        })
    }
    else{
        fetch("./tables.txt").then(res=>res.text()).then(function(data){
            tableData=JSON.parse(data)
            localStorage.setItem("tables",JSON.stringify(tableData))
            tableData.forEach(item=>{
                addTable(item.tableName,item.totalPrice,0)
            })
        }).catch(function(){
            console.log("Error while loading tables data");
        })
    }
}

function loadData(){
    loadTables();
    loadMenu();
}

tableSearch.addEventListener("keyup",function(event){
    let value=event.target.value;
    if(value!==""){
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

menuSearch.addEventListener("keydown",function(event){
    if(event.key==="Enter" && event.target.value!==""){
        let value=event.target.value;
        let isCategory=false
        let temporaryList=[]
        foodItems.forEach(item=>{
            if(value===item.category_name){
                isCategory=true;
                item.menuItems.forEach(fooditem=>{
                    temporaryList.push(fooditem.name)
                })
            }
        })
        if(isCategory){
            let categories=document.querySelectorAll(".categoryName")
            categories.forEach(category=>{
                category.style.display="none";
            })
            let foodList=document.querySelectorAll(".foodItem")
            foodList.forEach(food=>{
                console.log(food.children[0].innerHTML);
                if(temporaryList.indexOf(food.children[0].innerHTML)> -1){
                    food.style.display="";
                }
                else{
                    food.style.display="none";
                }
            })
        }
        else{
            let categories=document.querySelectorAll(".categoryName")
            categories.forEach(category=>{
                category.style.display="none";
            })
            let foodList=document.querySelectorAll(".foodItem")
            foodList.forEach(food=>{
                console.log(food.children[0].innerHTML);
                if(food.children[0].innerHTML.includes(value)){
                    food.style.display=""
                }
                else{
                    food.style.display="none"
                }
            })
        }
    }
    else if(event.target.value===""){
        let categories=document.querySelectorAll(".categoryName")
            categories.forEach(category=>{
                category.style.display="";
            })
        let foodList=document.querySelectorAll(".foodItem")
        foodList.forEach(food=>{
            food.style.display="";
        })
    }
})

loadData();