export const PUNK_CONTRACT = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
export const PUNK_ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "punksOfferedForSale",
		"outputs": [
			{
				"name": "isForSale",
				"type": "bool"
			},
			{
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"name": "seller",
				"type": "address"
			},
			{
				"name": "minValue",
				"type": "uint256"
			},
			{
				"name": "onlySellTo",
				"type": "address"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "enterBidForPunk",
		"outputs": [],
		"payable": true,
		"type": "function",
		"stateMutability": "payable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"name": "minPrice",
				"type": "uint256"
			}
		],
		"name": "acceptBidForPunk",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "setPunksIndex",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "addresses",
				"type": "address[]"
			},
			{
				"name": "indices",
				"type": "uint256[]"
			}
		],
		"name": "setInitialOwners",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"type": "function",
		"stateMutability": "payable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "imageHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nextPunkIndexToAssign",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "punkIndexToAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "standard",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "punkBids",
		"outputs": [
			{
				"name": "hasBid",
				"type": "bool"
			},
			{
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"name": "bidder",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "allInitialOwnersAssigned",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "allPunksAssigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "buyPunk",
		"outputs": [],
		"payable": true,
		"type": "function",
		"stateMutability": "payable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "transferPunk",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "withdrawBidForPunk",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "setInitialOwner",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"name": "minSalePriceInWei",
				"type": "uint256"
			},
			{
				"name": "toAddress",
				"type": "address"
			}
		],
		"name": "offerPunkForSaleToAddress",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "punksRemainingToAssign",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"name": "minSalePriceInWei",
				"type": "uint256"
			}
		],
		"name": "offerPunkForSale",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "getPunk",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingWithdrawals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "punkNoLongerForSale",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"inputs": [],
		"payable": true,
		"type": "constructor",
		"stateMutability": "payable"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "Assign",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "PunkTransfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "minValue",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "toAddress",
				"type": "address"
			}
		],
		"name": "PunkOffered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fromAddress",
				"type": "address"
			}
		],
		"name": "PunkBidEntered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fromAddress",
				"type": "address"
			}
		],
		"name": "PunkBidWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "punkIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "fromAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "toAddress",
				"type": "address"
			}
		],
		"name": "PunkBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "punkIndex",
				"type": "uint256"
			}
		],
		"name": "PunkNoLongerForSale",
		"type": "event"
	}
];

export const SIGN_CONTRACT = '0x62268FC648E83822cAdEcF62d944547f2990D837';
export const SIGN_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"internalType": "uint256",
				"name": "signPunks",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "id_did",
				"type": "string"
			}
		],
		"name": "activateUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
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
				"name": "hat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "twitter",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "cryptoPunksClaim",
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
				"internalType": "uint256",
				"name": "signPunks",
				"type": "uint256"
			}
		],
		"name": "getActiveState",
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
		"inputs": [],
		"name": "getMintPrice",
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
		"inputs": [],
		"name": "getUpdateSignPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "signPunks",
				"type": "uint256"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "state",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id_did",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getpunks",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getpunksHat",
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
				"name": "signPunks",
				"type": "uint256"
			}
		],
		"name": "getpunksInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "meta",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "twitter",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
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
				"internalType": "uint256",
				"name": "hat",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "twitter",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "mintCryptoPunksSign",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_y",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_z",
				"type": "uint256"
			}
		],
		"name": "mulDiv",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
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
				"internalType": "address",
				"name": "cryptoPunksAddress",
				"type": "address"
			}
		],
		"name": "setCryptoPunksContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "punksDao",
				"type": "address"
			}
		],
		"name": "setCryptoPunksDao",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "manager",
				"type": "address"
			}
		],
		"name": "updateManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			}
		],
		"name": "updatePunksNote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "updatePunksSign",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "twitter",
				"type": "string"
			}
		],
		"name": "updatePunksTwitter",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const PUNK_IMG = 'https://ipfs.fleek.co/ipfs/bafybeifrahjvhyovihzkggh5tfhnljtxcmj3mtv6enxw5ahvbw4n4qd7l4/images/cryptopunk';

export const CAP_IMG = 'https://bafybeiev7763ilyye3d5yodsypvunnw42vvp6saq6stclidcnm7rj324wm.ipfs.dweb.link/cap/cap-';

export let withCap = ['030', '037', '059', '088', '1009', '1017', '1018', '1021', '1060', '1069', '1074', '1075', '119', '153', '157', '1608', '1625', '1630', '1632', '1657', '1664', '1682', '1687', '1720', '1723', '175', '1760', '1809', '1822', '1834', '1846', '1892', '1896', '1921', '1960', '1995', '1999', '2020', '2029', '2035', '2052', '2112', '2130', '2137', '2161', '2179', '218', '2251', '2255', '2270', '2307', '2316', '2367', '2369', '2408', 
'2438', '2439', '2456', '2463', '2472', '2479', '2491', '2509', '2512', 
'2536', '257', '2581', '2615', '2641', '2650', '2681', '2704', '2718', '2729', '2739', '274', '2748', '2833', '2838', '2887', '2890', '2892', '2895', '2901', '2922', '3046', '3064', '3077', '3083', '3088', '3089', '3109', '3123', '3138', '3144', '3160', '3182', '3197', '3256', '3264', '3270', '3278', '3291', '3292', '336', '3363', '339', '3442', '3443', '3448', '3454', '3485', '3486', '3505', '3526', '3546', '3567', '363', '3657', '3675', '3682', '3693', '3698', '3731', '3740', '3772', '3782', '3800', '3801', '3808', '3833', '3856', '3866', '3872', '3887', '3900', '3914', '3916', '3923', '3945', '397', '3988', '4012', '4024', '4029', '4041', '4049', '4070', '4082', '414', '4241', '4251', '4255', '4283', '4285', '4290', '4305', '4323', '4336', '4365', '4371', '4382', '4403', '442', 
'4423', '4428', '4435', '4442', '4446', '4447', '4460', '4470', '4474', 
'4501', '4509', '4514', '4522', '4529', '453', '4537', '455', '458', '4583', '4591', '4604', '4611', '4616', '4624', '4625', '4640', '4647', '4662', '4696', '4732', '4750', '4780', '480', '4800', '4819', '4851', '4961', '4963', '5008', '5009', '5034', '5037', '5074', '5093', '5111', '5122', '5136', '5141', '516', '5185', '5189', '5216', '5235', '5236', '5242', '5265', '5285', '5303', '5318', '5341', '5350', '5355', '5363', '5381', '5420', '5422', '5425', '5442', '5444', '5445', '5454', '5478', '550', '5511', '5514', '5523', '5558', '5564', '5569', '5577', '5583', '5595', '5598', '561', '562', '5633', '5665', '5676', '5678', '5685', '570', '5705', '5714', '577', '5772', '5774', '5786', '582', '5841', '5871', '5891', '5893', '5923', '5924', '5961', '5970', '5971', '5974', '5996', '6034', '6059', '611', '6145', '6167', '6204', '6209', '6212', '6218', '6237', '6238', '6252', '626', '6262', '6280', '6297', '6303', '633', '6330', '6333', '6342', '6375', '638', '6385', '6397', '645', '6459', '6463', 
'6464', '6466', '6477', '6504', '6510', '6511', '6522', '6531', '6552', 
'6563', '657', '6587', '6597', '6607', '6623', '6640', '6719', '6747', '6748', '6751', '6762', '6766', '6773', '6787', '6798', '6806', '6819', '6837', '6865', '6889', '6891', '6914', '6915', '6947', '6952', '6964', '6966', '6984', '6987', '7016', '7026', '7031', '7037', '7041', '7047', '7053', '7064', '7107', '711', '7149', '7152', '7161', '7186', '7187', '7193', '7203', '7223', '7249', '7267', '7273', '728', '7327', '7339', '735', '7356', '7365', '7374', '7382', '7410', '7425', '7433', '7434', '7453', '7459', '747', '7471', '7485', '7519', '7529', '7533', '756', '7569', '7580', '7585', '7592', '7597', '7620', '7629', '7630', '7633', '7665', '7686', '7689', '7712', '7746', '776', '7762', '7775', '779', '7794', 
'7828', '7851', '7854', '7873', '789', '7891', '7892', '7895', '790', '7901', '7913', '7924', '7936', '7946', '7951', '7955', '7986', '8000', '8022', '807', '8073', '8076', '8077', '8082', '8099', '8112', '8117', '816', '8182', '8188', '8196', '8233', '827', '8270', '8274', '8278', '8315', '8317', '8352', '8402', '8410', '8452', '851', '8520', '8543', '8569', '8574', '8580', '860', '8608', '8614', '8616', '862', '8645', '8651', 
'8663', '8677', '8722', '8735', '8761', '8791', '8803', '8807', '8813', 
'8835', '891', '897', '8981', '8988', '903', '9079', '915', '9153', '9170', '9171', '9173', '9181', '9280', '9322', '9326', '9329', '9360', '9369', '943', '945', '9496', '9537', '9601', '963', '9675', '9679', '968', 
'9680', '9687', '9688', '9721', '9736', '9737', '9753', '9758', '9772', 
'9774', '9803', '9829', '9843', '9870', '9883', '9896', '9909', '9923', 
'9939', '996', '9993'];