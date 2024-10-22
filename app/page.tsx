import { HeroCarousel } from "@/components/HeroCarousel";
import { Searchbar } from "@/components/Searchbar";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/actions";
const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="  md:px-20 py-17  ">
        <div className="  flex max-xl:flex-col gap-16">
          <div className="  flex flex-col justify-center">
            <div className="blurred p-10 rounded-lg">
              <p className="  small-text">
                {/* Smart shopping starts here! */}
                {/* <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow-right"
                  height={16}
                  width={16}
                /> */}
              </p>
              <h1 className="head-text !text-white-100">
                Save money with 
                <span className="text-primary"> Price Tracker</span>
              </h1>
              <p></p>
              <Searchbar />
            </div>
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="  trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-16">
          {allProducts?.toReversed().map((product) => (
            <div>
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
