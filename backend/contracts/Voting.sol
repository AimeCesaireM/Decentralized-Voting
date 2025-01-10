// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voting {
    //votes

    uint nextVoteId;

    struct Vote {
        string uri;
        address owner;
        uint endTime;
        uint[] votes;
        mapping(address => bool) voted;
        uint options;
    }

    mapping(uint => Vote) votes;
    mapping(address => bool) public members;

    event MemberJoined(address indexed member, uint joinedAt);

    event VoteCreated(
        address indexed owner,
        uint indexed voteId,
        uint indexed createdAt,
        uint endTime
    );

    event Voted(
        address indexed voter,
        uint indexed voteId,
        uint indexed option,
        uint createdAt
    );

    modifier isMember() {
        require(
            members[msg.sender],
            "Welcome! Please register as a member first"
        );
        _;
    }

    modifier canVote(uint voteId, uint option) {
        require(voteId < nextVoteId, "Sorry, this election does not exist");
        require(
            !votes[voteId].voted[msg.sender],
            "Hi there, you have already voted"
        );
        require(
            option < votes[voteId].options,
            "Oops! That option is invalid. Please choose a valid option."
        );
        require(
            block.timestamp <= votes[voteId].endTime,
            "Aww! This election has already ended"
        );
        _;
    }

    function join() external {
        require(
            !members[msg.sender],
            "Welcome back! You are already a member."
        );
        members[msg.sender] = true;
        emit MemberJoined(msg.sender, block.timestamp);
    }

    function createVote(
        string memory uri,
        uint256 endTime,
        uint256 options
    ) external isMember {
        require(
            endTime > block.timestamp,
            "The end time must be in the future"
        );
        require(options > 0, "There must be at least one option");

        uint256 voteId = nextVoteId;

        votes[voteId].uri = uri;
        votes[voteId].owner = msg.sender;
        votes[voteId].endTime = endTime;
        votes[voteId].options = options;
        votes[voteId].votes = new uint256[](options);

        emit VoteCreated(msg.sender, voteId, block.timestamp, endTime);
        nextVoteId++;
    }

    function vote(
        uint voteId,
        uint option
    ) external isMember canVote(voteId, option) {
        votes[voteId].votes[option] = votes[voteId].votes[option] + 1;
        votes[voteId].voted[msg.sender] = true;
        emit Voted(msg.sender, voteId, option, block.timestamp);
    }

    function getVote(uint voteId)
     public view returns (string memory, address, uint[] memory, uint) {
        return (
            votes[voteId].uri,
            votes[voteId].owner,
            votes[voteId].votes,
            votes[voteId].endTime
        );
    }

    function didVote(
        address member,
        uint256 voteId
    ) public view returns (bool) {
        return votes[voteId].voted[member];
    }
}
