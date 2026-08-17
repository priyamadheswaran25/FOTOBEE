import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : "text-left"}`}>
      {subtitle && (
        <span className="font-handwritten text-lg md:text-xl text-terracotta tracking-wider block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal tracking-wide font-normal leading-tight">
        {title}
      </h2>
      <div
        className={`w-16 h-[1px] bg-mud/30 mt-6 ${
          centered ? "mx-auto" : "mr-auto"
        }`}
      />
    </div>
  );
};
