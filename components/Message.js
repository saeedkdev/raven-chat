import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
	const [userLoggedIn] = useAuthState(auth);

	const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

	

	return (
		<Container>
			<TypeOfMessage>
				{message.message && message.message.includes("http") ? (
					<MessageImage width={400} src={message.message} />
				) : (
					message.message
				)}

				<span>
					{message.timestamp
						? moment(message.timestamp).format("LT")
						: "..."}
				</span>
			</TypeOfMessage>
		</Container>
	);
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
	width: fit-content;
	max-width: 60%;
	padding: 15px 20px;
	border-radius: 8px;
	margin: 10px;
	background-color: whitesmoke;
	position: relative;
	text-align: right;
`;

const MessageImage = styled.img`
	width: 100%;
	max-width: 400px;
	max-height: 400px;
`;


const Sender = styled(MessageElement)`
	margin-left: auto;
	background-color: #8bbef0;
	border-radius: 10px 0 10px 10px;
	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: -15px;
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-left: 15px solid #8bbef0;
	}
	box-shadow: -23px 3px 36px -11px rgba(0, 0, 0, 0.26);
	span {
		color: gray;
		padding: 10px;
		font-size: 9px;
		position: absolute;
		text-align: left;
		left: -50px;
	}
`;

const Reciever = styled(MessageElement)`
	text-align: left;
	background-color: whitesmoke;
	border-radius: 0 10px 10px 10px;
	box-shadow: 27px -3px 36px -11px rgba(0, 0, 0, 0.26);
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: -15px;
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-right: 15px solid whitesmoke;
	}
	span {
		color: gray;
		padding: 10px;
		font-size: 9px;
		position: absolute;
		text-align: right;
		right: -50px;
	}
`;

const Timestamp = styled.span`
	color: gray;
	padding: 10px;
	font-size: 9px;
	position: absolute;
	text-align: right;
	right: 0;
`;
