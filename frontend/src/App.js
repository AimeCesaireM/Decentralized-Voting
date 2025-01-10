import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVote from "./CreateVote";
import Votes from "./Votes";
import Navbar from "./Navbar";
import Home from "./Home";
import { useEffect, useState } from "react";
import { connect, getContract } from "./contract";

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    try {
      window.ethereum.request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            handleInit();
          } else {
            setConnected(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
  


  const handleInit = () => {
    try {
      setConnected(true);
      getContract()
        .then(({ contract, signer }) => {
          setContract(contract);
  
          if (contract) {
            contract
              .members(signer)
              .then((result) => setIsMember(result))
              .catch((err) => console.log("Error fetching members:", err));
          }
        })
        .catch((err) => console.log("Error getting contract:", err));
    } catch (error) {
      console.log("Error in handleInit:", error);
    }
  };
  

  const connectCallback = async () => {
    try {
      const { contract } = await connect();
      setContract(contract);
      if (contract) {
        setConnected(true);
      }
    } catch (error) {
      console.error("Error in connectCallback:", error);
    }
  };
  

  const becomeMember = async () => {
    if (!contract) {
      alert("Please connect to the blockchain through Metamask");
      return;
    }

    await contract
      .join()
      .then(() => {
        alert("Successfully joined the platform");
        setIsMember(true);
      })
      .catch((err) => {
        console.log(err.message);
        alert(
          "Failed to join the platform. Clear your account activity data in Metamask, refresh this page, and try again."
        );
      });
  };

  return (
    <Router>
      <Navbar
        connect={connectCallback}
        becomeMember={becomeMember}
        isMember={isMember}
        connected={connected}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                contract={contract}
                isMember={isMember}
                becomeMember={becomeMember}
              />
            }
          />
          <Route
            path="/create-vote"
            element={<CreateVote contract={contract} />}
          />
          <Route path="/votes" element={<Votes contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
