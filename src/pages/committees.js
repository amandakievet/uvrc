import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageTitle from "../components/page-title";

import linkStyles from "../css/link.module.css";

const StyledListItem = ({ children }) => <li className="pb-1">{children}</li>;

const StyledSubTitle = ({ children }) => (
  <h3 className="mb-2 text-3xl">{children}</h3>
);

const CommitteesPage = ({ data }) => {
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
    <Layout>
      <SEO
        keywords={[`uvrc`, `upper valley running club`, `running`]}
        title="Committees"
      />
      <div className="max-w-3xl w-full mx-auto">
        <PageTitle title="Committees" />
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
    </Layout>
  );
};

export default CommitteesPage;

export const query = graphql`
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
  }
`;
