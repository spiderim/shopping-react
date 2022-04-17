import web3 from './web3';

const address='0x9e92CaB1097dCc67f04F434E0C925a4a8DE8d4Aa';

const abi=[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ad",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "admin",
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
        "name": "_orderId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addrRetailer",
        "type": "address"
      }
    ],
    "name": "cancelOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrRetailer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_deliveryAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "cashOnDeliveryOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      }
    ],
    "name": "customerSignUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_orderId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addrRetailer",
        "type": "address"
      }
    ],
    "name": "deliveryOnPay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_orderId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addrRetailer",
        "type": "address"
      }
    ],
    "name": "deliveryWithoutPay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      }
    ],
    "name": "editUserInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrCustomer",
        "type": "address"
      }
    ],
    "name": "getCustomerInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addrCustomer",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "userExist",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "userType",
            "type": "uint256"
          }
        ],
        "internalType": "struct Customer.User",
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
        "name": "_orderId",
        "type": "uint256"
      }
    ],
    "name": "getOrderInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addrRetailer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "addrCustomer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "orderStatus",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "deliveryAddress",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "payStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "trackingId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "trackingCompanyName",
            "type": "string"
          }
        ],
        "internalType": "struct Customer.Order",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOrders",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addrRetailer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "addrCustomer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "orderStatus",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "deliveryAddress",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "payStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "trackingId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "trackingCompanyName",
            "type": "string"
          }
        ],
        "internalType": "struct Customer.Order[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrCustomer",
        "type": "address"
      }
    ],
    "name": "getOrdersAdmin",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addrRetailer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "addrCustomer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "orderStatus",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "itemId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "deliveryAddress",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "payStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "trackingId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "trackingCompanyName",
            "type": "string"
          }
        ],
        "internalType": "struct Customer.Order[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addrCustomer",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "userExist",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "userType",
            "type": "uint256"
          }
        ],
        "internalType": "struct Customer.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isValidUser",
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
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "addrRetailer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "addrCustomer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "orderStatus",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "deliveryAddress",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "payStatus",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "trackingId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "trackingCompanyName",
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
        "name": "_addrRetailer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_deliveryAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "payOnOrder",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrCustomer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_orderId",
        "type": "uint256"
      }
    ],
    "name": "returnOrderSucess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrRetailer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_orderId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newAddress",
        "type": "string"
      }
    ],
    "name": "setDeliveryAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addrCustomer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_orderId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_trackingId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_trackingCompanyName",
        "type": "string"
      }
    ],
    "name": "setOrderStatusDispatched",
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
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addrCustomer",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "userExist",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "userType",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
export default new web3.eth.Contract(abi,address);

