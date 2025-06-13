import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-8 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* logo name */}
        <div className="flex items-center space-x-2">
          <span className="text-xl text-sky-700 dark:text-sky-500 font-semibold">
            <i>CarWise</i>
          </span>
        </div>

        <div className="flex space-x-4 cursor-pointer">
          <a
            href="https://web.facebook.com/shoaib.5782"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </a>
          <a
            href="https://x.com/soyebislam_1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5 text-gray-600 hover:text-sky-500" />
          </a>
          <a
            href="https://www.instagram.com/code_shoaib/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-500" />
          </a>
          <a
            href="https://www.linkedin.com/in/md-soyeb-islam-285a00363/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-pink-500" />
          </a>
        </div>

        <p className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} CarWise. All rights reserved.
        </p>
      </div>

      <div className="mt-6">
        <Separator />
      </div>
    </footer>
  );
};

export default Footer;
