// Find all the information about each products

db.products.find().toArray()

// Find the product price which are between 400 to 800

db.products.find({product_price:{$gt:400, $lt:800}})

// Find the product price which are not between 400 to 600

db.products.find({product_price:{$not:{$gt:400, $lt:800}}})

// List the four product which are grater than 500 in price 
db.products.find({product_price:{$gt:500}}).limit(4);

//Find the product name and product material of each products
db.products.find().forEach(function(prod){print("product_name "+" "+prod.product_name +" "+"product_price" +" "+ prod.product_price)})

//Find the product with a row id of 10
db.products.find({id:"10"})

//Find only the product name and product material
db.products.find().forEach(function(prod){print("product_name "+" "+prod.product_name +" "+"product_material" +" "+ prod.product_material)})

//Find all products which contain the value of soft in product material 
db.products.find({product_material:"Soft"})

//Find products which contain product color indigo  and product price 492.00

db.products.find({$and:[{product_color:"indigo"}, {product_price : 492.00}]})

//Delete the products which product price value are same

db.products.aggregate([
        {$group :{
            _id:"$product_price",
            duplicate:{$addToSet:"$_id"},
            Totalcount : {$sum :1}
        }},
        {
            $match : {
                Totalcount : {$gt:1} 
            }
        }
    ]).forEach((doc)=>{
        doc.duplicate.shift(); 
        db.students.deleteMany({_id:{$in:doc.duplicate}})
    })
    