// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// optional todo: if only one policy is available, need more than x number unique votes to pass
// optional todo: reuse policies which havent been passed in new round

contract main {
    struct Policy {
        uint256 id;
        string name;
        string description;
        uint256 duration;
        uint256 voterCount;
        uint256 startTime;
        bool ended;
        string result;
        mapping(address => uint256) voterList;
    }

    struct Vote {
        uint256 positive;
        uint256 negative;
    }

    Policy[] public policyList;
    uint256 public policyID;
    mapping(uint256 => Vote) voteCount;
    mapping(address => bool) bidClaimed;

    function createPolicy(
        string calldata _name,
        string calldata _description,
        uint256 _duration
    ) public {
        require(_duration > 100, "Your duration is too short");
        Policy storage _policy = policyList.push();
        _policy.id = policyID;
        _policy.name = _name;
        _policy.description = _description;
        _policy.duration = _duration;
        _policy.voterCount = 0;
        _policy.startTime = block.timestamp;
        _policy.ended = false;

        policyID++;
    }

    function vote(uint256 _policyID, uint256 option) public payable {
        Policy storage _policy = policyList[_policyID];
        // Check for whether Policy has ended
        require(!_policy.ended, "Policy voting duration has ended");
        require(
            block.timestamp - _policy.startTime <= _policy.duration,
            "Policy voting duration has ended"
        );
        require(
            option >= 0,
            "Option out of range. 0 for negative, 1 for positive"
        );
        require(
            option <= 1,
            "Option out of range. 0 for negative, 1 for positive"
        );

        uint256 value = _policy.voterList[msg.sender];
        require(msg.value > value, "You can only enter a higher bid");

        if (value == 0) {
            _policy.voterCount += 1;
        }

        _policy.voterList[msg.sender] = msg.value;

        uint256 valueDiff = msg.value - value;
        Vote storage count = voteCount[_policyID];

        if (option == 0) {
            count.negative += valueDiff;
        } else if (option == 1) {
            count.positive += valueDiff;
        }

        if (!payable(msg.sender).send(valueDiff)) {
            _policy.voterList[msg.sender] = value;
            if (option == 0) {
                count.negative -= valueDiff;
            } else if (option == 1) {
                count.positive -= valueDiff;
            }
        }
    }

    function getVoteValue(uint256 _policyID)
        public
        view
        returns (uint256 count)
    {
        return policyList[_policyID].voterList[msg.sender];
    }

    function endPolicy(uint256 _policyID) public {
        Policy storage _policy = policyList[_policyID];
        require(
            block.timestamp - _policy.startTime > _policy.duration,
            "Policy duration has not ended yet."
        );
        require(!_policy.ended, "Policy has ended");

        uint256 posVote = voteCount[_policyID].positive;
        uint256 negVote = voteCount[_policyID].negative;

        if (posVote > negVote) {
            _policy.result = "Policy successfully passed.";
        } else if (posVote < negVote) {
            _policy.result = "Policy failed to gather enough vote.";
        } else {
            _policy.result = "Undecided result.";
        }
    }

    function withdrawBid(uint256 _policyID) public {
        Policy storage _policy = policyList[_policyID];
        require(_policy.ended, "Policy has not ended yet.");

        uint256 withdrawAmount = (voteCount[_policyID].positive +
            voteCount[_policyID].negative) / _policy.voterCount;
        uint256 amount = _policy.voterList[msg.sender];

        if (amount > 0) {
            if (!bidClaimed[msg.sender]) {
                bidClaimed[msg.sender] = true;
                if (!payable(msg.sender).send(withdrawAmount)) {
                    bidClaimed[msg.sender] = false;
                }
            }
        }
    }
}
