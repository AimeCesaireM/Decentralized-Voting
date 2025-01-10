import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { ProgressBar } from "react-bootstrap";
import Footer from "./Footer";

const Votes = ({ contract }) => {
  const [votes, setVotes] = useState([]);
  const gateway = "https://gateway.pinata.cloud/";

  useEffect(() => {
    if (!contract) return;

    const filter = contract.filters.VoteCreated();
    contract
      .queryFilter(filter)
      .then((result) => {
        setVotesData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contract]);

  const votePressed = async (id, optionIdx) => {
    await contract
      .vote(id, optionIdx)
      .then(() =>
        alert("Voted! The blockchain will update soon. Refresh your screen.")
      )
      .catch((err) => alert(`Something went wrong: ${err.message}`));
  };

  const setVotesData = async (votes) => {
    const promises = [];
    const newVotes = [];

    for (const vote of votes) {
      const { owner, voteId, createdAt, endTime } = vote.args;
      const promise = contract.getVote(voteId).then(async (voteData) => {
        const uri = voteData[0];
        if (!uri) return;
        const currentVotes = voteData[2];
        const currentVotesNumbers = currentVotes.map((val) => val.toNumber());

        const newVote = {
          id: voteId.toNumber(),
          owner: owner,
          createdAt: createdAt.toNumber(),
          endTime: endTime.toNumber(),
          totalVotes: currentVotesNumbers.reduce((acc, val) => acc + val, 0),
          votes: currentVotesNumbers,
        };

        try {
          await fetch(gateway + uri)
            .then((res) => res.json())
            .then((data) => {
              newVote.description = data.description;
              newVote.options = data.options;
              newVotes.push(newVote);
            });
        } catch {}
      });
      promises.push(promise);
    }
    await Promise.all(promises);
    setVotes(newVotes);
  };

  return (
    <div className="app-container">
      {votes.length === 0 && (
        <h1 className="text-center my-5 text-muted">No elections have been posted yet</h1>
      )}

      {votes.length > 0 &&
        votes.map((vote) => (
          <Card key={vote.id} className="my-4 shadow-lg">
            <Card.Header as="h3" className="text-center bg-primary text-white">
              {vote.description}
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h5>Options</h5>
              </div>
              {vote.options.map((option, index) => (
                <div className="mt-3" key={index}>
                  <p className="fw-bold">{option}: {` `}
                    {(
                      (vote.votes[index] / Math.max(vote.totalVotes, 1)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <ProgressBar
                      now={
                        (vote.votes[index] / Math.max(vote.totalVotes, 1)) * 100
                      }
                      label={`${vote.votes[index]}`}
                      className="w-75 me-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        votePressed(vote.id, index);
                      }}
                      variant="dark"
                    >
                      Vote
                    </Button>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        ))}
      <Footer />
    </div>
  );
};

export default Votes;
