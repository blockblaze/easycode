import { Button, Navbar, TextInput } from "flowbite-react"
import { FaMoon , FaSun } from "react-icons/fa";
import { useSelector  , useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function Header() {
    const dispatch = useDispatch();
    const {theme} = useSelector((state)=>state.theme)

    return (
      <>
     
      <Navbar className="border-b-2">
        {/*Logo */}
        <div to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className='px-2 py-1 bg-gradient-to-r from-custom-dark-orange via-custom-orange to-yellow-500 rounded-lg text-white'>
          Easy
        </span>
        Code
        </div>

        <div className="flex gap-3 md:order-2">
            <Button className="w-10 h-8 sm:w-12 sm:h-10" color="gray" pill onClick={()=>dispatch(toggleTheme())}>
                {theme === "light"? <FaSun/>: <FaMoon/>}
            </Button>
        </div>



      </Navbar>
      </>
    )
  }
  
  export default Header
