


# Basic Node.js TypeScript ( CRUD using mysql )
This is basic **CRUD** API written in **node.js** using **TypeScript** with the **Express** framework, which connects to **MySQL** ( relational database )

## Table of Contents

 - [How to install](##How%20to%20install)
 - [Requirement](##Requirement)
 - [How to run](##How%20to%20run)

## How to install

``` bash
git clone https://github.com/ntwsam/basic-nodejs-ts.git
```

## Requirement

 - **Node.js**
 - **Postman** or tool for testing HTTP
 - **MySQL**
	 - need database **product_demo** 
	 - need table **products**
		 - `CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    review_count INT,
    image_url VARCHAR(255)
);
`
	
**table result** :
		 
|id|name|price|discount|review_count|image_url|
|--|------|------|-----------|-------------|-|
| 1 | product 1 | 11.11 | 1.00 | 11 | https://example.com/image5.jpg
| 2 | product 2 | 22.00 | 2.22 | 22 | https://example.com/image2.jpg

## How to run

1. Run project with **VSCode**

	 - Open folder this project or Use **Command Prompt** select this project
		 - Click on **File > Open Folder...**  and select this project folder
		 - or Use **Command Prompt**
			``` bash
			cd basic-restapi-nodejs 
			code .
			```
	 - Open **Terminal** in VSCode
		- Click on **Terminal** ( on the top of menu bar)
		- Choose **New Terminal** or use the shortcut`Ctrl + Shift + ~` (Windows) or `Cmd + Shift + ~` (Mac) to oepn a terminal in VSCode.
	-  Complie TypeScript : will automatically complie **TypeScript** to **JavaScript** and create **dist/index.js**
		- use `npm run build`
			``` bash
			npm run build
			```
	 - Run this project
		- use `npm start` :
			``` bash
			npm start
			```
		 - use `nodemon run dev` : will automatically restart the server when you make changes to the files.
			``` bash
			nodemon run dev
			```
	- Verify the project
		- after running either `npm start` or `nodemon run dev`, you application will start and you can open your web browser and go to `http://localhost:3000` ( or whatever URL your server run on) to see the result.

2. Testing Http with **Postman**
	- **Get all product**
		-  use `get` and `localhost:3000/products` to get all product
	- **Add new product**
		- use `post` and `localhost:3000/products`to add new product
		-  **require request body**
			- name
			- price
			- discount
			- review_count
			- image_url
	- **Delete product**
		- use `delete` and `localhost:3000/products/:id` use route parameter for delete selection product
		- **require route parameter**
	- **Update product**
		- use `put` and `localhost:3000/products/:id` use route parameter for update selection product
		- **require route parameter**
		- **require request body**
			- name
			- priced
			- iscount
			- review_count
			- image_url
	- **Get select product**
		-  use `get` and `localhost:3000/products/:id` use route parameter for get selection product.
		- **require route parameter**
