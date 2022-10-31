import { db, auth } from '../firebase'
import { signOut } from "firebase/auth";
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import * as EmailValidator from 'email-validator'
import { doc, collection, addDoc, where, query } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatWrapper from './ChatWrapper'

function Sidebar() {
	const [user] = useAuthState(auth);
	const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email));
	const [chatsSnapshot] = useCollection(userChatRef);


	const createChat = () => {
		const input = prompt('Please enter an email address for the user you wish to chat with')

		if (!input) return null

		// do some clever database stuff...
		if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
			// we need to add chat into the DB 'chats' collection if it doesn't already exist and is valid
			addDoc(collection(db, 'chats'), {
				users: [ user.email, input ],
			});
		}

	};

	const chatAlreadyExists = (recipientEmail) =>
		!!chatsSnapshot?.docs.find(
			(chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0
		);
	
	return (
		<Container>
			<Header>
				<UserAvatar src={user.photoURL} onClick={() => signOut(auth)} />
				<IconsContainer>
					<IconButton>
						<Chat/>
					</IconButton>

					<IconButton>
						<MoreVert/>
					</IconButton>
				</IconsContainer>
			</Header>

			<Search>
				<SearchOutlined />
				<SearchInput placeholder="Search in chats" />
			</Search>

			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

			{/* List of chats */}
			{chatsSnapshot?.docs.map((chat) => (
				<ChatWrapper key={chat.id} id={chat.id} users={chat.data().users} />
			))}

		</Container>
	)
}

export default Sidebar


const SidebarButton = styled(Button)`
	width: 100%;
	/* &&& increase the priority */
	&&& {
		border-top: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
`;

const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 2px;
`;

const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
	:focus {
		border: none;
		outline: none;
	}
`;

const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid whitesmoke;
	height: 100vh;
	min-width: 300px;
	max-width: 350px;
	overflow-y: scroll;
	
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;

const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;

const IconsContainer = styled.div``;
