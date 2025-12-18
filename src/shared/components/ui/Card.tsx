
import { ReactNode } from "react";

const GlassmorphicCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`glass-surface p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

export default GlassmorphicCard;
