import express from 'express';
import { CreateCategoryController, categoryControlller, deleteCategoryController, singleCategoryController, updateCategoryController }from "../Controllers/CategoryController.js";


const router = express.Router();
// routes 
// create Category

router.post("/create-catgory",CreateCategoryController);

// update Category
router.put("/update-category/:id",updateCategoryController);


// get all  categories
router.get("/get-category",categoryControlller);

// get one category
router.get("/single-category/:slug",singleCategoryController);

// delete Category
router.delete("/delete-category",deleteCategoryController);

export default router;