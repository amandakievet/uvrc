import React, { lazy, useState, Suspense } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import moment from "moment";

import RichText from "../richtext";

import linkStyles from "../../css/link.module.css";
import btnStyles from "../../css/buttons.module.css";

const EmailLink = ({ url, name }) => (
  <a href={url} className="underline hover:no-underline">
    {name}
  </a>
);

const ProtectedEmail = props => {
  const [showingEmail, setShowingEmail] = useState(false);

  let email = showingEmail ? (
    <EmailLink {...props} />
  ) : (
    <button onClick={() => setShowingEmail(true)}>{props.name}</button>
  );

  return <Suspense fallback={<div>loading...</div>}>{email}</Suspense>;
};

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
      allPrismicMeeting(sort: { fields: data___date, order: DESC }, limit: 3) {
        edges {
          node {
            data {
              author
              content {
                text
              }
              date
              title {
                text
              }
            }
            uid
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
        <p className="italic text-sm">Click on name for contact link</p>
        <ul className="mb-8">
          <StyledListItem>
            President:{" "}
            <ProtectedEmail url={president_email.url} name={president_name} />
          </StyledListItem>
          <StyledListItem>
            Vice President:{" "}
            <ProtectedEmail
              url={vice_president_email.url}
              name={vice_president}
            />
          </StyledListItem>
          <StyledListItem>
            Treasurer:{" "}
            <ProtectedEmail url={treasurer_email.url} name={treasurer_name} />
          </StyledListItem>
          <StyledListItem>
            Secretary:{" "}
            <ProtectedEmail url={secretary_email.url} name={secretary_name} />
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
        {data.allPrismicMeeting.edges.map(({ node }, index) => {
          const { title, content, author, date } = node.data;
          return (
            <Link to={`/${node.uid}`} className="block" key={index}>
              <div className="border-t-2 pt-3 mb-10">
                <p className="text-gray-500 chunkyLabel">
                  {moment(date).format("MMMM Do YYYY")}
                </p>
                <h4 className="">{title.text}</h4>
                <p className="text-sm">
                  {content.text.slice(0, 100).concat("...")}
                </p>
              </div>
            </Link>
          );
        })}
        <Link to="/all-meetings/" className={btnStyles.link}>
          All Meeting Notes
        </Link>
      </div>
    </div>
  );
};

export default CommitteesSlice;
