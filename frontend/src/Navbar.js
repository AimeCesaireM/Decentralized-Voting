import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';


const Navbar = ({ connect, connected, becomeMember, isMember }) => {
    return (
        <BootstrapNavbar collapseOnSelect expand="lg" bg="purple" variant='dark' className='me'>
            <Container fluid>
                <BootstrapNavbar.Brand href="/" className="lead fs-2">
                <img src="voting-icon.svg" width="80" height="40" alt = "" className='mx-auto no-border'/>
                Mammoth Rumble</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle />
                <BootstrapNavbar.Collapse>
                    <Nav className="me-auto lead fs-4">
                    <Nav.Link href="/create-vote">Create Poll</Nav.Link>
                        <Nav.Link href="/votes">Elections Board</Nav.Link>

                        {
                            !isMember && (
                                <Button variant='success' onClick={becomeMember}>Join the Election Platform</Button>
                            )
                        }
                    </Nav>
                    <Nav>
                        {!connected? (
                            <Button onClick={connect}>Please Connect to Metamask</Button> ) : 
                            ( <p style = {{color: 'white'}}> Connected to Metamask</p>)
                    }
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
};

export default Navbar;