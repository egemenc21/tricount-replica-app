import { initializeApp } from 'firebase/app'
import { User, getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import {
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import { Group } from '../../store/groups/groups.types'
import { fetchEmptyGroupsData } from '../db/db'

const firebaseConfig = {
  apiKey: 'AIzaSyCtbJvpuLUGUR0n1OUuAoE5Xe14tYlF7Rw',

  authDomain: 'tricount-replica-app.firebaseapp.com',

  projectId: 'tricount-replica-app',

  storageBucket: 'tricount-replica-app.appspot.com',

  messagingSenderId: '29019903104',

  appId: '1:29019903104:web:9f2fc91f6f4715b07a8265',

  measurementId: 'G-JZMLEQXVV0',
}

// Initialize Firebase

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore()

// const analytics =
getAnalytics(app)

export type ObjectToAdd = {
  title: string
}
export interface ObjectToGet {
  userId: string
}
export type UserData = {
  createdAt: Date
  displayName: string
  email: string
}
export type AdditionalInformation = {
  displayName?: string
}

export const addCollectionAndDocumentsToUser = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T[],
  userId: string // Assuming userId is the user's unique identifier
): Promise<void> => {
  const userCollectionRef = collection(db, 'users', userId, collectionKey)
  console.log(userCollectionRef)

  const batch = writeBatch(db)

  // Now add objects under the user's subcollection
  objectToAdd.forEach(async (object) => {
    const newDocRef = doc(userCollectionRef, object.title.toLowerCase())
    batch.set(newDocRef, object)
  })

  await batch.commit()
  console.log('done')
}
// export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
//   collectionKey: string,
//   objectToAdd: T[],
//   userId: string
// ): Promise<void> => {
//   const userCollectionRef = collection(db, collectionKey)
//   const userDocRef = collection(userCollectionRef, userId)
//   const batch = writeBatch(db)
//   const docRef = doc(userDocRef, userId)
//   batch.set(docRef, userId)

//   objectToAdd.forEach((object) => {
//     const docRef = doc(userDocRef, object.title.toLowerCase())
//     batch.set(docRef, object)
//   })
//   await batch.commit()
//   console.log('done')
//   console.log(userId);

// }
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
      const emptyArray = await fetchEmptyGroupsData()
      await addCollectionAndDocumentsToUser('groups', emptyArray, userAuth.uid)
    } catch (error) {
      console.log('error when creating user', error)
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>
}

export const getCategoriesAndDocuments: (
  arg0: string
) => Promise<Group[]> = async (userId): Promise<Group[]> => {
  const collectionRef = collection(db, 'users', userId, 'groups')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Group)
}

// export const getCurrentUser = ():Promise<User | null> => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (userAuth) => {
//         unsubscribe();
//         resolve(userAuth);
//       },
//       reject
//     );
//   });
// };
// export const onAuthStateChangedListener = (callback) =>
//   onAuthStateChanged(auth, callback);
