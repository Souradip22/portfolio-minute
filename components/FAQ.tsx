"use client";
import React from "react";
import { LinkWrapper } from "./LinkWrapper";
import { MoveRight } from "lucide-react";

const FAQ = () => {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-neutral-50">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-base leading-7 text-neutral-400">
          Questions?{" "}
          <LinkWrapper
            href="https://github.com/Souradip22/portfolio-minute/issues/new?title=Issue Portfolio Minute"
            className="font-semibold text-green-600 hover:text-green-500 flex items-center gap-2"
          >
            Open an issue here <MoveRight size={18} />
          </LinkWrapper>{" "}
        </p>
      </div>
      <div className="mt-10 lg:col-span-7 lg:mt-0">
        <dl className="space-y-10">
          {faqItems.map((item, index) => (
            <div key={index}>
              <dt className="text-base font-semibold leading-7 text-neutral-50">
                {item.question}
              </dt>
              <dd className="mt-2 text-base leading-7 text-neutral-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "What is a Portfolio?",
    answer:
      "A portfolio typically refers to a collection or compilation of work, projects, or achievements that showcase someone's skills, abilities, experience, and accomplishments in a particular field. Portfolios are commonly used by professionals, artists, designers, photographers, writers, and others to demonstrate their expertise and track record.",
  },
  {
    question: "How do I use the Portfolio Minute?",
    answer:
      'Using our Portfolio Minute is easy! Simply navigate to the homepage, sign in with your Google account, select username, enter your details, skills and projects, and hit "Create Profile." You can then access your profile using the generated link.',
  },
  {
    question: "Is the Portfolio Minute free to use?",
    answer: `Yes, absolutely! Portfolio Minute is completely free to use, with no hidden charges or limitations. However you can support by giving it a github star`,
  },
];

export default FAQ;
