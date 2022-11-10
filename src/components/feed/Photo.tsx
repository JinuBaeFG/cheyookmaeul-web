import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import { FatText } from "../../components/shared";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import { Link } from "react-router-dom";

interface IPhotoUser {
  username: string;
  avatar: string | undefined;
}

export interface IPhotoComments {
  id: number;
  user: IPhotoUser;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
  border-radius: 5px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: seeFeed_seeFeed) => {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: updateToggleLike,
    }
  );
  return (
    <div>
      <PhotoContainer key={id}>
        <PhotoHeader>
          <Link to={`/users/${user.username}`}>
            <Avatar lg url={user.avatar} />
          </Link>
          <Link to={`/users/${user.username}`}>
            <Username>{user.username}</Username>
          </Link>
        </PhotoHeader>
        {file !== "empty" ? <PhotoFile src={file} /> : null}
        <PhotoData>
          <PhotoActions>
            <div>
              <PhotoAction
                onClick={() => {
                  toggleLikeMutation();
                }}
              >
                <FontAwesomeIcon
                  style={{ color: isLiked ? "tomato" : "inherit" }}
                  icon={isLiked ? SolidHeart : faHeart}
                />
              </PhotoAction>
              <PhotoAction>
                <FontAwesomeIcon icon={faComment} />
              </PhotoAction>
              <PhotoAction>
                <FontAwesomeIcon icon={faPaperPlane} />
              </PhotoAction>
            </div>
            <div>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </PhotoActions>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
          <Comments
            photoId={id}
            author={user.username}
            caption={caption}
            commentNumber={commentNumber}
            comments={comments}
          />
        </PhotoData>
      </PhotoContainer>
    </div>
  );
};

export default Photo;
