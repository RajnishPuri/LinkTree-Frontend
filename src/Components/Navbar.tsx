import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentPage } from '../store/slices/currentPageSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const currentPage = useSelector((state: RootState) => state.currentPage.currentPage);
    const bio = user?.bio?.split(' ').slice(0, 6).join(' ');

    function footerLinkHandler() {
        window.open('https://github.com/RajnishPuri', '_blank');
    }

    function pageHandler(page: string) {
        dispatch(setCurrentPage(page));
    }

    return (
        <div className="w-full h-full flex flex-col justify-between p-4">
            <div>
                <div className="flex flex-col">
                    <div className="flex items-start flex-col">
                        <h1 className="text-2xl font-semibold text-green-900">
                            {`Welcome, ${user?.user?.name}`}
                        </h1>
                        <h3 className="text-lg text-green-900">
                            {`@${user?.user?.userName}`}
                        </h3>
                    </div>
                    <div className="flex items-start flex-col mt-2">
                        <h3 className="text-lg font-light">
                            {bio ? `${bio}...` : 'No bio available...'}
                        </h3>
                    </div>
                </div>

                <hr className="w-full my-4 border-t border-gray-300" />

                <div className="flex items-start flex-col">
                    <ul className="flex flex-col gap-2">
                        {['home', 'profile', 'logout'].map((page) => (
                            <li
                                key={page}
                                className={`text-lg font-normal  hover:cursor-pointer ${currentPage === page ? 'text-blue-500 font-semibold' : 'text-green-950'
                                    }`}
                                onClick={() => pageHandler(page)}
                            >
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4 flex justify-center items-center flex-col">
                <h2 className="text-center text-green-900">LinkTree</h2>
                <h3
                    className="text-blue-300 hover:cursor-pointer"
                    onClick={footerLinkHandler}
                >
                    Developer@LeGiTCoDeR
                </h3>
            </div>
        </div>
    );
};

export default Navbar;
