import { IoGameController } from "react-icons/io5";
// import "./SignUpCard.module.css";

export default function SignUpCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Login/Register Container */}
      <div className="h-[100dvh] flex justify-center w-full">
        <div className="py-8 px-12 h-full w-full overflow-y-auto bg-color1 sm:border shadow-2xl border-white/10 sm:h-fit sm:mt-40 sm:pb-20 sm:pt-8 sm:w-96 sm:rounded-xl">
          <div className="w-full flex justify-center item">
            <div className="py-8 flex items-center gap-3">
              <IoGameController className="text-4xl" />
              <h3>GameSwipe</h3>
            </div>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
      {/* Background Image */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] bg-blue-200 z-[-1] hidden sm:block">
        <div className="w-full h-full bg-black  opacity-50 absolute top-0 left-0"></div>
        <img
          className="object-cover w-full h-full "
          src="https://images.unsplash.com/photo-1635187834534-d1fa994fcabb?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </>
  );
}
