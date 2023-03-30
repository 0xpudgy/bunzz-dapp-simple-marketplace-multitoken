import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import useBunzz from "../hooks/useBunzz";
import {
  getMultiTokenContract,
  getSimpleMarketplaceContract,
  mint,
  setApprovedForAll,
  list,
  buy,
} from "../contracts/utils";
import { useWeb3React } from "@web3-react/core";

const Main = () => {
  const bunzz = useBunzz();
  const { account } = useWeb3React();
  const multiTokenContract = getMultiTokenContract(bunzz);
  const simpleMarketplaceContract = getSimpleMarketplaceContract(bunzz);
  const [mintTo, setMintTo] = useState("");
  const [mintTokenId, setMintTokenId] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const [mintData, setMintData] = useState("0x0");
  const [approveOperator, setApproveOperator] = useState("0x0");
  const [listTokenId, setListTokenId] = useState(0);
  const [listPrice, setListPrice] = useState(0);
  const [buyTokenId, setBuyTokenId] = useState(0);
  const [buyPaymentAmount, setBuyPaymentAmount] = useState("0");
  const [pendingMint, setPendingMint] = useState(false);
  const [pendingApprove, setPendingApprove] = useState(false);
  const [pendingList, setPendingList] = useState(false);
  const [pendingBuy, setPendingBuy] = useState(false);

  return (
    <Container>
      <Row className="justify-content-center mt-3 text-center">
        <h5>Multi Token</h5>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col lg="4" md="4" xs="12">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input To Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={mintTo}
                onChange={(val) => setMintTo(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token id"
                value={mintTokenId}
                onChange={(val) => setMintTokenId(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter token amount"
                value={mintAmount}
                onChange={(val) => setMintAmount(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Mint Data</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mint data"
                value={mintData}
                onChange={(val) => setMintData(val.target.value)}
              />
            </Form.Group>
            {!pendingMint ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingMint(true);
                  try {
                    const txHash = await mint(
                      multiTokenContract,
                      mintTo,
                      mintTokenId,
                      mintAmount,
                      mintData,
                      account
                    );
                    console.log(txHash);
                    setPendingMint(false);
                  } catch (e) {
                    console.log(e);
                    setPendingList(false);
                  }
                }}
              >
                Mint
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Mint
              </Button>
            )}
          </Form>
          <br></br>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Approval Operator Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={approveOperator}
                onChange={(val) => setApproveOperator(val.target.value)}
              />
            </Form.Group>
            {!pendingApprove ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingApprove(true);
                  try {
                    const txHash = await setApprovedForAll(
                      multiTokenContract,
                      approveOperator,
                      account
                    );
                    console.log(txHash);
                    setPendingApprove(false);
                  } catch (e) {
                    console.log(e);
                    setPendingApprove(false);
                  }
                }}
              >
                Set Approved For All
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Set Approved For All
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5 text-center">
        <h5>Simple Marketplace</h5>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col lg="4" md="4" xs="12">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                value={listTokenId}
                onChange={(val) => setListTokenId(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Price (Wei)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price in Wei"
                value={listPrice}
                onChange={(val) => setListPrice(val.target.value)}
              />
            </Form.Group>
            {!pendingList ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingList(true);
                  try {
                    const txHash = await list(
                      simpleMarketplaceContract,
                      listTokenId,
                      listPrice,
                      account
                    );
                    console.log(txHash);
                    setPendingList(false);
                  } catch (e) {
                    console.log(e);
                    setPendingList(false);
                  }
                }}
              >
                List
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} List
              </Button>
            )}
          </Form>
          <br></br>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Buy Token ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                value={buyTokenId}
                onChange={(val) => setBuyTokenId(val.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Input Payment Amount (Ether)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amount in Ether"
                value={buyPaymentAmount}
                onChange={(val) => setBuyPaymentAmount(val.target.value)}
              />
            </Form.Group>
            {!pendingBuy ? (
              <Button
                variant="dark"
                onClick={async () => {
                  setPendingBuy(true);
                  try {
                    const txHash = await buy(
                      simpleMarketplaceContract,
                      buyTokenId,
                      buyPaymentAmount,
                      account
                    );
                    console.log(txHash);
                    setPendingBuy(false);
                  } catch (e) {
                    console.log(e);
                    setPendingBuy(false);
                  }
                }}
              >
                Buy
              </Button>
            ) : (
              <Button variant="dark">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {` `} Buy
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

export default Main;
