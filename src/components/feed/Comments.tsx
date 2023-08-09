import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Caption from "./Caption";
import Comment from "./Comment";

interface ICommentsProps {
  photoId: number;
  author: string | undefined;
  caption: string | undefined;
  commentCount: number;
  comments: seeFeed_seeFeed_comments[] | undefined;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: String!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const Comments = ({
  photoId,
  author,
  caption,
  commentCount,
  comments,
}: ICommentsProps) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } =
    useForm<createCommentVariables>();
  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };

      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fileds: {
          comments(prev: seeFeed_seeFeed_comments[]) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate,
  });

  const onValid: SubmitHandler<createCommentVariables> = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsContainer>
      <Caption author={author} payload={caption} />
      <CommentCount>
        {commentCount === 1 ? "1 comment" : `${commentCount} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            name="payload"
            type="text"
            placeholder="Write a comments..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
