import React from "react";

const GlassmorphicSection: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className = "" }) => (
  <section className={`glass-surface relative rounded-2xl p-8 shadow-xl ${className}`}>
    {children}
  </section>
);

export default GlassmorphicSection;
