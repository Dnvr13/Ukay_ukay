import React from "react";

const NavbarComp = ({ onToggle }) => {
    return (
        <nav className="relative flex items-center justify-between bg-zinc-100 py-2 lg:py-4 shadow-sm">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <button onClick={onToggle} className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='w-8 h-8' viewBox="0 0 24 24">
                        <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                    </svg>
                </button>
                <div className="flex space-x-2 my-1 lg:mb-0 lg:mt-0">
                    <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='w-8 h-8' viewBox="0 0 16 16">
                            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z" />
                        </svg>
                    </a>
                    <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" >
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className='w-8 h-8'  viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComp;