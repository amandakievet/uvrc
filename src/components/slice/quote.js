import React from "react";
import RichText from "../richtext";

const quoteClasses = "text-6xl text-gray-400 font-display px-4";

const Quote = ({ quote, author1 }) => (
  <div className="mx-auto max-w-5xl">
    <div className="max-w-5xl my-8 px-4 flex">
      <div className={quoteClasses}>“</div>
      <div>
        <RichText
          html={quote.html}
          className="text-bold text-lg md:text-2xl font-display text-brand"
        />
        {!!author1 && <p className="italic">— {author1}</p>}
      </div>
      <div className={`${quoteClasses} self-end`}>”</div>
    </div>
  </div>
);

export default Quote;
