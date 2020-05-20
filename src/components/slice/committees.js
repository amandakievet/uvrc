import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import moment from "moment";

import RichText from "../richtext";

import linkStyles from "../../css/link.module.css";

const StyledListItem = ({ children }) => <li className="pb-1">{children}</li>;

const StyledSubTitle = ({ children }) => (
  <h3 className="mb-2 text-3xl">{children}</h3>
);

const CommitteesSlice = () => {
  const data = useStaticQuery(graphql`
    {
      prismicPeople {
        data {
          president_name
          president_email {
            url
          }
          vice_president
          vice_president_email {
            url
          }
          treasurer_email {
            url
          }
          treasurer_name
          secretary_name
          secretary_email {
            url
          }
          board {
            member_name
          }
        }
      }
      allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Meetings" } } } }
        limit: 3
      ) {
        edges {
          node {
            author
            title
            slug
            date
            content
          }
        }
      }
    }
  `);
  const {
    board,
    president_name,
    president_email,
    vice_president,
    vice_president_email,
    treasurer_name,
    treasurer_email,
    secretary_name,
    secretary_email
  } = data.prismicPeople.data;
  return (
    <div className="max-w-4xl mx-auto my-10 flex px-4 flex-col md:flex-row">
      <div className="flex-1 mb-6">
        <StyledSubTitle>Officers</StyledSubTitle>
        <ul className="mb-8">
          <StyledListItem>
            President:{" "}
            <a
              href={president_email.url}
              className="underline hover:no-underline"
            >
              {president_name}
            </a>
          </StyledListItem>
          <StyledListItem>
            Vice President:{" "}
            <a
              href={vice_president_email.url}
              className="underline hover:no-underline"
            >
              {vice_president}
            </a>
          </StyledListItem>
          <StyledListItem>
            Treasurer:{" "}
            <a
              href={treasurer_email.url}
              className="underline hover:no-underline"
            >
              {treasurer_name}
            </a>
          </StyledListItem>
          <StyledListItem>
            Secretary:{" "}
            <a
              href={secretary_email.url}
              className="underline hover:no-underline"
            >
              {secretary_name}
            </a>
          </StyledListItem>
        </ul>
        <StyledSubTitle>Board</StyledSubTitle>
        <ul>
          {board.map(({ member_name }) => (
            <StyledListItem key={member_name}>{member_name}</StyledListItem>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <StyledSubTitle>Recent Meeting Notes</StyledSubTitle>
        {data.allWordpressPost.edges.map(({ node }, index) => (
          <Link to={`/${node.slug}`} key={index} className="block mb-4">
            <p className="text-gray-500 ml-auto">
              {moment(node.date).format("MMMM Do YYYY")}
            </p>
            <h4 className="text-xl pb-3 leading-tight">
              {node.title.replace("&#8211;", "—")}
            </h4>
            <RichText
              html={node.content
                .replace(/(<([^>]+)>)/gi, "")
                .slice(0, 300)
                .concat("...")}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommitteesSlice;
