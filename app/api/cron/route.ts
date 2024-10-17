import { NextResponse } from "next/server";

import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapAmazonProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 50; 
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products || products.length === 0) throw new Error("No product fetched");

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        try {
          // Scrape product
          const scrapedProduct = await scrapAmazonProduct(currentProduct.url);
          
          if (!scrapedProduct) {
            console.error(`Failed to scrape product with URL: ${currentProduct.url}`);
            return null; // Skip updating if scraping failed
          }

          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ];

          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          const updatedProduct = await Product.findOneAndUpdate(
            { url: product.url },
            product,
            { new: true } // Return the updated product
          );

          const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

          if (emailNotifType && updatedProduct.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };
            const emailContent = await generateEmailBody(productInfo, emailNotifType);
            const userEmails = updatedProduct.users.map((user: any) => user.email);
            await sendEmail(emailContent, userEmails);
          }

          return updatedProduct;
        } catch (scrapeError: any) {
          console.error(`Error scraping product: ${currentProduct.url}, Error: ${scrapeError.message}`);
          return null; // Skip the current product if there's an error
        }
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts.filter(Boolean), // Filter out null values
    });
  } catch (error: any) {
    console.error(`Failed to get all products: ${error.message}`);
    return NextResponse.json({
      message: `Failed to get all products: ${error.message}`,
    }, { status: 500 });
  }
}
