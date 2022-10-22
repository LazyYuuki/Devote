// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// optional todo: if only one policy is available, need more than x number unique votes to pass
// optional todo: reuse policies which havent been passed in new round

contract main {
    // can we declare variables which can be set outside of the contract?
    uint8 public constant maxVote = 20;
    uint8 public constant credits = 10;

    uint public constant maxRounds = 9999;
    
    address public owner;

    struct policy {
        uint idPolicy;
        string policyName;
        string policyDesc;
        uint votes;
        uint uniqueVotes;
        bool completed;
        bool passed;
    }

    struct voter {
        uint voteCredits; 
        uint stagedVote;
        uint[] votedList;
    }

    struct rounds {
        policy[] votingPolicies;
    }

    mapping (address => voter) mapVoter;
    mapping (uint => address) mapVoterIndex;

    uint public indexVoter = 0;

    policy[] public policyList;
    uint public indexPolicy = 0;

    rounds[] roundsList;
    uint public currRound = 0;


    constructor() {
        owner = msg.sender;
    }

    event announceWinner(uint winner, string name);
    event announceDraw(string message);

    modifier roleOwner(){
        require(isOwner(), "Not owner!");
        _;
    }

    function isOwner(
    ) private view returns (bool) {
        return owner == msg.sender;
    }



    function policy_create(
        string calldata _policyName, 
        string calldata _policyDesc
    ) private 
    roleOwner {
        policyList.push(policy(indexPolicy, _policyName, _policyDesc, 0, 0, false, false));

        indexPolicy++;
    }

    function voter_onboard(
    ) private {        
        voter memory _voter;
        uint[] memory emptyList;

        _voter = voter(credits, 0, emptyList);
        mapVoter[msg.sender] = _voter;
        mapVoterIndex[indexVoter] = msg.sender;

        indexVoter++;
    }

    function policy_vote(
        uint _idPolicy,
        uint vote
    ) private {
        require(vote != 0, "Add vote!");
        require(vote <= maxVote, "Max vote is 20!");
        require(mapVoter[msg.sender].voteCredits > vote, "Not enough credits!");

        for (uint i = 0; i < (indexPolicy + 1); i++){
            if (mapVoter[msg.sender].votedList[i] == _idPolicy){
                revert("Already voted!");
            }
        }
 
        policyList[_idPolicy].votes += vote;
        policyList[_idPolicy].uniqueVotes++;

        mapVoter[msg.sender].stagedVote += vote;
        mapVoter[msg.sender].votedList.push(_idPolicy);
    }
    
    function end_vote(
    ) private 
    roleOwner {
        uint winner = maxRounds;
        uint currVote = 0;
        uint currUniqueVote = 0;
        uint policiesCurrRound = 0;
        
        uint totalVotes = 0;
        uint dividendVote = 0;

        bool noWinner = false;

        // find policies in this round
        for (uint i = 0; i < (indexPolicy + 1); i++){
            if (policyList[i].completed == false) {
                policyList[i].completed = true;
                roundsList[currRound].votingPolicies.push(policyList[i]);
                policiesCurrRound++;
            }
        }
        
        // find winner
        for (uint i = 0; i < (policiesCurrRound + 1); i++){
            totalVotes += roundsList[currRound].votingPolicies[i].votes;

            if (roundsList[currRound].votingPolicies[i].votes > currVote){
                    winner = roundsList[currRound].votingPolicies[i].idPolicy;
                    currVote = roundsList[currRound].votingPolicies[i].votes;
                    currUniqueVote = roundsList[currRound].votingPolicies[i].uniqueVotes;

                    noWinner = false;
                }
            else if (roundsList[currRound].votingPolicies[i].votes == currVote){
                if (roundsList[currRound].votingPolicies[i].uniqueVotes > currUniqueVote){
                    winner = roundsList[currRound].votingPolicies[i].idPolicy;

                    noWinner = false;
                }
                else {
                    noWinner = true;
                }
            }
        }

        if (!noWinner){
            // redistribute votes
            dividendVote = totalVotes / (indexVoter + 1);

            for (uint i = 0; i < (indexVoter + 1); i++){
                mapVoter[mapVoterIndex[i]].voteCredits -= mapVoter[mapVoterIndex[i]].stagedVote;
                mapVoter[mapVoterIndex[i]].voteCredits += dividendVote;

                mapVoter[mapVoterIndex[i]].stagedVote = 0;
            }

            // policy passed
            policyList[winner].passed = true;
            emit announceWinner(winner, policyList[winner].policyName);
        }
        else {
            //revert votes back
            for (uint i = 0; i < (indexVoter + 1); i++){
                mapVoter[mapVoterIndex[i]].stagedVote = 0;
            }

            emit announceDraw("Draw!");
        }

        // add event emit here

        currRound++;
    }
}