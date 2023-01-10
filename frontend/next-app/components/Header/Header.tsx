import { FaUserCircle } from 'react-icons/fa';
import React from "react";
import Link from "next/link";
import { useMe } from "../../hooks/useMe";
import Image from 'next/image';

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link href="/">
            <Image src="/static/images/logo.svg" width={64} height={64} className="w-44" alt="Nuber Eats" />
          </Link>
          <span className="text-xs">
            <Link href="/user/edit-profile">
              <FaUserCircle className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};