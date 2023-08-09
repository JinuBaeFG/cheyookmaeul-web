import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    feedUpload {
      id
      imagePath
    }
    likes
    commentCount
    isLiked
    feedCategoryList {
      id
      name
    }
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    photo {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const RECOMMENT_FRAGMENT = gql`
  fragment ReCommentFragment on ReComment {
    id
    comment {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      username
      avatar
    }
  }
`;

export const GROUPINFO_FRAGMENT = gql`
  fragment GroupInfoFragment on GroupInfo {
    id
    awardDate
    discription
  }
`;

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    name
    sidoName
    gusiName
    dongEubMyunName
    riName
    roadName
    buildingNumber
    zipcode
    activeArea
    address
    addrRoad
    zipcode
    areaLatitude
    areaLongitude
    sportsEvent
    groupImage {
      id
      imagePath
    }
    discription
    users {
      id
      username
      avatar
    }
    groupInfo {
      id
      discription
      awardDate
    }
    facility {
      id
      address
      discription
      name
      facilityTag {
        id
        name
      }
      facilitySports {
        id
        name
      }
    }
    groupTag {
      id
      name
    }
    userCount
    maxMember
    createdAt
    isJoin
    isJoining
    groupJoinRequest {
      id
      user {
        id
        username
        avatar
      }
    }
    isPresident
    groupPresident {
      id
      user {
        id
        username
        avatar
      }
    }
  }
`;

export const TUTOR_FRAGMENT = gql`
  fragment TutorFragment on Tutor {
    id
    user {
      id
      username
    }
    name
    discription
    sidoName
    gusiName
    dongEubMyunName
    riName
    roadName
    buildingNumber
    zipcode
    activeArea
    address
    addrRoad
    addAddr
    areaLatitude
    areaLongitude
    tutorImage {
      id
      imagePath
    }
    group {
      id
      name
      sportsEvent
      discription
      maxMember
      groupTag {
        id
        name
        imagePath
      }
    }
    facility {
      id
      name
    }
    tutorInfo {
      id
      discription
      awardDate
    }
    tutorTag {
      id
      name
      imagePath
    }
    tutorInquiry {
      id
      user {
        id
      }
      tutor {
        id
      }
      inquiryTitle
      inquiryDiscription
    }
    tutorSportsEvent {
      id
      name
    }
    isTutor
  }
`;

export const TUTOR_INQUIRY_FRAGMENT = gql`
  fragment TutorInquiryFragment on TutorInquiry {
    id
    user {
      id
    }
    tutor {
      id
    }
    tutorInquiryComment {
      id
      responseTitle
      responseDiscription
      answerOk
      createdAt
    }
    inquiryTitle
    inquiryDiscription
    inquiryResponse
    createdAt
  }
`;

export const BOARD_FRAGMENT = gql`
  fragment BoardFragment on Board {
    id
    user {
      id
      username
      avatar
    }
    group {
      id
    }
    tutor {
      id
    }
    title
    discription
    sortation
    hits
    createdAt
    likes
    boardCommentCount
    isLiked
  }
`;

export const BOARD_COMMENT_FRAGMENT = gql`
  fragment BoardCommentFragment on BoardComment {
    id
    board {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    boardReCommentCount
    createdAt
  }
`;

export const BOARD_RECOMMENT_FRAGMENT = gql`
  fragment BoardReCommentFragment on BoardReComment {
    id
    boardComment {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const NOTICE_FRAGMENT = gql`
  fragment NoticeFragment on Notice {
    id
    user {
      id
      username
      avatar
    }
    group {
      id
    }
    tutor {
      id
    }
    title
    discription
    sortation
    hits
    createdAt
    likes
    noticeCommentCount
    isLiked
  }
`;

export const NOTICE_COMMENT_FRAGMENT = gql`
  fragment NoticeCommentFragment on NoticeComment {
    id
    notice {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    noticeReCommentCount
    createdAt
  }
`;

export const NOTICE_RECOMMENT_FRAGMENT = gql`
  fragment NoticeReCommentFragment on NoticeReComment {
    id
    noticeComment {
      id
    }
    user {
      id
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
