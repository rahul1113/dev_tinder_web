import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-last  text-base-content p-4 fixed bottom-0 ">
      <aside>
        <p>Copyright © {new Date().getFullYear()}</p>
      </aside>
    </footer>
  );
};

export default Footer;
