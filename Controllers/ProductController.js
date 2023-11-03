import ProductModel from "../models/ProductModel";
import CategoryModel from "../models/CategoryModel";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;

    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "name is required",
        });
      case !description:
        return res.status(500).send({
          error: "description is required",
        });
      case !price:
        return res.status(500).send({
          error: "price is required",
        });
      case !category:
        return res.status(500).send({
          error: "category is required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is required",
        });
      case !photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo is required and it should be less than 1 mb",
        });
      // default:
      //     break;
      // return res.status(500).send({
      //     error:"name is required"
      // })
    }

    const product = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Creating Product",
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
  try {
    // const products = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ $where: slug });
    const products = await ProductModel.find({ category: category._id }) 

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Getting Products",
    });
  }
};

// get single product
export const getSingleProduct = async (req, res) => {};

// update product
export const updateProduct = async (req, res)=>{
    try {
        const {name ,description, price , category, quantity} = req.fields;
        const {photo}=req.files;
        switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is Required" });
            case !description:
              return res.status(500).send({ error: "Description is Required" });
            case !price:
              return res.status(500).send({ error: "Price is Required" });
            case !category:
              return res.status(500).send({ error: "Category is Required" });
            case !quantity:
              return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
              return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
          }


          const products  = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)},{name:true});

          if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
          }

          await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    }); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While Updating Product",
        });
        
    }
}
