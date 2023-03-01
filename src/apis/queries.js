import gql from 'graphql-tag';
import { 
  publicationStatsFragment, 
  profileFieldsFragment, 
  postFieldsFragment, 
  mediaFieldsFragment,
  metadataOutputFragment,
  referenceModuleFragment,
  commentBaseFieldsFragment,
  erc20Fragment,
  followModuleFragment,
  collectModuleFragment,
  commentFieldsFragment,
  mirrorBaseFieldsFragment,
  mirrorFieldsFragment,
  commentMirrorOfFieldsFragment
  } 
from './fragments.js';

const QUERY_PROFILE_BY_ID = gql`
  query Profile($profileRequest: SingleProfileQueryRequest!) {
    profile(request: $profileRequest) {
      id
      name
      metadata
      handle
      bio
      ownedBy
      isFollowedByMe
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      attributes {
        displayType
        traitType
        key
        value
      }
    }
  }
`

const GET_PROFILE_BY_ID = gql`
  query Profile($profileRequest: SingleProfileQueryRequest!) {
    profile(request: $profileRequest) {
      id
      name
      metadata
      handle
      bio
      ownedBy
      isFollowedByMe
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      attributes {
        displayType
        traitType
        key
        value
      }
    }
  }
`

const GET_PUBLICATIONS_QUERY = gql`
  query ExplorePublications($request: ExplorePublicationRequest!) {
    explorePublications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  ${publicationStatsFragment}
  ${profileFieldsFragment}
  ${postFieldsFragment}
  ${mediaFieldsFragment}
  ${metadataOutputFragment}
  ${followModuleFragment}
  ${collectModuleFragment}
  ${referenceModuleFragment}
  ${erc20Fragment}
`

const GET_SINGLE_POST = gql`
query Publication($id: InternalPublicationId!) {
  publication(request: {
    publicationId: $id
  }) {
   __typename 
    ... on Post {
      ...PostFields
    }
    ... on Comment {
      ...CommentFields
    }
    ... on Mirror {
      ...MirrorFields
    }
  }
}

${mediaFieldsFragment}
${profileFieldsFragment}
${postFieldsFragment}
${publicationStatsFragment}
${metadataOutputFragment}
${erc20Fragment}
${mirrorBaseFieldsFragment}
${mirrorFieldsFragment}
${commentBaseFieldsFragment}
${commentFieldsFragment}
${commentMirrorOfFieldsFragment}
${followModuleFragment}
${collectModuleFragment}
${referenceModuleFragment}
`

const GET_POST_COMMENTS = gql`
query Publications($publicationsRequest: PublicationsQueryRequest!) {
  publications(request: $publicationsRequest) {
      items {
      ... on Comment {
        ...CommentFields
      }
    }
    }
  }
${mediaFieldsFragment}
${commentMirrorOfFieldsFragment}
${erc20Fragment}
${mirrorBaseFieldsFragment}
${metadataOutputFragment}
${commentBaseFieldsFragment}
${publicationStatsFragment}
${commentFieldsFragment}
${mirrorBaseFieldsFragment}
${profileFieldsFragment}
${postFieldsFragment}
${followModuleFragment}
${referenceModuleFragment}
${collectModuleFragment}
`

const HAS_TX_HASH_BEEN_INDEXED = gql`
  query hasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) {
      __typename
      ... on TransactionIndexedResult {
        indexed
        txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
        metadataStatus {
          status
          reason
        }
      }
      ... on TransactionError {
        reason
        txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
      }
    }
  }
`

const GET_TAGS = gql`
  query Search($request: SearchQueryRequest!) {
    search(request: $request)
      {
      ... on PublicationSearchResult {
         __typename 
        items {
          ... on Post {
            ...PostFields
          }
          ... on Comment {
            ...CommentFields
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
  ${mediaFieldsFragment}
  ${mirrorBaseFieldsFragment}
  ${profileFieldsFragment}
  ${publicationStatsFragment}
  ${metadataOutputFragment}
  ${postFieldsFragment}
  ${erc20Fragment}
  ${commentBaseFieldsFragment}
  ${commentFieldsFragment}
  ${commentMirrorOfFieldsFragment}
  ${followModuleFragment}
  ${collectModuleFragment}
  ${referenceModuleFragment}
`
const GET_TRENDING_TAGS = gql`
  query Trending($request: AllPublicationsTagsRequest!) {
    allPublicationsTags(request: $request) {
      items {
        tag
        total
      }
    }
  }
`
const GET_NOTIFICATIONS_COUNT= gql`
  query NotificationCount($request: NotificationRequest!) {
    notifications(request: $request) {
      pageInfo {
        totalCount
      }
    }
  }
`

const GET_PROFILE_FEED = gql`
query Publications($publicationsRequest: PublicationsQueryRequest!) {
  publications(request: $publicationsRequest) {
      __typename 
      items {
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  ${mediaFieldsFragment}
  ${mirrorFieldsFragment}
  ${mirrorBaseFieldsFragment}
  ${profileFieldsFragment}
  ${publicationStatsFragment}
  ${metadataOutputFragment}
  ${postFieldsFragment}
  ${erc20Fragment}
  ${commentBaseFieldsFragment}
  ${commentFieldsFragment}
  ${commentMirrorOfFieldsFragment}
  ${followModuleFragment}
  ${collectModuleFragment}
  ${referenceModuleFragment}
`
const RecommendedProfiles = gql`
query RecommendedProfiles($options: RecommendedProfileOptions) {
  recommendedProfiles(options: $options) {
    ...ProfileFields
    isFollowedByMe
  }
}
${mediaFieldsFragment}
${profileFieldsFragment}
${followModuleFragment}
`
const GET_NOTIFICATIONS = gql`
  query Notifications($request: NotificationRequest!) {
    notifications(request: $request) {
      items {
        ... on NewFollowerNotification {
          notificationId
          wallet {
            address
            defaultProfile {
              ...ProfileFields
            }
          }
          createdAt
        }
        ... on NewMentionNotification {
          notificationId
          mentionPublication {
            ... on Post {
              id
              profile {
                ...ProfileFields
              }
              metadata {
                content
              }
            }
            ... on Comment {
              id
              profile {
                ...ProfileFields
              }
              metadata {
                content
              }
            }
          }
          createdAt
        }
        ... on NewReactionNotification {
          notificationId
          profile {
            ...ProfileFields
          }
          publication {
            ... on Post {
              id
              metadata {
                content
              }
            }
            ... on Comment {
              id
              metadata {
                content
              }
            }
            ... on Mirror {
              id
              metadata {
                content
              }
            }
          }
          createdAt
        }
        ... on NewCommentNotification {
          notificationId
          profile {
            ...ProfileFields
          }
          comment {
            id
            metadata {
              content
            }
            commentOn {
              ... on Post {
                id
              }
              ... on Comment {
                id
              }
              ... on Mirror {
                id
              }
            }
          }
          createdAt
        }
        ... on NewMirrorNotification {
          notificationId
          profile {
            ...ProfileFields
          }
          publication {
            ... on Post {
              id
              metadata {
                content
              }
            }
            ... on Comment {
              id
              metadata {
                content
              }
            }
          }
          createdAt
        }
        ... on NewCollectNotification {
          notificationId
          wallet {
            address
            defaultProfile {
              ...ProfileFields
            }
          }
          collectedPublication {
            ... on Post {
              id
              metadata {
                content
              }
              collectModule {
                ...CollectModuleFields
              }
            }
            ... on Comment {
              id
              metadata {
                content
              }
              collectModule {
                ...CollectModuleFields
              }
            }
          }
          createdAt
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  ${collectModuleFragment}
  ${profileFieldsFragment}
  ${erc20Fragment}
  ${followModuleFragment}
  ${mediaFieldsFragment}
`


export {
  QUERY_PROFILE_BY_ID,
  GET_PUBLICATIONS_QUERY,
  GET_SINGLE_POST,
  GET_POST_COMMENTS,
  HAS_TX_HASH_BEEN_INDEXED,
  GET_TAGS,
  GET_TRENDING_TAGS,
  GET_NOTIFICATIONS_COUNT,
  GET_PROFILE_BY_ID,
  GET_PROFILE_FEED,
  RecommendedProfiles,
  GET_NOTIFICATIONS
}