import Image from "next/image";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-[50px] flex items-center bg-white border-b border-slate-300 fixed top-0 w-full z-50">
            <MobileSidebar />
            <div className="flex-grow flex justify-center">
                <a href="/">
                    <Image src="/logodazaga.png" height={40} width={40} alt="Logo" />
                </a>
            </div>
        </nav>
    );
};