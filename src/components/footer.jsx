import { Link } from "react-router-dom";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiArrowRight,
} from "react-icons/hi";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/animations";

const footerLinks = {
  Company: [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/items" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ],
  Account: [
    { label: "Sign In", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "My Orders", to: "/orders" },
    { label: "Cart", to: "/cart" },
  ],
};

const social = [
  { icon: <FaFacebook className="w-4 h-4" />, href: "#", label: "Facebook" },
  { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
  { icon: <FaWhatsapp className="w-4 h-4" />, href: "#", label: "WhatsApp" },
  { icon: <FaYoutube className="w-4 h-4" />, href: "#", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Top band */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-12 gap-10"
          >
            {/* Brand column */}
            <motion.div variants={fadeUp} className="md:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-cta flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4">
                    <rect x="0" y="8" width="4" height="12" rx="1" fill="white"/>
                    <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
                    <rect x="12" y="0" width="4" height="20" rx="1" fill="white"/>
                    <rect x="18" y="4" width="4" height="16" rx="1" fill="white"/>
                    <rect x="24" y="8" width="4" height="12" rx="1" fill="white"/>
                  </svg>
                </div>
                <span className="font-heading font-bold text-lg text-white tracking-tight">
                  Waudio
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Professional audio equipment &amp; stage lighting rentals for
                weddings, concerts, and corporate events across Sri Lanka.
              </p>

              {/* Contact quick links */}
              <div className="space-y-2.5 text-sm">
                <a
                  href="mailto:info@waudio.lk"
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <HiMail className="w-4 h-4 text-cta" />
                  info@waudio.lk
                </a>
                <a
                  href="tel:+94703427349"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <HiPhone className="w-4 h-4 text-cta" />
                  +94 70 342 7349
                </a>
                <div className="flex items-start gap-2.5">
                  <HiLocationMarker className="w-4 h-4 text-cta mt-0.5 shrink-0" />
                  <span>Koswatta, Rathmale Road,<br />Kekanadura, Matara, Sri Lanka</span>
                </div>
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <motion.div
                key={group}
                variants={fadeUp}
                className="md:col-span-2"
              >
                <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                  {group}
                </h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter / CTA column */}
            <motion.div variants={fadeUp} className="md:col-span-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                Get a Quote
              </h4>
              <p className="text-sm mb-5">
                Need equipment for your next event? Reach out and we'll put
                together a custom package for you.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cta text-white text-sm font-semibold rounded-lg hover:bg-cta-dark transition-colors"
              >
                Contact Us
                <HiArrowRight className="w-4 h-4" />
              </Link>

              {/* Social icons */}
              <div className="flex gap-2 mt-8">
                {social.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-cta flex items-center justify-center text-slate-400 hover:text-white transition-all duration-150"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>© {year} Waudio. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
