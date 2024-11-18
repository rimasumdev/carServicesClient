const Carousel = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="carousel w-full rounded-lg h-[400px] md:h-[600px] lg:h-[750px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="/images/banner/1.jpg"
            className="w-full h-full object-cover object-center md:object-top"
          />
          <div className="absolute bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent flex items-center justify-center lg:justify-start rounded-lg w-full h-full p-4 md:p-8 lg:p-16">
            <div className="flex flex-col gap-3 md:gap-4 items-center lg:items-start max-w-md">
              <h1 className="text-white text-2xl md:text-3xl lg:text-6xl font-bold text-center lg:text-left">
                Affordable Price For Car Servicing
              </h1>
              <p className="text-white text-sm md:text-base text-center lg:text-left">
                There are many variations of passages of available, but the
                majority have suffered alteration in some form
              </p>
              <div className="flex gap-2 md:gap-4 flex-wrap justify-center lg:justify-start">
                <button className="btn btn-primary btn-sm md:btn-md">
                  Shop Now
                </button>
                <button className="btn btn-outline btn-primary btn-sm md:btn-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-2 right-2 md:left-5 md:right-5 bottom-5 gap-2 flex justify-end">
            <a href="#slide4" className="btn btn-circle btn-sm md:btn-md">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-sm md:btn-md">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="/images/banner/2.jpg"
            className="w-full h-full object-cover object-center md:object-top"
          />
          <div className="absolute bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent flex items-center justify-center lg:justify-start rounded-lg w-full h-full p-4 md:p-8 lg:p-16">
            <div className="flex flex-col gap-3 md:gap-4 items-center lg:items-start max-w-md">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
                Discover Amazing Deals
              </h1>
              <p className="text-white text-sm md:text-base text-center lg:text-left">
                Explore our wide range of products at unbeatable prices.
              </p>
              <div className="flex gap-2 md:gap-4 flex-wrap justify-center lg:justify-start">
                <button className="btn btn-primary btn-sm md:btn-md">
                  Shop Now
                </button>
                <button className="btn btn-outline btn-primary btn-sm md:btn-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-2 right-2 md:left-5 md:right-5 bottom-5 gap-2 flex justify-end">
            <a href="#slide1" className="btn btn-circle btn-sm md:btn-md">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle btn-sm md:btn-md">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="/images/banner/3.jpg"
            className="w-full h-full object-cover object-center md:object-top"
          />
          <div className="absolute bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent flex items-center justify-center lg:justify-start rounded-lg w-full h-full p-4 md:p-8 lg:p-16">
            <div className="flex flex-col gap-3 md:gap-4 items-center lg:items-start max-w-md">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
                Special Offers
              </h1>
              <p className="text-white text-sm md:text-base text-center lg:text-left">
                Don&apos;t miss out on our limited-time deals and promotions.
              </p>
              <div className="flex gap-2 md:gap-4 flex-wrap justify-center lg:justify-start">
                <button className="btn btn-primary btn-sm md:btn-md">
                  Shop Now
                </button>
                <button className="btn btn-outline btn-primary btn-sm md:btn-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-2 right-2 md:left-5 md:right-5 bottom-5 gap-2 flex justify-end">
            <a href="#slide2" className="btn btn-circle btn-sm md:btn-md">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle btn-sm md:btn-md">
              ❯
            </a>
          </div>
        </div>

        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="/images/banner/4.jpg"
            className="w-full h-full object-cover object-center md:object-top"
          />
          <div className="absolute bg-gradient-to-t lg:bg-gradient-to-r from-black to-transparent flex items-center justify-center lg:justify-start rounded-lg w-full h-full p-4 md:p-8 lg:p-16">
            <div className="flex flex-col gap-3 md:gap-4 items-center lg:items-start max-w-md">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
                Premium Quality
              </h1>
              <p className="text-white text-sm md:text-base text-center lg:text-left">
                Experience the best quality products and services.
              </p>
              <div className="flex gap-2 md:gap-4 flex-wrap justify-center lg:justify-start">
                <button className="btn btn-primary btn-sm md:btn-md">
                  Shop Now
                </button>
                <button className="btn btn-outline btn-primary btn-sm md:btn-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-2 right-2 md:left-5 md:right-5 bottom-5 gap-2 flex justify-end">
            <a href="#slide3" className="btn btn-circle btn-sm md:btn-md">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle btn-sm md:btn-md">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
