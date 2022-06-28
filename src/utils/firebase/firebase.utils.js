import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc,collection,writeBatch,query,getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDd-4p2uUb3wsWpPkWSiagM1YkjaEjQJ2U",
    authDomain: "crown-shopping-db-5cc38.firebaseapp.com",
    projectId: "crown-shopping-db-5cc38",
    storageBucket: "crown-shopping-db-5cc38.appspot.com",
    messagingSenderId: "415469456771",
    appId: "1:415469456771:web:7c0c1455b0a09be5d57ab6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)


export const db = getFirestore()

//for adding our project data to firebase or firestore
export const addCollectionAndDocuments=async(collectionKey,objectsToAdd)=>{
    const collectionRef=collection(db,collectionKey)
    const batch=writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef=doc(collectionRef,object.title.toLowerCase())
        batch.set(docRef,object)
    })
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories')
    const q = query(collectionRef)
    const querySnapshot= await getDocs(q)

    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items}=docSnapshot.data()
        acc[title.toLowerCase()]=items
        return acc
    },{})

    return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log(`error creating an user ${error.message}`)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword= async(email,password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword= async(email,password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser=async ()=>await signOut(auth)

export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth,callback)