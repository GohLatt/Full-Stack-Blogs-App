import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function CustomMenu() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <GiHamburgerMenu />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <NavLink to={"/login"}>Login</NavLink>
          </MenubarItem>
          <MenubarItem>
            <NavLink to={"/register"}>Register</NavLink>
          </MenubarItem>
          <MenubarItem>
            <NavLink to={"/create"}>Post Create</NavLink>
          </MenubarItem>
          <MenubarItem>
            <NavLink to={"/profile"}>Profile</NavLink>
          </MenubarItem>
          <MenubarItem onClick={logOut}>
            <p className="text-red-600">Logout</p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default CustomMenu;

{
  /* <li>
<Button>
  <NavLink to={"/login"}>Login</NavLink>
</Button>
</li>
<li>
<Button variant={"secondary"}>
  <NavLink to={"/register"}>Register</NavLink>
</Button>
</li>
</>
) : (
<>
<li className="close">
<Button>
  <NavLink to={"/create"}>Post Create</NavLink>
</Button>
</li>
<li className="close">
<Button variant={"secondary"}>
  <NavLink to={"/profile"}>Profile</NavLink>
</Button>
</li>
<li className="close">
<Button onClick={logOut} variant={"destructive"}>
  Log Out
</Button>
</li>
</> */
}
