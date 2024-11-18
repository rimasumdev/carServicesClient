const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row gap-4 lg:gap-10">
          <div className="w-full lg:w-1/2 relative ">
            <img
              src="/images/about_us/person.jpg"
              className="lg:w-2/3 w-full rounded-lg shadow-2xl object-cover object-left"
            />
            <img
              src="/images/about_us/parts.jpg"
              className="w-1/2 absolute -right-5 lg:right-5 top-1/2 rounded-lg shadow-2xl border-8 border-base-100"
            />
          </div>
          <div className="w-full lg:w-1/2 self-start space-y-4 lg:space-y-4 mt-10 lg:mt-0">
            <p className="text-base lg:text-lg text-primary font-bold">
              About Us
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold">
              We are qualified & of experience in this field
            </h1>
            <p className="py-4 lg:py-6 text-sm lg:text-base">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable.
            </p>
            <p className="text-sm lg:text-base">
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don&apos;t look even slightly
              believable.
            </p>
            <button className="btn btn-primary !mt-8 ">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
