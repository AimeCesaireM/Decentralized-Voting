import { ethers } from "ethers";

const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const abi = [
  "event MemberJoined(address indexed member, uint256 joinedAt)",
  "event VoteCreated(address indexed owner, uint256 indexed voteId, uint256 indexed createdAt, uint256 endTime)",
  "event Voted(address indexed voter, uint256 indexed voteId, uint256 indexed option, uint256 createdAt)",
  "function createVote(string uri, uint256 endTime, uint256 options)",
  "function didVote(address member, uint256 voteId) view returns (bool)",
  "function getVote(uint256 voteId) view returns (string, address, uint256[], uint256)",
  "function join()",
  "function members(address) view returns (bool)",
  "function vote(uint256 voteId, uint256 option)",
];


try {
  const provider = new ethers.BrowserProvider(window.ethereum);
} catch (error) {
  console.log(error);
  alert(
    "Please install the Metamask extension at https://metamask.io/ then refresh this page. Using read-only defaults for now."
  );
}

export const connect = async () => {
  try {
    //eslint-disable-next-line
    await provider.send("eth_requestAccounts", []);
    return getContract();
  } catch (error) {
    alert("Please install the Metamask extension at https://metamask.io/ then refresh this page.");
   console.log(error);
  }
};

export const getContract = async () => {
  try {
    //eslint-disable-next-line
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return { contract: contract, signer: signer };
  } catch (error) {
    console.log(error);
  }
};
