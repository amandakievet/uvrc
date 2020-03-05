import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import RichText from "./richtext";
import Profile from "./profile";

const Answer = ({ answer, coach }) => {
  const data = useStaticQuery(graphql`
    {
      prismicPeople {
        data {
          coaches {
            name
            description {
              html
            }
            profile_picture {
              url
            }
          }
        }
      }
    }
  `);
  const { coaches } = data.prismicPeople.data;
  const currentCoach = coaches.filter(c => c.name === coach)[0];
  return (
    <div className="my-8">
      <h4 className="text-xl mb-3">{coach}</h4>
      <RichText html={answer.html} />
      <Profile {...currentCoach} />
    </div>
  );
};

const AskTheCoaches = ({ items, primary }) => {
  return (
    <div className="max-w-3xl">
      <p className="font-bold">{primary.question}</p>
      {primary.question_asker && (
        <p className="font-bold">— {primary.question_asker}</p>
      )}
      {items.map((item, index) => (
        <Answer key={index} {...item} />
      ))}
    </div>
  );
};

export default AskTheCoaches;
