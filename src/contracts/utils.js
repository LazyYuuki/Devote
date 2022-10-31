
// import { ethers } from 'ethers';
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "contracts/config";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export async function getAllPolicy() {
  const policyList = []
  const policyCount = await contract.methods.policyID().call()
  for (let i = 0; i < policyCount; i++) {
    const {
      id,
      title,
      description,
      author,
      link,
      duration,
      voterCount,
      startTime,
      ended,
      result
    } = await contract.methods.policyList(i).call()

    const policy = {
      id,
      title,
      description,
      author,
      link,
      duration,
      voterCount,
      startTime,
      ended,
      result
    }

    policyList.push(policy)
  }
  return policyList
}

export async function createPolicy(
  address,
  title,
  description,
  author,
  link,
  duration
) {
  return await contract.methods.createPolicy(
    title,
    description,
    author,
    link,
    duration
  ).send({ from: address[0] })
    .on("error", error => {
      alert(error)
    })
}

export async function getVoteValue(
  policyID
) {
  return await contract.methods.getVoteValue(policyID).call()
}

export async function vote(
  address,
  policyID,
  option,
  bid
) {
  return await contract.methods.vote(
    policyID,
    option
  ).send({
    from: address[0],
    value: bid
  })
}

export async function endPolicy(
  address,
  policyID
) {
  return await contract.methods.endPolicy(
    policyID
  ).send({
    from: address[0],
  })
}

export async function withdrawBid(
  address,
  policyID,
) {
  return await contract.methods.withdrawBid(
    policyID
  ).send({
    from: address[0]
  })
}