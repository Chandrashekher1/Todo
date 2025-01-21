import React, { useState } from 'react';

const Menu = () => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const handleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    return (
        <div className='flex flex-col border shadow-md'>
            <div className='m-8 cursor-pointer' onClick={handleHamburger}>
                <div className='w-8 bg-gray-400 h-1 rounded-xl my-1'></div>
                <div className='w-8 bg-gray-400 h-1 rounded-xl my-1'></div>
                <div className='w-8 bg-gray-400 h-1 rounded-xl'></div>
            </div>
            {isHamburgerOpen && (
                <div>
                    <ul>
                        <li className='my-4 px-16 py-2 cursor-pointer font-semibold hover:bg-gray-200'>
                            My Day
                        </li>
                        <li className='my-4 py-2 px-16 cursor-pointer font-semibold hover:bg-gray-200'>
                            Important
                        </li>
                        <li className='my-4 py-2 px-16 cursor-pointer font-semibold hover:bg-gray-200'>
                            Planned
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;
