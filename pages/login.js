import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
	const signIn = () => {
		// do sign in with popup
		signInWithPopup(auth, provider).catch(alert);
		
	};
	return (
	  <Container>
		<Head>
			<title>Login</title>
			<link rel="icon" href="/raven.png" />
		</Head>

		<LoginContainer>
			<Logo 
				src="raven.png"
			/>
			<Button onClick={signIn} variant="outlined">Sign in with Work Email</Button>
		</LoginContainer>
	  </Container>
	);
}

export default Login;

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100px;
	background-color: white;
	border-radius: 5px;
	box-shadow: -7px -5px 46px 12px rgba(0,0,0,0.11);
`;

const Logo = styled.img`
	width: 200px;
	height: 200px;
	margin-bottom: 50px;
`;
