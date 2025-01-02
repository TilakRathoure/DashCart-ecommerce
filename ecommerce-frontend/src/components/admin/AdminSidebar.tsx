import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaChartBar, FaRegCreditCard, FaUsers, FaStopwatch, FaTicketAlt } from 'react-icons/fa';
import { HiMenu} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle sidebar visibility

    interface Topic {
        topic: string;
        items: { 
            title: string;
            icon: IconType;
        }[];
    }
      
    const topics: Topic[] = [
        {
            topic: "Dashboard",
            items: [
                { title: "Dashboard", icon: FaChartBar },
                { title: "Products", icon: FaRegCreditCard },
                { title: "Customers", icon: FaUsers },
                { title: "Transactions", icon: FaTicketAlt }
            ]
        },
        {
            topic: "Charts",
            items: [
                { title: "Bar", icon: FaChartBar },
                { title: "Pie", icon: FaChartBar },
                { title: "Line", icon: FaChartBar }
            ]
        },
        {
            topic: "Apps",
            items: [
                { title: "Stopwatch", icon: FaStopwatch },
                { title: "Coupon", icon: FaTicketAlt }
            ]
        }
    ];

    return (
        <>

            <div className=' z-30 fixed top-5 left-4 cursor-pointer shadow-2xl shadow-black md:hidden'>
                <HiMenu
                    className='text-4xl text-white'
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>

            {/* Sidebar */}
            <aside className={`md:w-1/4 h-screen z-40 p-4 pl-6 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-10 border-r-2 border-r-gray-700 fixed top-0 transition-all duration-300 ${menuOpen ? 'left-0' : 'left-[-300px]'} md:static`}>

                <h1 className='text-2xl mb-2 font-bold relative'><div className='md:hidden text-lg border-white border-2 px-2 top-[-7px] cursor-pointer absolute right-[2px]' onClick={()=> setMenuOpen(false)}>X</div>ShopHere.</h1>

                <div className='p-3'>
                    {topics.map((e, index) => (
                        <div key={index} className='flex flex-col gap-3 mb-4'>
                            <h2 className='text-base'>{e.topic}</h2>
                            <ul className='flex flex-col'>
                                {e.items.map((elements, i) => {
                                    const isActive = location.pathname.includes(`/admin/${elements.title.toLowerCase()}`);
                                    return (
                                        <Link key={i} to={`/admin/${elements.title.toLowerCase()}`}>
                                            <li className={`cursor-pointer h-[45px] flex items-center gap-3 ml-4 px-2 py-1 rounded-lg w-[85%] ${isActive ? 'bg-blue-100 text-blue-700' : ''}`}>
                                                {React.createElement(elements.icon)} {elements.title}
                                            </li>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;
