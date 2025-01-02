import { FaSearch, FaSignOutAlt ,FaUser } from 'react-icons/fa'
import { FaCartShopping} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
import { useState } from 'react';

const user={_id:"sdlfsl", role:"admin"};

const Header = () => {

  const [isOpen,setIsOpen]=useState<boolean>(false);


  return (
    <div className='flex items-center justify-end'>

        <Link to="/" className='font-light' >Home</Link>
        <Link to="/search" >
        <FaSearch/></Link>
        <Link to="/cart" ><FaCartShopping/></Link>

        {
          user?._id ? (

            <>
            <button onClick={()=> setIsOpen((prev)=>!prev)}>
              <FaUser/>
            </button>
            <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>


            </>

          ):(

            <Link to={"/login"}>
            <FaSignInAlt/>
          </Link>
          )
        }


        </div>
  )
}

export default Header