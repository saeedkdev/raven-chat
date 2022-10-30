import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { doc, collection, addDoc, getDoc, getDocs, where, query, orderBy } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecepientName from '../../utils/getRecepientName';

function Chat({ chat, messages }) {
	const [user] = useAuthState(auth);
	
	return <Container>
		<Head>
			<title>Conversation</title>
			<link rel="icon" href="/raven.png" />
		</Head>
		<Sidebar />
		<ChatContainer>
			<ChatScreen chat={chat} messages={messages}/>
		</ChatContainer>
	</Container>;
}

export default Chat;

export async function getServerSideProps(context) {
	// use condext to make ref
	const ref = doc(db, 'chats', context.query.id);
	// prep messages on the server orderBy timestamp
	const messagesRes = await getDocs(query(collection(db, 'messages'), orderBy('timestamp', 'asc')));

	const messages = messagesRes.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})).map((messages) => ({
		...messages,
		timestamp: messages.timestamp.toDate().getTime(),
	}));


	// PREP
	const chatRes = await getDoc(ref);
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	};


	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat,
		},
	};
};

const Container = styled.div`
	display: flex;
`;

const ChatContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;

	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;
