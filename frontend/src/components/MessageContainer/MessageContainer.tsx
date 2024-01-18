import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface MessageContainerProps {
  type: "info" | "warning" | "error" | "success" | "important" | "pending" | "confirmed" | "cancelled" | "completed"; 
  importanceText?: string;
  message: string[];
  link?: string;
  linkText?: string;
  style?: React.CSSProperties;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ type, message, link, linkText, importanceText, style }) => {
  return (
    <div className="message__container" style={style}>
      <div className={`message__content ${type}`}>
        <div className={`alert-${type}`}>{importanceText}</div>
        {message.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {link && (
        <div className="message__link">
          <Link to={link}>{linkText || "← Повернутися"}</Link>
        </div>
      )}      
    </div>
  );
};

export default MessageContainer;

