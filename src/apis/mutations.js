import { gql } from '@apollo/client/core/index.js';
import { 
  relayerResultFieldsFragment
  } 
from './fragments.js';


const REFRESH_TOKEN_MUTATION = gql`
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`

const CREATE_POST_TYPED_DATA = gql`
  mutation createPostTypedData($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`

const CreatePostViaDispatcher = gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    createPostViaDispatcher(request: $request) {
      ...RelayerResultFields
    }
  }
  ${relayerResultFieldsFragment}
`

const Broadcast = gql`
  mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }
`

export { REFRESH_TOKEN_MUTATION, CREATE_POST_TYPED_DATA, CreatePostViaDispatcher, Broadcast };