"use strict";

/**
 * Important note, MetaMask requires:
 * - server running on https protocol (you can run https in root server.js)
 * - browser extension: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related?hl=en
 */

//const LENS_API = 'https://api.lens.dev'
const LENS_API = 'https://api-mumbai.lens.dev'



let abib = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "followNFTImpl",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "collectNFTImpl",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "CallerNotCollectNFT",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CallerNotFollowNFT",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CannotInitImplementation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmergencyAdminCannotUnpause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InitParamsInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Initialized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotGovernance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotGovernanceOrEmergencyAdmin",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotOwnerOrApproved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotProfileOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotProfileOwnerOrDispatcher",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Paused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ProfileCreatorNotWhitelisted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ProfileImageURILengthInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PublicationDoesNotExist",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PublishingPaused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SignatureExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SignatureInvalid",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.EIP712Signature",
        "name": "sig",
        "type": "tuple"
      }
    ],
    "name": "burnWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "collect",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "collector",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.CollectWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "collectWithSig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "profileIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "collectModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "collectModuleInitData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          }
        ],
        "internalType": "struct DataTypes.CommentData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "comment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "profileIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "collectModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "collectModuleInitData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.CommentWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "commentWithSig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "handle",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "followModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "followModuleInitData",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "followNFTURI",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.CreateProfileData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "createProfile",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "defaultProfile",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectNFTId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "emitCollectNFTTransferEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "followNFTId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "emitFollowNFTTransferEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "exists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "profileIds",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes[]",
        "name": "datas",
        "type": "bytes[]"
      }
    ],
    "name": "follow",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "follower",
            "type": "address"
          },
          {
            "internalType": "uint256[]",
            "name": "profileIds",
            "type": "uint256[]"
          },
          {
            "internalType": "bytes[]",
            "name": "datas",
            "type": "bytes[]"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.FollowWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "followWithSig",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getCollectModule",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getCollectNFT",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCollectNFTImpl",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getContentURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getDispatcher",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDomainSeparator",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getFollowModule",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getFollowNFT",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFollowNFTImpl",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getFollowNFTURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGovernance",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getHandle",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pubCount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "followModule",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "followNFT",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "handle",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "followNFTURI",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.ProfileStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "handle",
        "type": "string"
      }
    ],
    "name": "getProfileIdByHandle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getPub",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "collectModule",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "collectNFT",
            "type": "address"
          }
        ],
        "internalType": "struct DataTypes.PublicationStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "getPubCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getPubPointer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getPubType",
    "outputs": [
      {
        "internalType": "enum DataTypes.PubType",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pubId",
        "type": "uint256"
      }
    ],
    "name": "getReferenceModule",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getState",
    "outputs": [
      {
        "internalType": "enum DataTypes.ProtocolState",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "newGovernance",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collectModule",
        "type": "address"
      }
    ],
    "name": "isCollectModuleWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "followModule",
        "type": "address"
      }
    ],
    "name": "isFollowModuleWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "profileCreator",
        "type": "address"
      }
    ],
    "name": "isProfileCreatorWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "referenceModule",
        "type": "address"
      }
    ],
    "name": "isReferenceModuleWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "mintTimestampOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "profileIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          }
        ],
        "internalType": "struct DataTypes.MirrorData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "mirror",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "profileIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pubIdPointed",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.MirrorWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "mirrorWithSig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.EIP712Signature",
        "name": "sig",
        "type": "tuple"
      }
    ],
    "name": "permit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.EIP712Signature",
        "name": "sig",
        "type": "tuple"
      }
    ],
    "name": "permitForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "collectModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "collectModuleInitData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          }
        ],
        "internalType": "struct DataTypes.PostData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "post",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "collectModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "collectModuleInitData",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "referenceModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "referenceModuleInitData",
            "type": "bytes"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.PostWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "postWithSig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      }
    ],
    "name": "setDefaultProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "wallet",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.SetDefaultProfileWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "setDefaultProfileWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "dispatcher",
        "type": "address"
      }
    ],
    "name": "setDispatcher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "dispatcher",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.SetDispatcherWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "setDispatcherWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newEmergencyAdmin",
        "type": "address"
      }
    ],
    "name": "setEmergencyAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "followModule",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "followModuleInitData",
        "type": "bytes"
      }
    ],
    "name": "setFollowModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "followModule",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "followModuleInitData",
            "type": "bytes"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.SetFollowModuleWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "setFollowModuleWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "followNFTURI",
        "type": "string"
      }
    ],
    "name": "setFollowNFTURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "followNFTURI",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.SetFollowNFTURIWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "setFollowNFTURIWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newGovernance",
        "type": "address"
      }
    ],
    "name": "setGovernance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "profileId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "imageURI",
        "type": "string"
      }
    ],
    "name": "setProfileImageURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "profileId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "imageURI",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.EIP712Signature",
            "name": "sig",
            "type": "tuple"
          }
        ],
        "internalType": "struct DataTypes.SetProfileImageURIWithSigData",
        "name": "vars",
        "type": "tuple"
      }
    ],
    "name": "setProfileImageURIWithSig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum DataTypes.ProtocolState",
        "name": "newState",
        "type": "uint8"
      }
    ],
    "name": "setState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "sigNonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenDataOf",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint96",
            "name": "mintTimestamp",
            "type": "uint96"
          }
        ],
        "internalType": "struct IERC721Time.TokenData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collectModule",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "whitelist",
        "type": "bool"
      }
    ],
    "name": "whitelistCollectModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "followModule",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "whitelist",
        "type": "bool"
      }
    ],
    "name": "whitelistFollowModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "profileCreator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "whitelist",
        "type": "bool"
      }
    ],
    "name": "whitelistProfileCreator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "referenceModule",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "whitelist",
        "type": "bool"
      }
    ],
    "name": "whitelistReferenceModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];






window.onload = () => {
  setTimeout(() => {
    const Web3Modal = window?.Web3Modal?.default;
    const WalletConnectProvider = window?.WalletConnectProvider?.default;

    // Web3modal instance
    let web3Modal
    // Chosen wallet provider given by the dialog window
    let provider;
    // Address of the selected account
    let address = window.ethereum?.selectedAddress

    function init() {
      // Check that the web page is run in a secure context,
      // as otherwise MetaMask won't be available
      // https://ethereum.stackexchange.com/a/62217/620
      //if (location.protocol !== 'https:') {
      //  alert('Run https connection in order for MetaMask to work')
      //  return;
      //}

      // Tell Web3modal what providers we have available.
      // Built-in web browser provider (only one can exist as a time)
      // like MetaMask, Brave or Opera is added automatically by Web3modal
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
          }
        },
      };

      web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
      });
    }

    async function fetchAccountData() {
      const web3 = new Web3(provider);

      try {
        const [account] = await web3.eth.getAccounts();
        address = account;
      } catch (err) {
        alert(err?.message ?? err)
        return
      }
    }

    // connect wallet or get address if connected
    async function walletConnect() {
      try {
        if (window.ethereum?.selectedAddress) {
          address = window.ethereum.selectedAddress

          const cookies = parseCookies(document.cookie)

          if (!cookies['accessToken']) {
            triggerModalById('#lens-connect-modal')
          }
        } else {
          provider = await web3Modal.connect();

          provider.on("accountsChanged", () => {
            console.log('accountsChanged EVENT TRIGGERED');
            fetchAccountData();
          });

          provider.on("chainChanged", () => {
            console.log('chainChanged EVENT TRIGGERED');
            fetchAccountData();
          });

          address = window.ethereum.selectedAddress

          // call modal on UI for user
          triggerModalById('#lens-connect-modal')
        }
      } catch (err) {
        alert(`Could not get a wallet connection: ${err?.message ?? err}`);
        return;
      }
    }

    // disconnect wallet
    async function walletDisconnect() {
      console.log("Killing the wallet connection");

      const { currentProvider } = window.ethereum

      if (currentProvider) {
        // await currentProvider.close();
        await web3Modal.clearCachedProvider();
        provider = null;
      }

      address = null;
    }

    // graphql Profiles request to lens
    async function getProfiles() {
      const Profiles = JSON.stringify({
        query: `
        query Profiles($ownedBy: [EthereumAddress!]) {
          profiles(request: { ownedBy: $ownedBy, limit: 10 }) {
            items {
              id
              name
              bio
              attributes {
                displayType
                traitType
                key
                value
              }
              followNftAddress
              metadata
              isDefault
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
              handle
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
              ownedBy
              dispatcher {
                address
                canUseRelay
              }
              stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
              }
              followModule {
                ... on FeeFollowModuleSettings {
                  type
                  amount {
                    asset {
                      symbol
                      name
                      decimals
                      address
                    }
                    value
                  }
                  recipient
                }
                ... on ProfileFollowModuleSettings {
                 type
                }
                ... on RevertFollowModuleSettings {
                 type
                }
              }
            }
            pageInfo {
              prev
              next
              totalCount
            }
          }
        }
        `,
        variables: { ownedBy: [address] }
      })

      const profiles = await fetch(
        LENS_API,
        {
          method: 'POST',
          body: Profiles,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Profiles.length
          },
        }
      ).then(res => res.json());

      return profiles?.data?.profiles?.items
    }

    /**
     * Login user to https://www.lens.xyz/
     * and set accessToken and refreshToken to cookies
     */
    async function authenticateToLens() {
      const cookies = parseCookies(document.cookie)

      if (cookies['accessToken']) {
        alert('You are connected to Lens.')
        return
      }

      try {
        const Challenge = JSON.stringify({
          query: `
            query Challenge($address: EthereumAddress!) {
              challenge(request: { address: $address }) {
                text
              }
            }
          `,
          variables: { address }
        });

        const challengeInfo = await fetch(
          LENS_API,
          {
            method: 'POST',
            body: Challenge,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Challenge.length
            },
          }
        ).then(res => res.json());

        const signature = await window.ethereum?.request({
          method: "personal_sign",
          params: [challengeInfo.data.challenge.text, address],
        });

        const Authenticate = JSON.stringify({
          query: `
            mutation Authenticate(
              $address: EthereumAddress!
              $signature: Signature!
            ) {
              authenticate(request: {
                address: $address,
                signature: $signature
              }) {
                accessToken
                refreshToken
              }
            }
          `,
          variables: { address, signature }
        });

        const authData = await fetch(
          LENS_API,
          {
            method: 'POST',
            body: Authenticate,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Authenticate.length
            },
          }
        ).then(res => res.json());

        if (authData.data?.authenticate?.accessToken && authData.data?.authenticate?.refreshToken) {
          document.cookie = `accessToken=${authData.data?.authenticate?.accessToken}`
          document.cookie = `refreshToken=${authData.data?.authenticate?.refreshToken}`

          document.querySelector("#lens-connect-modal").classList.remove('show')

          await setLensProfileOrTriggerModal()
        } else {
          document.querySelector("#lens-connect-modal").classList.remove('show')
        }
      } catch (err) {
        document.querySelector("#lens-connect-modal").classList.remove('show')
        alert(err?.message ?? err)
      }
    }

    async function setLensProfileOrTriggerModal() {
      const profiles = await getProfiles()

      if (profiles?.length) {
        const [currentProfile] = profiles
          ?.slice()
          ?.sort((a, b) => Number(a.id) - Number(b.id))
          ?.sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1));

        //   {
        //     "id": "",
        //     "name": null,
        //     "bio": null,
        //     "attributes": [],
        //     "followNftAddress": null,
        //     "metadata": null,
        //     "isDefault": false,
        //     "picture": null,
        //     "handle": "",
        //     "coverPicture": null,
        //     "ownedBy": "",
        //     "dispatcher": null,
        //     "stats": {
        //         "totalFollowers": 0,
        //         "totalFollowing": 0,
        //         "totalPosts": 0,
        //         "totalComments": 0,
        //         "totalMirrors": 0,
        //         "totalPublications": 0,
        //         "totalCollects": 0
        //     },
        //     "followModule": null
        // }

        // we can store current profile id and handle
        if (currentProfile?.id && currentProfile?.handle) {
          document.cookie = `lensCurrentProfileId=${currentProfile.id}`
          document.cookie = `lensCurrentProfileHandle=${currentProfile.handle}`

          location.reload();
        }
      } else {
        triggerModalById('#lens-claim-modal')
      }
    }

    function triggerModalById(modalId = '') {
      const lensConnectModal = document.querySelector(modalId)
      lensConnectModal.classList.add("show")
      lensConnectModal.insertAdjacentHTML('afterbegin', '<div class="ct_modal_overlay"></div>');
      lensConnectModal.querySelector('.ct_modal_overlay').addEventListener('click', function () {
        this.closest('.ct_modal').classList.remove('show');
      })
    }

    function parseCookies(cookies = '') {
      if (!cookies) {
        return {}
      }

      return cookies.split('; ').reduce((map, cookie) => {
        const [key, value] = cookie.split('=')

        map[key] = value

        return map
      }, {})
    }

    function redirectToPath(path = '') {
      return window?.location?.replace(`${window.location.origin}/{path}`)
    }


    // initialise
    init();



    //async function aconnectWallet() {
			//const accounts = await window.ethereum.request({
			//method: "eth_requestAccounts"
			//})
			//console.log('accounts: ', accounts)
			//accounts[0]
			//setAccount(account)
      //const signer = provider.getSigner()
      
			//const account = web3.eth.accounts[0];
			//const signer = await window.ethereum.re
      //signedMessage = await signer.signMessage("hello world")
      //await window.ethereum?.request({
      //  method: "personal_sign",
      //  params: ["Hello world", address],
      //});
      //const signer = provider.getSigner()
      async function executeWithdraw() {
      
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner()
          const contractAddress = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";
          const abi = abib;

          const args =({
            ProfileId:27867,ContentURI: "ar://XZStcF-et8kvNbCcTmoPyPNNxvmKY33MuCtEWXTRqPI",
            CollectModule: "0x5E7...8dF8",CollectModuleInitData: "0x",
            ReferenceModule: "0x000...0000",ReferenceModuleInitData: "0x",Nonce:12,Deadline:1678368767
          })
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const message = "Hello world"
          //try {
            //const signature = await signer.signMessage(message); 
            //const verify = ethers.utils.verifyMessage(message, signature)
            await contract.postWithSig({
              ProfileId:"27867",ContentURI: "ar://XZStcF-et8kvNbCcTmoPyPNNxvmKY33MuCtEWXTRqPI",
              CollectModule: "0x5E7...8dF8",CollectModuleInitData: "0x",
              ReferenceModule: "0x000...0000",ReferenceModuleInitData: "0x",Nonce:"12",Deadline:"1678368767"
            });
            //console.log(signature);
          //} catch (error) {
          //  console.log(error);
          //}
        } else {
          console.log("Please install MetaMask");
        }
      }
		//}
    
    
    //document.querySelector("#nCon").addEventListener("click", executeWithdraw);
    // set on click events for buttons
    document.querySelector("#main_login_btn").addEventListener("click", walletConnect);
    document.querySelector("#lens-connect").addEventListener("click", authenticateToLens);
    // document.querySelector("#main_disconnect_btn").addEventListener("click", getProfiles);
  }, 500);
}