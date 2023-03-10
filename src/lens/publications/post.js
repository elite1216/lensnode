import { uploadIpfs } from '../../services/ipfs.service.js'
import { getTagsFromText, getPublicationMainFocusByType } from '../../utils/index.js'
import { v4 as uuidv4 } from 'uuid';
import { createPostTypedData, getDispatcherStatus, createPostViaDispatcherRequest, broadcastRequest } from '../../apis/apolloClient.js'
import { signedTypeData, splitSignature} from '../../services/ethers.service.js';
import { getLensHub } from '../hub.js';

export const createPost = async (
  { content = '', name = '', image, externalUrl },
  { address = '', profileId = '', accessToken = '' }
  ) => {
  
  const postMetadata = {
    name,
    content,
    image,
    version: "2.0.0",
    //mainContentFocus: getPublicationMainFocusByType(image?.mimetype),
    mainContentFocus: getPublicationMainFocusByType('TEXT_ONLY'),
    metadata_id: uuidv4(),
    description: 'description',
    locale: "en-US",
    external_url: externalUrl ?? null,
    imageMimeType: image?.mimetype,
    attributes: [],
    appId: process.env.APP_NAME ?? 'Lensfrens',
    tags: getTagsFromText(content),
  };

  const ipfsResult = await uploadIpfs(postMetadata);
  console.log('ipfs url here', ipfsResult)

  const createPostRequest = {
    profileId,
    contentURI: `ipfs://${ipfsResult.path}`,
    collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
    },
    referenceModule: {
        followerOnlyReferenceModule: false,
    },
  };

  const result = await postGasless(createPostRequest, profileId, accessToken);
  console.log(result);

}


const postGasless = async (createPostRequest, profileId, accessToken) => {
  const dStatus = await getDispatcherStatus(profileId);

  if (dStatus?.dispatcher?.canUseRelay) 
  {
    console.log('enabled', await getDispatcherStatus(profileId))

    const dispatcherResult = await createPostViaDispatcherRequest(createPostRequest, accessToken);
    console.log('create post via createPostViaDispatcherRequest', dispatcherResult);

    if (dispatcherResult.__typename !== 'RelayerResult') {
      console.error('create post via dispatcher: failed', dispatcherResult);
      throw new Error('create post via dispatcher: failed');
    } 

    return { txHash: dispatcherResult.txHash, txId: dispatcherResult.txId };
  
  } else {

    console.log('dispacher not enabled',await getDispatcherStatus(profileId))

    const signedResult = await _signCreatePostTypedData(createPostRequest, accessToken);
    console.log('create post via broadcast: signedResult', signedResult);

    const typedData = signedResult?.result?.createPostTypedData?.typedData;
    const { v, r, s } = splitSignature(signedResult.signature);
    const tx = { 
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    };

    const broadcastResult = await broadcastRequest({
      id: signedResult.result.id,
      signature: signedResult.signature,
    });

    if (broadcastResult.__typename === 'RelayError') {
      //return write?.({ recklesslySetUnpreparedArgs: [inputStruct] });
      // here we need to pass tx struct back to router and from there to ajax call back
      return error
    }

    //if (broadcastResult.__typename !== 'RelayerResult') {
    //  console.error('create post via broadcast: failed', broadcastResult);
    //  throw new Error('create post via broadcast: failed');
    //}

    //console.log('create post via broadcast: broadcastResult', broadcastResult);
    //return { txHash: broadcastResult.txHash, txId: broadcastResult.txId };

  }
}

const _signCreatePostTypedData = async (request, accessToken) => {
  const options = {
    context: {
      headers: {
        "x-access-token": accessToken
      }
    },
  }

  const result = await createPostTypedData(request, options);
  const { typedData } = result.createPostTypedData;
  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

  return { result, signature };
};




const createPost2 = async (
    { content = '', name = '', image, externalUrl },
    { address = '', profileId = '', accessToken = '' }
  ) => {
    const postMetadata = {
      name,
      content,
      image,
      version: "2.0.0",
      //mainContentFocus: getPublicationMainFocusByType(image?.mimetype),
      mainContentFocus: getPublicationMainFocusByType('TEXT_ONLY'),
      metadata_id: uuidv4(),
      description: 'description',
      locale: "en-US",
      external_url: externalUrl ?? null,
      imageMimeType: image?.mimetype,
      attributes: [],
      appId: process.env.APP_NAME ?? 'Lensfrens',
      tags: getTagsFromText(content),
    };
    

    const ipfsResult = await uploadIpfs(postMetadata);
    //console.log('ipfs url here', ipfsResult)

    const _signCreatePostTypedData = async (request, accessToken) => {
      const options = {
        context: {
          headers: {
            "x-access-token": accessToken
          }
        },
      }
    
      const result = await createPostTypedData(request, options);
      const { typedData } = result.createPostTypedData;
      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    
      return { result, signature };
    };
    const createPostRequest = {
      profileId,
      contentURI: `ipfs://${ipfsResult.path}`,
      collectModule: {
          freeCollectModule: {
            followerOnly: false,
          },
      },
      referenceModule: {
          followerOnlyReferenceModule: false,
      },
    };
    
    const signedResult = await _signCreatePostTypedData(createPostRequest, accessToken);
    const typedData = signedResult?.result?.createPostTypedData?.typedData;

    const { v, r, s } = splitSignature(signedResult.signature);

    const LENS_CONTRACT_ADDRESS = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
    const lensHub = getLensHub(LENS_CONTRACT_ADDRESS)

    //const tx = await lensHubContract.call("postWithSig", {
    const tx = await lensHub.postWithSig({ 
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
  
    console.log(tx.hash);
}

//{
//  profileId: "0x6cdb",
//  contentURI: "ipfs://QmeV5tf64wLhPYMma2zMGyPN94joEaoREvV7TSAhMYmVsp",
//  collectModule: { freeCollectModule: { followerOnly: true } },
//  referenceModule: { followerOnlyReferenceModule: false }
//}