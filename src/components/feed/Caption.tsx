import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../../components/shared";

interface ICaptionProps {
  author: string | undefined;
  payload: string | undefined;
}

const CaptionContainer = styled.div`
  margin-bottom: 8px;
`;

const CaptionComment = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Caption = ({ author, payload }: ICaptionProps) => {
  return (
    <CaptionContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CaptionComment>
        {payload?.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CaptionComment>
    </CaptionContainer>
  );
};

export default Caption;
