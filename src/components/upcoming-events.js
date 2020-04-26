import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import classnames from "classnames";
import moment from "moment";

import RichText from "./richtext";

const query = graphql`
  {
    allMeetupEvent(limit: 3) {
      edges {
        node {
          name
          description
          link
          time
        }
      }
    }
  }
`;

const UpcomingEvents = ({ title }) => {
  const data = useStaticQuery(query);
  return (
    <div className="max-w-6xl mx-auto my-8">
      {title && (
        <h4 className="chunkyLabel text-xl text-center pb-3">{title.text}</h4>
      )}
      <div className="flex flex-col lg:flex-row">
        {data.allMeetupEvent.edges.map(({ node }, index) => (
          <div
            key={index}
            className={classnames(
              "flex-1 bg-gray-200 p-8 my-2 flex flex-col justify-between",
              {
                "lg:ml-4": index !== 0
              }
            )}
          >
            <div>
              <p className="chunkyLabel pb-3">
                {moment(node.time).format("MMMM Do YYYY, h:mm a")}
              </p>
              <h2 className="text-2xl leading-tight mb-4">{node.name}</h2>
              <p className="mb-6">
                {node.description
                  .replace(/(<([^>]+)>)/gi, "")
                  .substring(0, 160)}
                ...
              </p>
            </div>
            <a href={node.link} target="_blank" className="btn-link mx-auto">
              RSVP + More Info
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
