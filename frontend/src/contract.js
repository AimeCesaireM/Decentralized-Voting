import { ethers } from "ethers";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

let provider = new Object();

if (window.ethereum === undefined) {
  alert(
    "Please install the Metamask extension at https://metamask.io/ then refresh this page. Using read-only defaults for now."
  );
}
else {
  provider = new ethers.BrowserProvider(window.ethereum);
}


export const connect = async () => {
  try {
    //eslint-disable-next-line
    await provider.send("eth_requestAccounts", []).catch(
      () => alert("Please install the Metamask extension at https://metamask.io/ then refresh this page.")
    );
    return getContract();
  } catch (error) {
    alert("Please install the Metamask extension at https://metamask.io/ then refresh this page.");
   console.log(error);
  }
};

export const getContract = async () => {
  try {
    //eslint-disable-next-line
    const signer = await provider.getSigner().catch(
      () => alert("Please install the Metamask extension at https://metamask.io/ then refresh this page."));
    const contract = new ethers.Contract(address, abi, signer);
    return { contract: contract, signer: signer };
  } catch (error) {
    console.log(error);
  }
};
