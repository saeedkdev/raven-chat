import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecepientEmail from "../utils/getRecepientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { doc, collection, addDoc, where, query } from "firebase/firestore";
import { useRouter } from "next/router";

function ChatWrapper({ id, users }) {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const [recipientSnapshot] = useCollection(
		query(collection(db, "users"), where("email", "==", getRecepientEmail(users, user)))
	);
	const recepient = recipientSnapshot?.docs?.[0]?.data();

	const recepientEmail = getRecepientEmail(users, user);

	const recepientAvatar = recepient?.photoURL;

	const recepientName = recepient?.displayName;

	const startChat = () => {
		router.push(`/chat/${id}`);
	};

	console.log(recepientAvatar);

	return (
	  <Container onClick={startChat}>
			{ recepient ? (
				<UserAvatar src={recepientAvatar} />
			) : (
				<UserAvatar>{recepientEmail[0]}</UserAvatar>
			)}
			<p>{recepientName}</p>
	  </Container>
  );
}

export default ChatWrapper;

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	word-break: break-word;
	cursor: pointer;
	:hover {
		background-color: #e9eaeb;
	}
`;

const UserAvatar = styled(Avatar)`
	margin: 5px;
	margin-right: 15px;
`;
