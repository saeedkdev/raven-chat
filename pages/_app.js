import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase'
import { useEffect } from 'react'

import Login from '../pages/login'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			const userRef = doc(db, "users", user.uid);
			setDoc(userRef, {
				email: user.email,
				lastSeen: Date.now(),
				photoURL: user.photoURL,
				displayName: user.displayName,
			}, { merge: true });
		}
	}, [user]);
	
	if(loading) {
		return <Loading />
	}

	if(!user) {
		return <Login />
	}

	

	return <Component {...pageProps} />
}

export default MyApp
