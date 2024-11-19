import Navbar from "@/layout/navbar";

export default function Home({ token }) {
  return (
    <main className="relative h-screen w-full text-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home/background.jpg')" }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full w-full bg-cover bg-center">
        <div className="pt-5">
          <Navbar />
        </div>
        <div className="flex flex-col justify-center items-center mt-32 md:mt-60 w-full">
          {/* Desktop and Tablet */}
          <h1 className="hidden md:block font-Passion text-8xl text-white">
            Manage Your Finances <br />{" "}
            <span className="flex justify-center items-center">
              With Expiense
            </span>
          </h1>

          {/* Android */}
          <h1 className="block text-5xl font-Passion text-white md:hidden">
            Manage Your <br />{" "}
            <span className="flex justify-center items-center">Results</span>{" "}
            <span className="flex justify-center items-center">
              With Expiense
            </span>
          </h1>

          {/* Desktop and Tablet */}
          <div className="flex flex-col justify-center items-center mt-10 text-white font-Azeret md:text-xl font-bold">
            <p className="hidden md:flex flex-col justify-center items-center">
              Effortlessly track and analyze both your personal achievements and
              financial income,
            </p>
            <p className="flex flex-col justify-center items-center md:hidden">
              Effortlessly track and analyze <span>both your personal</span>{" "}
              <span>achievements and financial income,</span>
            </p>
            <p className="flex flex-col justify-center items-center">
              take control of your goals, <span>whether its monitoring,</span>
            </p>
            <p className="flex flex-col justify-center items-center">
              {" "}
              productivity or managing your finances.
            </p>
          </div>
          {token && (
            <button
              className="mt-10 text-md bg-white px-5 py-2 rounded-md text-black font-bold font-Poppins hover:cursor-pointer hover:bg-gray-50"
              onClick={() => (window.location.href = "/dashboard/overview")}
            >
              Explore Now
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  if (token) {
    return {
      props: {
        token,
      },
    };
  } else {
    return {
      props: {
        token: null,
      },
    };
  }
};
