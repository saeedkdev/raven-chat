import styled from 'styled-components';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { Avatar, IconButton, Button } from "@material-ui/core";
// import attach icon and more icon
import { AttachFile, MoreVert, InsertEmoticon } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, collection, addDoc, where, query, orderBy, setDoc, serverTimestamp } from "firebase/firestore";
import Message from "./Message";
import getRecepientEmail from "../utils/getRecepientEmail";
import moment from "moment";

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const endOfMessagesRef = useRef(null);
	const [input, setInput] = useState("");
	const [messagesSnapshot] = useCollection(
		query(collection(db, "chats", router.query.id, "messages"), orderBy("timestamp", "asc"))
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => (
				<Message key={message.id} user={message.data().user} 
				message={{
					...message.data(),
					timestamp: message.data().timestamp?.toDate().getTime(),
				}} />
			));
		} else {
			return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();
		// update last seen of logged in user
		// send message to the chat collection
		addDoc(collection(db, "chats", router.query.id, "messages"), {
			timestamp: serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL,
		});

		setDoc(doc(db, "users", user.uid), {
			lastSeen: serverTimestamp(),
		}, { merge: true });

		setInput("");
		scrollToBottom();
	};

	const scrollToBottom = () => {
		endOfMessagesRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	// recipient name is displayName of the user who we are chatting with
	const [recipientSnapshot] = useCollection(
		query(collection(db, "users"), where("email", "==", getRecepientEmail(chat.users, user)))
	);
	const recepient = recipientSnapshot?.docs?.[0]?.data();

	const recepientEmail = getRecepientEmail(chat.users, user);

	const recepientAvatar = recepient?.photoURL;

	const recepientName = recepient?.displayName;
	
	// ago format using moment
	const recepientLastSeen = recepient?.lastSeen;
	const lastSeen = recepientLastSeen ? moment(recepientLastSeen).fromNow() : "";
	

	return (
		<Container>
			<Header>
				{ recepient ? (
					<Avatar src={recepientAvatar} />
				) : (
					<Avatar>{recepientEmail[0]}</Avatar>
				)}
				<HeaderInformation>
					<h3>{recepientName}</h3>
					<p>{lastSeen}</p>
				</HeaderInformation>
				<HeaderIcons>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</HeaderIcons>
			</Header>
			<MessageContainer>
				{/* show messages */}
				{showMessages()}
				<EndOfMessage ref={endOfMessagesRef} />
			</MessageContainer>
		
			<InputContainer>
				<InsertEmoticon />
				<Input value={input} onChange={e => setInput(e.target.value)}/>
				<button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
			</InputContainer>
		</Container>
	)
}

export default ChatScreen;

const Container = styled.div`
	
`;

const Input = styled.input`
	flex: 1;
	outline: 0;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;

const Header = styled.div`
	position: sticky;
	background-color: white;
	z-index: 100;
	top: 0;
	display: flex;
	padding: 11px;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
	margin-left: 15px;
	flex: 1;
	h3 {
		margin-bottom: 3px;
	}
	p {
		font-size: 14px;
		margin-top:-2px;
		color: gray;
	}
`;

const MessageContainer = styled.div`
	padding: 30px;
	background-color: #f0f0f0;
	min-height: 90vh;
`;

const EndOfMessage = styled.div`
	margin-bottom: 50px;
`;

const HeaderIcons = styled.div`
`;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`;
