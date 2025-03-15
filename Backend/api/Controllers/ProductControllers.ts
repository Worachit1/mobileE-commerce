import {Request, Response} from 'express';
import { PRODUCTS } from '../Models/ProductModels';
import { CATEGORIES } from '../Models/CategoryModel';
import { ProductItem, ProductsParams } from '../dto/Product';
import { port } from '../config';


export const createProduct = async (req:Request, res:Response) => {
    const {name, description, price, oldPrice, quantity, isFeatured, inStock, category, businessId} =<ProductsParams>req.body;


    const files = req.files as [Express.Multer.File];
    const path = `${port}/assets/`
    const images = files.map((file:Express.Multer.File) => path+file.filename)

    const product = new PRODUCTS ({
        name: name,
        images:images,
        description,
        price,
        oldPrice,
        category,
        quantity,
        inStock,
        isFeatured,
        businessId
    });

    try {
        console.log(product)
        await product.save();
        res.status(200).json(`product create successfully \n${product}`)
    }catch (err) {
        res.status(500).json(`Failed to create product ${err}`);
    }
}


export const getProductByCatId = async (req:Request, res:Response) => {
        //console.log(req.params.catId)
    try{
        const result = await PRODUCTS.find({category: req.params.catId})
        res.status(200).json({result})
    }catch(err) {
        res.status(500).json(`fetch ProductById failed ${err}`)
    }
}

export const getAllCProducts = async (req:Request, res:Response) => {

    try{
        const products = await PRODUCTS.find().sort({createAt: -1})
        .populate("businessId", 'firstName')
        .populate('category', 'name')
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json(`Products not found${err}`)
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await PRODUCTS.findById(req.params.id)
            .populate("businessId", 'firstName')
            .populate('category', 'name')
        

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(`Fetch Product failed: ${err}`);
    }
};


export const getFeaturedProducts = async (req:Request, res:Response) => {

    try{
        const featuredProducts = await PRODUCTS.find({isFeatured: true})
        const Products = featuredProducts
        res.status(200).json({Products})
    }catch(err) {
        res.status(500).json({err})
    }
}

export const getTrendingProducts = async (req:Request, res:Response) => {

    try{
        const result = await PRODUCTS.find({isFeatured: true}).limit(5).sort({createAt: -1}) //limit(5) คือ เลือกแค่ 5 product 
        
        res.status(200).json({result})
    }catch(err) {
        res.status(500).json({err})
    }
}

export const getWelcomeProducts = async (req:Request, res:Response) => {

    try{
        const result = await PRODUCTS.find({proce: {$eq:300}}).limit(6)
        
        res.status(200).json({result})
    }catch(err) {
        res.status(500).json({err})
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, oldPrice, category, quantity, inStock, isFeatured, businessId } = req.body as ProductItem;
        const files = req.files as [Express.Multer.File];
        const path = `${port}/assets/`
        const images = files.map((file:Express.Multer.File) => path+file.filename)

        const productUpdate = await PRODUCTS.findByIdAndUpdate(
            req.params.id,
            { 
                name, 
                images, 
                description, 
                price, 
                oldPrice, 
                category, 
                quantity, 
                inStock, 
                isFeatured, 
                businessId 
            },
            { new: true }
        );

        if (!productUpdate) {
            res.status(500).send("The product cannot be updated");
            return;
        }

        res.status(200).json({ success: true, message: "Product updated successfully", product: productUpdate });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the product"});
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await PRODUCTS.findByIdAndDelete(req.params.id);

        if (!product) {
            res.status(500).send('The product cannot be deleted');
            return; // หยุดฟังก์ชันเมื่อส่ง response
        }

        res.status(200).json('Product deleted successfully');
    } catch (error) {
        res.status(500).send('An error occurred while deleting the product');
    }
}

export const getProductsByBusinessId = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await PRODUCTS.find({ businessId: req.params.businessId })
        .populate("businessId", 'firstName')
        .populate('category', 'name');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('An error occurred while fetching the products');
    }
}
