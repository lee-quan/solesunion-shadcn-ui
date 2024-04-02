import Link from "next/link";
import { FacebookIcon, InstagramIcon, TiktokIcon, WhiteLogo } from "./icons";

export function Footer() {
    return (
        <footer className="bg-[rgba(30,30,30,1)] text-white py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AboutSection />
                <NavigationSection />
                <SocialMediaSection />
                <ContactSection />
            </div>
            <CopyrightSection />
        </footer>
    );
}

function AboutSection() {
    return (
        <div>
            <h3 className="font-bold mb-2">Soles Union</h3>
            <p className="text-sm">
                Soles Union is the first-ever peer-to-peer (P2P) marketplace for
                100% authentic, limited edition sneakers, apparel and
                collectibles.
            </p>
        </div>
    );
}

function NavigationSection() {
    return (
        <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2">Navigate</h3>
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Shop
            </Link>
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Sell
            </Link>
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
                About
            </Link>
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Contact
            </Link>
        </div>
    );
}

function SocialMediaSection() {
    return (
        <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
                <Link className="text-gray-400 hover:text-white" href="#">
                    <InstagramIcon className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                </Link>
                <Link className="text-gray-400 hover:text-white" href="#">
                    <TiktokIcon className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link className="text-gray-400 hover:text-white" href="#">
                    <FacebookIcon className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                </Link>
            </div>
        </div>
    );
}

function ContactSection() {
    return (
        <div className="flex flex-col items-center md:items-start">
            <Link className="mb-4" href="#">
                <WhiteLogo className="h-8 w-8" />
                <span className="sr-only">Soles Union</span>
            </Link>
            <p className="text-sm text-gray-400">Mano Plus (Mezzanine Floor)</p>
            <p className="text-sm text-gray-400">GMBB,</p>
            <p className="text-sm text-gray-400">No 2, Jalan Robertson,</p>
            <p className="text-sm text-gray-400">Bukit Bintang,</p>
            <p className="text-sm text-gray-400">50150 Kuala Lumpur,</p>
            <p className="text-sm text-gray-400">
                Wilayah Persekutuan Kuala Lumpur.
            </p>
            <p className="text-sm text-gray-400">
                Phone:{" "}
                <Link
                    className="text-sm text-gray-400 hover:text-white"
                    href="https://wa.me/+60109136780?text=I%20would%20like%20to%20know%20more%20about%20Solesunion."
                >
                    (+60)10 9136780
                </Link>
            </p>
        </div>
    );
}

function CopyrightSection() {
    return (
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© 2024 Soles Union. All rights reserved.</p>
        </div>
    );
}
