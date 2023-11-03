import CategoryModel from "../models/CategoryModel.js";

import slugify from "slugify";




// create category 

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await CategoryModel.findOne({name});
    if(existingCategory){
        return res.status(200).send({ message: "Category already exists" });
    }
    const category  = await new  CategoryModel({
        name,
        slug: slugify(name, {lower: true})
    }).save();
    res.status(201).send({
        success:true,
        message:"Category created",
        category,
    });
  } catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:error.message
    });
  }
};


// update category
export const updateCategoryController = async(req, res) => {
  try {
    const {name} = req.body;
    const {slug} = req.params;
    const category  = await CategoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {lower: true});
    res.status(200).send({
        success:true,
        message:"Category updated",
        category,
    });
    
  } catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:"Error while updating category",
    });
    
  }

}

// get all categories
export const categoryControlller = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
   res.status(200).send({
    success:true,
    message:" All Categories fetched",
    category,
   })
   
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// fetch single category
export const singleCategoryController = async(req,res)=>{
 try {
  const category = await CategoryModel.findOne({slug:req.params.slug});
  res.status(200).send({success:true, message:"Category fetched", category})
  
 } catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:"Error while getting single category",
  });
  
 }
}



// delete category 
export const deleteCategoryController = async(req,res)=>{
  try {
    const {id}= req.body;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
        success:true,
        message:"Category deleted",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"Error while deleting category",
    });
    
  }

}