import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth(); 
    const dropdownRef = useRef(null); 

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <Link to={"/"} className="text-white text-lg font-semibold cursor-pointer">Home</Link>

            <div className='flex items-center gap-10'>
            <Link to={"/leaderboard"} className='text-white cursor-pointer'>
                Leaderboard
            </Link>
            <div className="relative" ref={dropdownRef}>
                <img
                    src={ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAZlBMVEX///8AAAAfHB+3t7dKSUoRDREYFRjc3NxAQEAcGRz8/PwbFxvo6OgVERUFAAX29vaFhYWWlZbCwsJqaWpZWFnW1tZwb3Di4uJfX18pJymOjY43NTeenZ6tra0KAQrMzMx9fX0vLi/U61bDAAAFEElEQVR4nO2ba3OjOgyGI4OdmIAdCNdwCfz/P7kSzXZ3zjaNDZh05vj50mlrwotkZFlWDgePx+PxeDwej8fj8fwg4iLryjwM87LLivjdamayMeQAwBH6EY7ZuxVVKcAgJPtEigEgrd6pKZ3gjErOXMGM4vOvMKVvk5QxkiQVNPWY9kHQp2PdgJIki73JialK6PZQZ5X+/TddZTWQ1ES9w1i6BjQJNLd/Xrf41uC/JNT6q+tcEoXAmIDyyyldlSBQcBjtq0mTJt4Ez/4fNJxU7WurK2oa2uPzAcd2QFXX/RQdDh1p+t4OOiRV3V6KDod7IhlvXywoccuZTO77KEImzkTzje8+ODaC8WkPPQQ5D57O8T8EsJ8D41YwqE1G1sDEKy9vBBpKMqMlt2LnvUzFBVMXs6EXxQR3q+aDAg0FhrlJhesNFG71zODT89B0cMiNrboGnSdGr94H+AImufvF5thIyV/GqM/RXMrXEW01d6tnn+3qPqr3wHhpPrzkDHp3ah7cgKmbxXDFwGL4QkpgYJHppjjcwrALuSqrII3hX7nPqn6kqNHefaMrLZ/QRLeI0ZddJnpAIcF4mxJRSDCO/4uh4Bka50hxuEvwrKazBPNlBuR5cl/u0HViEaMx/id77JRxpiet6eA22WOek0eYceJW0Fj3SQIyJWwwXDnKgSX7bLJ6yoeNTFVQNuw+RyB0KAwTYkyGxV5FDtNNpummdRtChQ58WT/M0HnKeIuxmgI3maJ5Ma2KRuCwPfZXD8iBfPr2hsXE93QecZkLed94MJtLeTts+f4iKueS59PEKp2LnubZxDbMqiSc7l/cN7qf5srx3prwzjcql3O4/pOY3K/AqcB+213TgSrACo3FoUnv8SNC6vieNsDRTOp55dgtxxwSRlML2nq83G6XsW6BJhNLIN9lGf6SLCRPoS7OB6UGzkkR+jR86/GaRlnA/5ytScEBJe1+APJf4u56epysAajTtfsZZ6N0Xtunt1va/5TTWo/H838nirSOjwbEWke7pApVlpYtGNOWaea2wBHpLp8GUMlffSTfIxMFw5R32pnBshIX3zMKkuezMOL8MRoX6dJJ3hDdQz6QhYQC3rQnI9qGg6J0Rg48/CpzXsexpIRSYkI3jV12jI2SE02dVZdmTvwwRS23TfyijivK3tTpUlnnSrq6nOZcUPFuQ2PFOe1OONTBwuxNBzXJklBvltpk00AfmK8qqGbzg6lpo6psQNsDDmtNH3VkrIRvssvpaX+nzKvUz4lDRXufDapoAWqSMG6yFdAjuvC8vuoRzP1Zm5UIe1KlVqqqZIKaNux36FCVYKvmgj5RQWfTUmpPRaTTmtlAZaiti0zzZ64o+N+pd+u68ZIVXanba3G40jnHWbn59jJWZ8YXd1DMVXwHKUe2puaPSQff2nlEdOWLm4U6i/YfO+ZmoUVxZu4IcdRSUC7ty8nQUMpRzl8pNNWS2TpanWDbMZ93jwsuJL87K6YGNF/tL7vTZc7KhJoe2T6A3tB7uQM5DzAu2681FEtcHmpSG5Z1DIxPwmnfYQFMnGxXsEJIp82scYs3sH1ou9Y7exY169n12dizqDOHJuLoQs1vxgUvEq7Gg9Nzzctgvyane4iy/WrNj7RU71rUkjmV2TW+2kNvn23ygnFKhIE7+lDYx6kikSwxLwLbI5h9RKdvVzhmwTJWzl+4dMmCDUBcho65+lNUj8fj8Xg8Ho/H43HPL9rLQsS8rx1BAAAAAElFTkSuQmCC"}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                />

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                        <button
                            className="w-full text-left text-red-500 hover:bg-gray-100 p-2 rounded"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            </div>
        
        </nav>
    );
};

export default Navbar;