'use server'
import { revalidatePath } from "next/cache";
// import { useRouter } from "next/navigation";
// import bodyParser from 'body-parser';
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { User } from "@/types";
import { Check } from "@/types";
import { scrapeAmazonProduct } from "../scraper";
import { redirect} from "next/navigation";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody } from "../nodemailer";
import { sendEmail } from "../nodemailer";
import { stringify } from "querystring";
export async function scrapAndStoreProduct (productUrl :string){
    // console.log(productUrl);
    if(!productUrl) return ;

    try{
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return ;

        let product = scrapedProduct;
        // console.log(product);
        const existingProduct = await Product.findOne({url:scrapedProduct.url});
        if(existingProduct){
            const updatedPriceHistory : any=[
                ...existingProduct.priceHistory,{price:scrapedProduct.currentPrice}
            ]
            product = {
                ...scrapedProduct,
                priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url:scrapedProduct.url},
            product,
            {upsert:true,new:true}
        );

        revalidatePath(`/products/${newProduct._id}`);
        return JSON.stringify(newProduct);
        // console.log(newProduct);
        // redirect(`/products/${newProduct._id}`);
        
    }
    catch(e: any){
        throw new Error(`Failed to create/update the product: ${e.message}`)
    }
}

export async function getProductById (productId: String){
    try{
        connectToDB();
        const product = await Product.findOne({_id:productId})
        if(!product) return null;
        return product;

    }
    catch(e){
        console.log(e);
    }
}

export async function getAllProducts (){
    try{
        connectToDB();
        const products = await Product.find();
        return products;

    }
    catch(e){
        console.log(e);
    }
}

export async function addUserEmailToProduct(productId:string,userEmail:string){
    // console.log(userEmail);
    try{
        var product = await Product.findById(productId);
        console.log(product);
        if(!product) return 

        const userExists = product.users.some((user:User) => user.email===userEmail);
        // console.log(product.users[0].email);
        if(!userExists){
            product.users.push({email:userEmail});
            console.log(product);
            // const newProduct = JSON.parse(product);
            const newProduct = await Product.findOneAndUpdate({_id:productId},product,{new:true});
            console.log(newProduct);
            // await Product.findOneAndUpdate({_id:productId},product,{new:true});
            // await product.save();
            // console.log('hello');
            
            const emailContent = await generateEmailBody(product,"WELCOME");
            await sendEmail(emailContent,userEmail);
        }
    }
    catch(e){
        console.log(e);
    }
}