import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <div>
      <header className="bg-blue-500 shadow-md ">
        <Navbar />
      </header>
      <main className="max-w-[1300px] my-0 mx-auto">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default RootLayout;
