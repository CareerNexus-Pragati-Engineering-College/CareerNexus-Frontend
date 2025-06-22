// import React from "react";
// import { motion } from "framer-motion";
// import { Link as ScrollLink } from "react-scroll";

// const Footer = () => {
//   const scrollLinks = [
//     { to: "home", label: "Home" },
//     { to: "features", label: "Features" },
//     { to: "about", label: "About" },
//     { to: "contact", label: "Contact" },
//   ];

//   return (
//     <motion.footer
//       className="bg-gradient-to-r from-[#130c22] via-[#1b1435] to-[#0f0c1d] border-t border-violet-500/20 text-[#EADFFD]"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <div className="w-full px-6 sm:px-10 md:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
//         {/* Logo & Branding */}
//         <div className="flex items-center gap-3">
//           <img
//             src="/images/logo.png"
//             alt="CareerNexus Logo"
//             className="h-8 w-8 drop-shadow-[0_0_8px_rgba(165,100,255,0.6)]"
//           />
//           <span className="text-xl font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(165,100,255,0.5)]">
//             CareerNexus
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium tracking-wide text-[#EADFFD]/80">
//           {scrollLinks.map((link) => (
//             <ScrollLink
//               key={link.to}
//               to={link.to}
//               smooth={true}
//               duration={500}
//               offset={-70}
//               className="cursor-pointer hover:text-white hover:underline underline-offset-4 transition-colors"
//             >
//               {link.label}
//             </ScrollLink>
//           ))}
//         </nav>

//         {/* Rights */}
//         <p className="text-xs text-[#EADFFD]/60 text-center md:text-right w-full md:w-auto">
//           © {new Date().getFullYear()} CareerNexus. All rights reserved.
//         </p>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;
