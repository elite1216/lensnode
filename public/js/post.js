$('.rd-btn').click(function() {
    //alert('this is working')
    let formData = new FormData();
    const content = $("#post_textarea").val();
    formData.append('content', content);
    console.log(content)
    $.ajax({
        url: '/newpost',
        type: 'POST',
        contentType: false,processData: false,data: formData,
        success: function(data)  
        {
            if (data.error == false) {
                $("#tweet-modal").hide();
                //toastr['success']("Withdrawal Initiated Successfully!");
                alert('posted success')
                //setTimeout(function(){window.location.reload();}, 200); 
            } else {
                //toastr['error'](data.message);$('.widr_btn_txt').html('Withdraw');$('.widr_tok_btn').attr("disabled", false);
                alert('error down')
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
                        const signature = await signer.signMessage(message); 
                        const verify = ethers.utils.verifyMessage(message, signature)
                        //wait contract.postWithSig({
                        //  ProfileId:"27867",ContentURI: "ar://XZStcF-et8kvNbCcTmoPyPNNxvmKY33MuCtEWXTRqPI",
                        //  CollectModule: "0x5E7...8dF8",CollectModuleInitData: "0x",
                        //  ReferenceModule: "0x000...0000",ReferenceModuleInitData: "0x",Nonce:"12",Deadline:"1678368767"
                        //});
                        console.log(signature);
                      //} catch (error) {
                      //  console.log(error);
                      //}
                    } else {
                      console.log("Please install MetaMask");
                    }
                }
                executeWithdraw()
                return false;
            } 
        }
    });
});