import React from "react";


const date = new Date();

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex justify-around"></div>
      <div className="text-center mt-8">
        <p>CopyLeft - {date.getFullYear()} Patrol Analytics</p>
      </div>
    </footer>
  );
};

export default Footer;
