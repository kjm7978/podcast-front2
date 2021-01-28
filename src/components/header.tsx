import React from "react";
import { useMe } from "../hooks/useMe";
//import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface IHeaderProps {
    email: string;
}

export const Header: React.FC = () => {
    const { data } = useMe();
    return (
        <header className="bg-grey-500 py-4">
            <div className="w-full px-5 xl:px-0 max-w-screen-xl bg-gray-300 mx-auto">
                <span className="text-xs">
                    <h2 className="text-2xl">{data?.me.email}</h2>
                    <Link to="/my-profile">
                       
                    </Link>
                </span>
            </div>
        </header>
    )
}