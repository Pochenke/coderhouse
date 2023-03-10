import express from "express";
import path from "path";
import ProductManager from "./ProductManager.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const productManager = new ProductManager(
    path.resolve(process.cwd(), "public", "products.json")
);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;
        let limitedProducts;

        if (limit) {
            limitedProducts = products.slice(0, limit);
        }
        res.send(limitedProducts || products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const requestedId = parseInt(req.params.pid);
        const requestedProduct = await productManager.getProductById(requestedId);
        res.send(requestedProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});


let a = await productManager.getProductById(3);
console.log(a, 'a');