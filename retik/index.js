let currentStage

const presaleContractAddress = '0xf5F9f7F2b812D7a34545124c051766343a745056'; // presale contract address
const web3Provider = 'https://goerli.infura.io/v3/d7ef37f9c55947588866bd8e578bf417'; // Infura project ID
const abi = [{
    "inputs": [{
        "internalType": "address",
        "name": "_oracle",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_usdt",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_usdc",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_SaleToken",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_MinTokenTobuy",
        "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_totalTokens",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_startTime",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "_endTime",
        "type": "uint256"
    }],
    "name": "PresaleCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "PresalePaused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "prevValue",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newValue",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "PresaleTokenAddressUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "PresaleUnpaused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "prevValue",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "newValue",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "PresaleUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "purchaseToken",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensBought",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountPaid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "TokensBought",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
    }],
    "name": "TokensClaimed",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_oracle",
        "type": "address"
    }],
    "name": "ChangeOracleAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }],
    "name": "ChangeTokenToSell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "ETH_MULTIPLIER",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "EditMinTokenToBuy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "_status",
        "type": "bool"
    }],
    "name": "ExcludeAccouctFromMinBuy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "MinTokenTobuy",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "SaleToken",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "USDCInterface",
    "outputs": [{
        "internalType": "contract IERC20Metadata",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "USDTInterface",
    "outputs": [{
        "internalType": "contract IERC20Metadata",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "USDT_MULTIPLIER",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "WithdrawContractFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "WithdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "_value",
        "type": "bool"
    }],
    "name": "blackListUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "blockStamp",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "buyWithEth",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "usdcAmount",
        "type": "uint256"
    }],
    "name": "buyWithUSDC",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "usdAmount",
        "type": "uint256"
    }],
    "name": "buyWithUSDT",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_oldAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_newWallet",
        "type": "address"
    }],
    "name": "changeClaimAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_wallet",
        "type": "address"
    }],
    "name": "changeFundWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_newAddress",
        "type": "address"
    }],
    "name": "changeUSDCToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_newAddress",
        "type": "address"
    }],
    "name": "changeUSDTToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }],
    "name": "claimAmount",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }],
    "name": "claimableAmount",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_nextStagePrice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_tokensToSell",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_UsdtHardcap",
        "type": "uint256"
    }],
    "name": "createPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "currentSale",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "_status",
        "type": "bool"
    }],
    "name": "enableClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "ethBuyHelper",
    "outputs": [{
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "ethToTokens",
    "outputs": [{
        "internalType": "uint256",
        "name": "_tokens",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "fundReceiver",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getLatestPrice",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "isBlackList",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "isExcludeMinToken",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "isExist",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "overalllRaised",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }],
    "name": "pausePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "paused",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "presale",
    "outputs": [{
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "nextStagePrice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "Sold",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "tokensToSell",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "UsdtHardcap",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amountRaised",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "Active",
        "type": "bool"
    }, {
        "internalType": "bool",
        "name": "isEnableClaim",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "presaleId",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }],
    "name": "setPresaleStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256[]",
        "name": "_id",
        "type": "uint256[]"
    }, {
        "internalType": "uint256[]",
        "name": "vestingStartTime",
        "type": "uint256[]"
    }, {
        "internalType": "uint256[]",
        "name": "_initialClaimPercent",
        "type": "uint256[]"
    }, {
        "internalType": "uint256[]",
        "name": "_vestingTime",
        "type": "uint256[]"
    }, {
        "internalType": "uint256[]",
        "name": "_vestingPercentage",
        "type": "uint256[]"
    }],
    "name": "setPresaleVesting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }],
    "name": "unPausePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "uniqueBuyers",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_nextStagePrice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_tokensToSell",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_Hardcap",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "isclaimAble",
        "type": "bool"
    }],
    "name": "updatePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_vestingStartTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_initialClaimPercent",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_vestingTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_vestingPercentage",
        "type": "uint256"
    }],
    "name": "updatePresaleVesting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "usdtBuyHelper",
    "outputs": [{
        "internalType": "uint256",
        "name": "usdPrice",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "usdtToTokens",
    "outputs": [{
        "internalType": "uint256",
        "name": "_tokens",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "userClaimData",
    "outputs": [{
        "internalType": "uint256",
        "name": "claimAt",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "claimAbleAmount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "claimedVestingAmount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "claimedAmount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "claimCount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "activePercentAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "vesting",
    "outputs": [{
        "internalType": "uint256",
        "name": "vestingStartTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "initialClaimPercent",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "vestingTime",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "vestingPercentage",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "totalClaimCycles",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}]

let web3;
let presaleContract;

window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));
    }

    presaleContract = new web3.eth.Contract(abi, presaleContractAddress);

    // Update presale information on the webpage
    await updatePresaleInfo();
});

async function updatePresaleInfo() {
    try {
        //check and show current stage
        currentStage = Number(await presaleContract.methods.currentSale().call());
        document.getElementById('currentStage').innerText = currentStage;

        //check the current stage price
        const presaleData = await presaleContract.methods.presale(currentStage).call();

        const currentPrice = web3.utils.fromWei(presaleData.price, 'ether')
        document.querySelectorAll(".token-current-price").forEach((value) => {
            value.innerHTML = "1 Retik = " + currentPrice;
        })

        //check the next stage price
        const nextPrice = web3.utils.fromWei(presaleData.nextStagePrice, 'ether')
        document.querySelectorAll(".token-next-stage-price").forEach((value) => {
            value.innerHTML = "Next Stage Price = " + nextPrice;
        }) 
        
        
        // check and show usdt raised value
        let totalRaisedinUsdtRaw = await presaleContract.methods.overalllRaised().call({
            from: presaleContractAddress
        })
        document.querySelectorAll(".totalUsdtRaisedValue").forEach((value) => {
            value.innerText = "$" + (Number(totalRaisedinUsdtRaw)/1000000).toFixed(4);
        });


        //check the total token sold
        const totalTokenSold = parseFloat(web3.utils.fromWei(presaleData.Sold, 'ether'))
        document.querySelectorAll(".token-sold").forEach((value) => {
            value.innerText = totalTokenSold.toFixed(4) ;
        })

        //check the total token to sold
        const totalTokenToSell = parseFloat(web3.utils.fromWei(presaleData.tokensToSell, 'ether'))
        document.querySelectorAll(".token-to-sell").forEach((value) => {
            value.innerText = totalTokenToSell ;
        })

        //update progress bar
        const percentageSold = (totalTokenSold / totalTokenToSell) * 100;
        document.querySelectorAll(".progress-bar-width").forEach((value)=>{
            value.style.width = percentageSold + "%"
        })
        document.querySelectorAll(".progress-bar-value").forEach((value)=>{
            value.innerText = percentageSold.toFixed(1) + "%"
        })
        
    } catch (error) {
        console.error("Error calling the contract method:", error);
    }
}




let address;
let connectButton1 = document.querySelectorAll(".connectButton-1");
let connectButton2 = document.querySelectorAll(".connectButton-2");
let buyButton = document.querySelectorAll(".buy-button");

// Function to show wallet option
function showWalletsOption() {
    document.querySelector(".blur-effect").classList.remove("invisible");
    document.querySelector(".wallets").classList.remove("invisible");
}

// Function to hide wallet options
function removeWalletsOption() {
    document.querySelector(".blur-effect").classList.add("invisible")
    document.querySelector(".wallets").classList.add("invisible")
}

// Function to connect to MetaMask
async function connectMetamask() {

    if (typeof window.ethereum !== 'undefined') {
        // Request account access
        window.ethereum
            .request({
                method: 'eth_requestAccounts'
            })
            .then(function (accounts) {
                address = accounts[0];
                // Truncate the address to show only the first 5 characters followed by three dots
                var truncatedAddress = address.substring(0, 6) + '...';

                //this loop disable all connect buttons and show address in them. the it hide connect button from dashboard and show buy button
                for (let i = 0; i < connectButton1.length; i++) {
                    connectButton1[i].innerText = truncatedAddress;
                    connectButton1[i].disabled = true;
                }
                for (let i = 0; i < connectButton2.length; i++) {
                    connectButton2[i].classList.add("hidden")
                }
                for (let i = 0; i < connectButton2.length; i++) {
                    buyButton[i].classList.remove("hidden")
                }

                removeWalletsOption() // remove the wallet options
                document.querySelectorAll(".user-holdings").forEach((value) => {
                    value.classList.remove("hidden")
                })
                showUsersHoldings();
            })
            .catch(function (error) {
                alert("Error: " + error.message);
            });
    } else {
        connectButton1.innerText = "MetaMask Not Detected";
    }

    let chain = await web3.eth.getChainId();

    if (chain != "1") {
        await networkHandler();
    }
}

async function connectWalletConect() {

    var provider = new WalletConnectProvider.default({
        rpc: {
            1: web3Provider
        },
        bridge: 'https://bridge.walletconnect.org'
    });

    await provider.enable();

    //  Create Web3 instance
    const web3 = new Web3(provider);
    window.w3 = web3

    var accounts = await web3.eth.getAccounts(); // get all connected accounts
    address = accounts[0]; // get the primary account
    console.log(address)

    removeWalletsOption() // remove the wallet options
    document.querySelectorAll(".user-holdings").forEach((value) => {
        value.classList.remove("hidden")
    })
    showUsersHoldings();
}

var sign = async (msg) => {
    if (w3) {
        return await w3.eth.personal.sign(msg, account)
    } else {
        return false
    }
}

var contract = async (abi, address) => {
    if (w3) {
        return new w3.eth.Contract(abi, address)
    } else {
        return false
    }
}

var disconnect = async () => {
    // Close provider session
    await provider.disconnect()
}


// Function to change the network
const networkHandler = async () => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: "0x1"
            }],
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to check user holdings 
async function showUsersHoldings() {
    try {
        const userTokenHoldingRaw = await presaleContract.methods.claimableAmount(address, currentStage).call();
        const userTokenHolding = parseFloat(web3.utils.fromWei(userTokenHoldingRaw, 'ether')).toFixed(4);

        document.querySelectorAll(".user-holdings").forEach((value) => {
            value.innerHTML = "<a style='color: #FEC5A3; text-decoration:underline;'>Your Holdings: </a><span>" + userTokenHolding + "</span>";
        });

        return userTokenHolding;
    } catch (error) {
        console.error('Error occurred while calling claimableAmount:', error);
    }
}


const tokensInput = document.querySelectorAll(".get-value");
const amountInput = document.querySelectorAll(".buy-value");
let coinSelectors = document.querySelectorAll(".coin-selector")
let selecedCoin = "eth" //by default set to eth


function ethSelected(button) {
    selecedCoin = "eth"
    for (i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    button.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/eth-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>ETH</strong> You Pay:"
    })
    for (i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}

function usdtSelected(button) {
    selecedCoin = "usdt"
    for (i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    button.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/usdt-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>USDT</strong> You Pay:"
    })
    for (i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}

function usdcSelected(button) {
    selecedCoin = "usdc"
    for (i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    button.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/usdc-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>USDC</strong> You Pay:"
    })
    for (i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}

let enteredAmount

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the input field with ID "buy-value-1"
    const inputField1 = document.querySelector("#buy-value-1");
    inputField1.addEventListener("input", function () {
        enteredAmount = inputField1.value
        const inputValue = inputField1.value;
        updateTokensValue(inputValue);

    });

    // Add an event listener for the input field with ID "buy-value-2"
    const inputField2 = document.querySelector("#buy-value-2");
    inputField2.addEventListener("input", function () {
        enteredAmount = inputField2.value
        const inputValue = inputField2.value;
        updateTokensValue(inputValue);

    });


    // Function to update tokens value for the specified ETH value
    async function updateTokensValue(enteredAmount) {

        let tokens

        if (isNaN(enteredAmount)) {
            // If the value is 0 or not a valid number, set tokens to 0
            for (i = 0; i < tokensInput.length; i++) {
                tokensInput[i].forEach().value = "0";
            }
        } else {
            try {

                if (selecedCoin == "eth") {
                    const amountInWei = web3.utils.toWei(enteredAmount.toString(), "ether");
                    tokens = await presaleContract.methods.ethToTokens(currentStage, amountInWei).call();
                }
                if (selecedCoin == "usdt") {
                    tokens = await presaleContract.methods.usdtToTokens(currentStage, enteredAmount*1000000).call();
                }
                if (selecedCoin == "usdc") {
                    tokens = await presaleContract.methods.usdtToTokens(currentStage, enteredAmount*1000000).call();
                }
                // Update the input field with class "get-value" with the calculated tokens
                for (i = 0; i < tokensInput.length; i++) {
                    tokensInput[i].value = web3.utils.fromWei(tokens, "ether");
                }

            } catch (error) {
                console.error("Error:", error);
            }
        }

    }
});

async function buyToken() {

    if (selecedCoin == "usdt") {
        try {
            // Check if MetaMask is installed and connected
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.enable(); // Request user's permission to connect to MetaMask

                const web3 = new Web3(window.ethereum);

                const gasPrice = await web3.eth.getGasPrice();

                // Convert the entered USDT amount to the smallest unit (e.g., USDC has 6 decimals)
                const usdtAmountInWei = web3.utils.toWei("1", 'microether');

                // Create a transaction object
                const txObject = {
                    from: address, // Your wallet address
                    to: presaleContractAddress, // Address of the presale contract
                    value: usdtAmountInWei, // Sending USDT, so value is 0
                    gasPrice: gasPrice,
                    data: presaleContract.methods.buyWithUSDT(usdtAmountInWei).encodeABI(), // Use the correct method name and pass the amount
                };

                // Send the transaction using MetaMask's provider
                const receipt = await web3.eth.sendTransaction(txObject);

                updatePresaleInfo()
            } else {
                console.error('MetaMask is not installed or not connected.');
            }
        } catch (error) {
            console.error('Error buying tokens with USDT:', error);
        }

    }
    if (selecedCoin == "usdc") {
        try {
            // Check if MetaMask is installed and connected
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.enable(); // Request user's permission to connect to MetaMask

                const web3 = new Web3(window.ethereum);

                const gasPrice = await web3.eth.getGasPrice();

                // Convert the entered USDC amount to the smallest unit (6 decimals)
                const usdcAmountInWei = web3.utils.toWei(enteredAmount.toString(), 'microether');

                // Create a transaction object
                const txObject = {
                    from: address, // Your wallet address
                    to: presaleContractAddress, // Address of the presale contract
                    value: usdcAmountInWei, // Sending USDC, so value is 0
                    gasPrice: gasPrice,
                    data: presaleContract.methods.buyWithUSDC(usdcAmountInWei).encodeABI(), // Use the correct method name and pass the amount
                };

                // Send the transaction using MetaMask's provider
                const receipt = await web3.eth.sendTransaction(txObject);

                updatePresaleInfo()
            } else {
                console.error('MetaMask is not installed or not connected.');
            }
        } catch (error) {
            console.error('Error buying tokens with USDC:', error);
        }

    } else {
        try {
            // Check if MetaMask is installed and connected
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.enable(); // Request user's permission to connect to MetaMask

                const web3 = new Web3(window.ethereum);

                const gasPrice = await web3.eth.getGasPrice();
                const valueInWei = web3.utils.toWei(enteredAmount.toString(), 'ether');

                // Create a transaction object
                const txObject = {
                    from: address,
                    to: presaleContractAddress,
                    value: valueInWei,
                    gasPrice: gasPrice,
                    data: presaleContract.methods.buyWithEth().encodeABI(), // Use the correct method name
                };

                // Send the transaction using MetaMask's provider
                const receipt = await web3.eth.sendTransaction(txObject);

                updatePresaleInfo()
            } else {
                console.error('MetaMask is not installed or not connected.');
            }
        } catch (error) {
            console.error('Error buying tokens:', error);
        }
    }
}