import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

type Props = {};

const WellcomePage = (props: Props) => {
  const style = { color: "black", background: "", fontSize: "2em" };
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      {/* this is the maimsection for redirecting to thr 
          login page
      
      */}

      <section>
        <div className=" text-white py-20 h-screen bg-wellcomeimg bg-no-repeat bg-cover scroll-smooth font-poppins">
          <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
            <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              <h1
                data-aos="fade-up"
                className="text-3xl md:text-5xl   dark:text-white font-bold tracking-loose"
              >
                LRAS
              </h1>
              <h2
                data-aos-delay="500"
                data-aos="fade-up"
                className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 text-black"
              >
                Secure and ease
              </h2>
              <p
                data-aos-delay="800"
                data-aos="fade-up"
                className="text-sm md:text-base text-black mb-4"
              >
                LRAS provides simple and dependable software that can be easily
                managed and controlled for greater comprehension.
              </p>
              <Link to="/signup">
                <a
                  data-aos-delay="1200"
                  data-aos="fade-up"
                  href="/"
                  className="bg-transparent hover:dark:bg-gray-900 text-black hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-white hover:border-transparent"
                >
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* this is the secondsection for redirecting to thr 
          login page
      
      */}
      <section className="relative  bg-blueGray-50">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div className="absolute top-0 w-full h-full  bg-no-repeat bg-center bg-wellcomeimg2 ">
            <span
              //id="blackOverlay"
              className="w-full h-full absolute  bg-black opacity-80 "
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1
                    data-aos="fade-up"
                    className="text-white font-semibold text-5xl"
                  >
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200 text-white">
                    LRAS is the first system that prioritizes security,
                    accessibility, and authentication for all system users.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px blob"
            // style="transform: translateZ(0px)"
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="pb-10 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                {/*  */}
                <div
                  data-aos-delay="500"
                  data-aos="fade-up"
                  className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Awarded Agency</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Customers and end-users alike rated us as a better choice
                      for accuracy and simplicity of use.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 text-center">
                {/*  */}
                <div
                  data-aos-delay="800"
                  data-aos="fade-up"
                  className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Free Revisions</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Advances in technology have resulted in abundant
                      information and statistics in the ongoing development of
                      accessibility and comprehension.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                {/*  */}
                <div
                  data-aos-delay="1200"
                  data-aos="fade-up"
                  className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Verified Company</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Our vision is to ensure the advancement of future
                      technologies and information for everybody.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative  pt-8 pb-6 mt-1">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made with{" "}
                    <a
                      href="/"
                      className="text-blueGray-500 hover:text-gray-800"
                      target="_blank"
                    >
                      Notus JS
                    </a>{" "}
                    by{" "}
                    <a
                      href="/"
                      className="text-blueGray-500 hover:text-blueGray-800"
                      target="_blank"
                    >
                      {" "}
                      Creative Tim
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </section>
      {/* this is the thirdsection for redirecting to thr 
          login page
      
      */}
      <section className="w-full p-9 ">
        <div className="  flex flex-col md:flex-row  max-w-6xl mx-auto h-[500px] shadow-lg  rounded-md  text-black ">
          <div className="md:w-1/2 w-full h-full bg-ray-100  p-4">
            <div className="w-full flex flex-col p-5  h-full  jsu">
              <h1 className="text-6xl py-6">LRAS</h1>
              <p className="py-4 ">
                Our mission is to ensure that future technologies and knowledge
                improve for everyone.
              </p>
              <p className="py-4 ">
                Technological advancements have resulted in an abundance of
                information and data in the continual growth of accessibility
                and comprehension.
              </p>
              <div className="my-12">
                <Link to="/signup">
                  <a
                    href="/"
                    className="  bg-transparent hover:dark:bg-gray-900 text-black hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-gray-200 hover:border-transparent"
                  >
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-full   p-4">
            <div className="w-full  h-full  md:py-7 my-0">
              <div
                data-aos-delay="500"
                data-aos="fade-up"
                className="flex justify-between items-center w-full h-auto  py-2 my-2 border-b-2 border-gray-200"
              >
                <div>
                  <h1 className="text-2xl font-semibold text-black ">
                    {" "}
                    Guaranteed 100% satisfaction
                  </h1>
                  <h2>Insure the happiness for our client</h2>
                </div>
                <div className="">
                  <AiOutlineCheckCircle style={style} />
                </div>
              </div>
              <div
                data-aos-delay="800"
                data-aos="fade-up"
                className="flex justify-between items-center w-full h-auto  py-2 my-9 border-b-2 border-gray-200 "
              >
                <div>
                  <h1 className="text-2xl font-semibold text-black">
                    Guaranteed 100% Flexablity
                  </h1>
                  <h2>
                    Easy Communication and suppout to our client and users
                  </h2>
                </div>
                <div>
                  <AiOutlineCheckCircle style={style} />
                </div>
              </div>
              <div
                data-aos-delay="1100"
                data-aos="fade-up"
                className="flex justify-between items-center w-full h-auto  py-2 my-9 border-b-2 border-gray-200"
              >
                <div>
                  <h1 className="text-2xl  font-semibold text-black">
                    {" "}
                    Guaranteed 100% Acccesablity
                  </h1>
                  <h2>Giving full needed information </h2>
                </div>
                <div>
                  <AiOutlineCheckCircle style={style} />
                </div>
              </div>
              <div
                data-aos-delay="1400"
                data-aos="fade-up"
                className="flex justify-between items-center w-full h-auto  py-2 md:my-9 my-0 border-b-2 border-gray-200"
              >
                <div>
                  <h1 className="text-2xl font-semibold text-black">
                    Top Level Security
                  </h1>
                  <p className="font-normal">
                    Keep your communication and data safe
                  </p>
                </div>
                <div>
                  <AiOutlineCheckCircle style={style} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer for the landing page */}
      <section className="mt-20">
        <footer className="bg-gray-50 text-gray-600 px-6 lg:px-8 py-12">
          <div className="max-w-screen-xl mx-auto mb-12 lg:mb-16  ">
            {/* <img
              className="h-8"
              src="/images/pathway-logo.svg"
              alt="UptimeMate logo"
            /> */}
          </div>
          <div className="max-w-screen-xl mx-auto ">
            <div className="grid grid-cols-8 md:grid-cols-9  lg:grid-cols-8  divide-gray-200 divide-y-2 md:divide-x-2 md:divide-y-0 md:-mx-8">
              <div className="col-span-8 md:col-span-3 lg:col-span-2 md:px-8 py-4 md:py-0">
                <h5 className="text-xl font-semibold text-gray-700">Company</h5>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Landingpages
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Download brochure
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-span-8 md:col-span-3 lg:col-span-3 md:px-8 py-4 md:py-0">
                <h5 className="text-xl font-semibold text-gray-700">
                  Industries
                </h5>
                <nav className="mt-4">
                  <ul className="grid lg:grid-cols-2">
                    <li className="mb-2">
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Employment
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Company
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Support
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/"
                        className="font-normal text-base hover:text-gray-400"
                      >
                        Download brochure
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-span-8 md:col-span-3 lg:col-span-3 md:px-8 py-4 md:py-0">
                <h5 className="text-xl font-semibold text-gray-700">
                  Follow us
                </h5>
                <nav className="mt-4">
                  <ul className="grid lg:grid-cols-2">
                    <li className="mb-2">
                      <a
                        href="/"
                        className="flex space-x-2 font-normal text-base hover:text-gray-400"
                      >
                        <svg
                          className="h-6 w-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span>Twitter</span>
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/"
                        className="flex space-x-2  font-normal text-base hover:text-gray-400"
                      >
                        <svg
                          className="h-6 w-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>Instagram</span>
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="/"
                        className="flex space-x-2  font-normal text-base hover:text-gray-400"
                      >
                        <svg
                          className="h-6 w-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>Facebook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 mt-8 lg:mt-12 border-t-2 border-gray-200 pt-8">
            <nav className="flex flex-wrap justify-center space-x-6">
              <a
                href="/"
                className="font-normal text-sm hover:text-gray-400 mb-2"
              >
                Cookie settings
              </a>
            </nav>
            <p className="text-sm text-center md:text-right">
              &copy;2020 Company. All rights reserved. | All rights reserved
            </p>
          </div>
        </footer>
      </section>
    </>
  );
};

export default WellcomePage;
