import React from "react";
import "./style.css";

interface HeadingBlockProps {
  title?: string;
  subtitle?: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ title, subtitle }) => (
  <div className="heading-block">
    {title && <h2>{title}</h2>}
    {subtitle && <h4>{subtitle}</h4>}
  </div>
);

export default HeadingBlock;
