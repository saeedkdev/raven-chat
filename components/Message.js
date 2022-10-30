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
				{message.message}
				<span>
					{message.timestamp ? moment(message.timestamp).format('LT') : '...'}
				</span>
			</TypeOfMessage>
		</Container>
	);
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
	width: fit-content;
	padding: 15px 20px;
	border-radius: 8px;
	margin: 10px;
	background-color: whitesmoke;
	position: relative;
	text-align: right;
`;

const Sender = styled(MessageElement)`
	margin-left: auto;
	background-color: #8bbef0;
	span {
		color: #1f4f80;
		font-size: 9px;
		padding:4px 7px;
		position: absolute;
		bottom: 0;
		text-align: right;
		right: 0px;
	}
`;

const Reciever = styled(MessageElement)`
	text-align: left;
	background-color: whitesmoke;
	span {
		color: gray;
		font-size: 9px;
		padding:4px 15px;
		position: absolute;
		bottom: 0;
		text-align: right;
		right: 0px;
	}
`;

const Timestamp = styled.span`

`;
