// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// optional todo: if only one policy is available, need more than x number unique votes to pass
// optional todo: reuse policies which havent been passed in new round

contract main {
    // can we declare variables which can be set outside of the contract?
    uint8 public constant maxVote = 20;
    uint8 public constant credits = 10;

    uint256 public constant maxRounds = 9999;

    address public owner;

    struct policy {
        uint256 idPolicy;
        string policyName;
        string policyDesc;
        uint256 votes;
        uint256 uniqueVotes;
        bool completed;
        bool passed;
    }

    struct voter {
        uint256 voteCredits;
        uint256 stagedVote;
        uint256[] votedList;
    }

    struct rounds {
        policy[] votingPolicies;
    }

    mapping(address => voter) mapVoter;
    mapping(uint256 => address) mapVoterIndex;

    uint256 public indexVoter = 0;

    policy[] public policyList;
    uint256 public indexPolicy = 0;

    rounds[] roundsList;
    uint256 public currRound = 0;

    constructor() {
        owner = msg.sender;
    }

    event announceWinner(uint256 winner, string name);
    event announceDraw(string message);

    modifier roleOwner() {
        require(isOwner(), "Not owner!");
        _;
    }

    function isOwner() private view returns (bool) {
        return owner == msg.sender;
    }

    function policy_create(
        string calldata _policyName,
        string calldata _policyDesc
    ) private roleOwner {
        policyList.push(
            policy(indexPolicy, _policyName, _policyDesc, 0, 0, false, false)
        );

        indexPolicy++;
    }

    function voter_onboard() private {
        voter memory _voter;
        uint256[] memory emptyList;

        _voter = voter(credits, 0, emptyList);
        mapVoter[msg.sender] = _voter;
        mapVoterIndex[indexVoter] = msg.sender;

        indexVoter++;
    }

    function policy_vote(uint256 _idPolicy, uint256 vote) private {
        require(vote != 0, "Add vote!");
        require(vote <= maxVote, "Max vote is 20!");
        require(mapVoter[msg.sender].voteCredits > vote, "Not enough credits!");

        for (uint256 i = 0; i < (indexPolicy + 1); i++) {
            if (mapVoter[msg.sender].votedList[i] == _idPolicy) {
                revert("Already voted!");
            }
        }

        policyList[_idPolicy].votes += vote;
        policyList[_idPolicy].uniqueVotes++;

        mapVoter[msg.sender].stagedVote += vote;
        mapVoter[msg.sender].votedList.push(_idPolicy);
    }

    function end_vote() private roleOwner {
        uint256 winner = maxRounds;
        uint256 currVote = 0;
        uint256 currUniqueVote = 0;
        uint256 policiesCurrRound = 0;

        uint256 totalVotes = 0;
        uint256 dividendVote = 0;

        bool noWinner = false;

        // find policies in this round
        for (uint256 i = 0; i < (indexPolicy + 1); i++) {
            if (policyList[i].completed == false) {
                policyList[i].completed = true;
                roundsList[currRound].votingPolicies.push(policyList[i]);
                policiesCurrRound++;
            }
        }

        // find winner
        for (uint256 i = 0; i < (policiesCurrRound + 1); i++) {
            totalVotes += roundsList[currRound].votingPolicies[i].votes;

            if (roundsList[currRound].votingPolicies[i].votes > currVote) {
                winner = roundsList[currRound].votingPolicies[i].idPolicy;
                currVote = roundsList[currRound].votingPolicies[i].votes;
                currUniqueVote = roundsList[currRound]
                    .votingPolicies[i]
                    .uniqueVotes;

                noWinner = false;
            } else if (
                roundsList[currRound].votingPolicies[i].votes == currVote
            ) {
                if (
                    roundsList[currRound].votingPolicies[i].uniqueVotes >
                    currUniqueVote
                ) {
                    winner = roundsList[currRound].votingPolicies[i].idPolicy;

                    noWinner = false;
                } else {
                    noWinner = true;
                }
            }
        }

        if (!noWinner) {
            // redistribute votes
            dividendVote = totalVotes / (indexVoter + 1);

            for (uint256 i = 0; i < (indexVoter + 1); i++) {
                mapVoter[mapVoterIndex[i]].voteCredits -= mapVoter[
                    mapVoterIndex[i]
                ].stagedVote;
                mapVoter[mapVoterIndex[i]].voteCredits += dividendVote;

                mapVoter[mapVoterIndex[i]].stagedVote = 0;
            }

            // policy passed
            policyList[winner].passed = true;
            emit announceWinner(winner, policyList[winner].policyName);
        } else {
            //revert votes back
            for (uint256 i = 0; i < (indexVoter + 1); i++) {
                mapVoter[mapVoterIndex[i]].stagedVote = 0;
            }

            emit announceDraw("Draw!");
        }

        // add event emit here

        currRound++;
    }
}
