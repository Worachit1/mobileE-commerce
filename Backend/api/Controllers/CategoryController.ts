import express, {Request, Response} from 'express';

import { CATEGORIES } from '../Models/CategoryModel';
import { CategoryObj, UpdateCategory } from '../dto/Categories';
import { port } from '../config';



export const createCategory = async (req:Request, res:Response) => {
    const {name} =<CategoryObj> req.body;

    const files = req.files as [Express.Multer.File];
    const path = `${port}/assets/`
    const images = files.map((file:Express.Multer.File) => path+file.filename)

    const categories = new CATEGORIES ({
        name: name,
        images:images
    });

    try {
        //console.log(categories)
        await categories.save();
        res.status(200).json('category create successfully')
    }catch (err) {
        res.status(500).json(`Failed to create category ${err}`);
    }
}

export const getCategory = async (req:Request, res:Response) => {

    try{
        const result = await CATEGORIES.findById(req.params.id)
        res.status(200).json(result)
    }catch(err) {
        res.status(500).json(`Category fetch failed ${err}`)
    }
}

export const getAllCategories = async (req:Request, res:Response) => {

    try{
        const result = await CATEGORIES.find().limit(30)
        res.status(200).json(result)
    }catch(err) {
        res.status(500).json(`Categories not found${err}`)
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body as UpdateCategory;
        const files = req.files as [Express.Multer.File] | undefined;
        const path = `${port}/assets/`;  // Use process.env.PORT or your server's base URL

        // Initialize images array to hold file paths
        let images: string[] = [];

        // If files are provided, process them
        if (files) {
            images = files.map((file: Express.Multer.File) => `${path}${file.filename}`);
        }

        // Update category
        const updatedCategory = await CATEGORIES.findByIdAndUpdate(
            req.params.id,
            { name, images: images.length > 0 ? images : undefined },
            { new: true } // Ensure we get the updated category
        );

        if (!updatedCategory) {
            res.status(404).send('Category not found or could not be updated');
            return;
        }

        res.status(200).json('Category updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the category');
    }
};

export const deleteCategory = async (req:Request, res:Response) => {
    
    try{
        const fintCat = await CATEGORIES.findByIdAndDelete(req.params.id)
        res.status(200).json('Category remove successsfully')
    }catch(err) {
        res.status(500).json(`Category delete failed${err}`)
    }
}
