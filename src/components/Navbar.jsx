import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center '>
      <div className='relative border-2 border-[#6c757d] rounded-full py-1 px-5 mt-2 '>
        <ul className="flex flex-wrap md:flex-nowrap w-fit p-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium px-4 py-2 transition-all duration-200 rounded ${
                isActive
                  ? 'text-blue-600 '
                  : 'text-gray-700 hover:text-blue-500'
              }`
            }
            activeClassName="border-b-2 " 
          >
            Home
          </NavLink> 
          
             {/* Vertical Line */}
             <div className="w-px h-25 bg-gray-400"></div>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `font-medium px-4 py-2 transition-all duration-200 rounded ${
                isActive
                  ? 'text-blue-600 '
                  : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
           My Docs
          </NavLink> 
        </ul>
      </div>
    </div>
  )
}

export default Navbar

