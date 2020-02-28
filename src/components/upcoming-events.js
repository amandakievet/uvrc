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

const UpcomingEvents = () => {
  const data = useStaticQuery(query);
  return (
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
            <p className="chunkyLabel">
              {moment(node.time).format("MMMM Do YYYY, h:mm a")}
            </p>
            <h2 className="text-2xl leading-tight mb-4">{node.name}</h2>
            <p className="mb-6">
              {node.description.replace(/(<([^>]+)>)/gi, "").substring(0, 160)}
              ...
            </p>
          </div>
          <a href={node.link} target="_blank" className="btn-link mx-auto">
            RSVP + More Info
          </a>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
