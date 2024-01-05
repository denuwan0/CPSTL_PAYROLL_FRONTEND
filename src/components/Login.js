import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((username, password)) {
      try {
        axios
          .post("http://13.233.230.0/api/User/Authenticate/", {
            userId: username,
            password: password,
          })
          .then((response) => {
            console.log(response.data);
            //console.log(response.data._userDetails);
            // const userData = {
            //   username: response.data._userDetails.epf,
            //   userRole: response.data._userDetails.role,
            //   jwtToken: response.data.jwtToken,
            // };
            sessionStorage.setItem("userData", JSON.stringify(response.data));
            //console.log(userData);
            navigate("/dashboard");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("An error occurred while logging in");
      }
    } else {
      toast.error("Both feilds are required!");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ padding: "20px", backgroundColor: "#c1dcef" }}>
          <Form style={{ width: "300px" }} onSubmit={handleSubmit}>
            <h2 className="mb-4 d-flex justify-content-center align-items-center">
              Login
            </h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Card>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Container>
  );
};

export default LoginPage;
