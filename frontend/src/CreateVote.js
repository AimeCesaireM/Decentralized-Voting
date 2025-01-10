import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Footer from "./Footer";

const CreateVote = ({ contract }) => {
  const [uri, setUri] = useState("");
  const [options, setOptions] = useState(2);
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [customOptions, setCustomOptions] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomOptionsChange = (index, value) => {
    const newOptions = [...customOptions];
    newOptions[index] = value;
    setCustomOptions(newOptions);
  };

  const addOptionField = () => {
    setCustomOptions([...customOptions, ""]);
  };

  const createVote = async () => {
    if (!contract) {
      alert(
        "Oops! You are not connected to the blockchain. Please connect to Metamask "
      );
      return;
    }
    setIsLoading(true);

    await contract
      .createVote(uri, new Date(endDate).getTime(), options)
      .then(() => {
        alert("Successfully created a new vote");
      })
      .catch((err) => {
        if (err.code === "INVALID_ARGUMENT") {
          alert(
            "Please check the following and try again: a valid IPFS URI, a valid number of options, and a valid end date"
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const downloadJSON = () => {
    const data = {
      description,
      options: customOptions.filter((option) => option.trim() !== ""),
    };

    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "vote_data.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      {/* JSON Generation Form */}
      <div className="my-5">
        <p className="m-2 text-wrap fs-4 lead">
          First, specify some details of your election and download them as a
          JSON file.
        </p>
        <Form className="m-2">
          <h2 className="d-flex justify-content-center mb-4">
            Generate Vote JSON
          </h2>
          <Form.Group className="m-2">
            <label htmlFor="description" className="fs-5">
              Description
            </label>
            <Form.Control
              type="text"
              id="description"
              placeholder="Enter the description of your election:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-3"
              aria-label="description"
            />
          </Form.Group>

          <Form.Group className="m-2">
            <label htmlFor="customOptions" className="fs-5">
              Options
            </label>
            {customOptions.map((option, index) => (
              <Form.Control
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  handleCustomOptionsChange(index, e.target.value)
                }
                className="mb-3"
                aria-label="Options"
              />
            ))}
            <Button
              variant="secondary"
              onClick={addOptionField}
              className="mt-2"
            >
              Add Option
            </Button>
          </Form.Group>

          <Form.Group className="m-2 mt-4">
            <Button variant="primary" onClick={downloadJSON} className="w-100">
              Download JSON
            </Button>
          </Form.Group>
        </Form>
      </div>

      <p className="m-2 text-wrap fs-4 lead">
        Once you have downloaded the JSON file, upload it to the:{" "}
        <a
          href="https://pinata.cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pinata.cloud
        </a>{" "}
        IPFS server. Then, copy the IPFS URI into the field below and continue
        to create a vote on the blockchain.
      </p>

      {/* Blockchain Interaction Form */}
      <div className="my-5">
        <Form className="m-2">
          <h2 className="d-flex justify-content-center mb-4">
            Create Vote on Blockchain
          </h2>
          <Form.Group className="m-2">
            <label htmlFor="uri" className="fs-5">
              IPFS URI
            </label>
            <Form.Control
              type="text"
              id="uri"
              placeholder="Enter the IPFS URI of your election:"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              className="mb-3"
              aria-label="IPFS URI"
            />
          </Form.Group>

          <Form.Group className="m-2">
            <label htmlFor="options" className="fs-5">
              Number of Options
            </label>
            <Form.Control
              type="number"
              min={1}
              name="options"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group className="m-2">
            <label htmlFor="endDate" className="fs-5">
              End Date
            </label>
            <Form.Control
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group className="m-2 mt-4">
            <Button variant="success" onClick={createVote} className="w-100">
              Create Vote
            </Button>
          </Form.Group>
        </Form>
      </div>
      <p className="m-2 text-wrap fs-4 lead">
        Once you hit "Create Vote", go to your Ethereum wallet extension to
        confirm the transaction. Welcome to Web3 !
      </p>

      <Footer />
    </div>
  );
};

export default CreateVote;
