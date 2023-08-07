import React from "react";

function Footer() {
  return (
    <footer className="bg-night-900 text-night-100 bg-night-900 text-night-100 mx-2 border-t-2 border-purple-500 opacity-50">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6 lg:py-8 grid grid-cols-2 gap-8 md:grid-cols-4">
        {/* Company */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Brand Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Help center */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Help center</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Discord Server
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Download */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Download</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                iOS
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Android
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                Windows
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-night-200">
                MacOS
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 py-6 bg-night-800 md:flex md:items-center md:justify-between">
        <span>© 2023 Flowbite™. All Rights Reserved.</span>

        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="text-night-200 hover:text-night-300">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-night-200 hover:text-night-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-night-200 hover:text-night-300">
            <i className="fab fa-discord"></i>
          </a>
          <a href="#" className="text-night-200 hover:text-night-300">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
