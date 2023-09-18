import { initializeApp } from 'firebase/app'
import { User, getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import {
  QueryDocumentSnapshot,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { Expense, TriCount } from '../../store/tricounts/tricounts.types'
import { stringConverter } from '../format/format.utils'

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

// export const addCollectionAndDocumentsToUser = async <T extends ObjectToAdd>(
//   collectionKey: string,
//   objectToAdd: T[],
//   userId: string // Assuming userId is the user's unique identifier
// ): Promise<void> => {
//   const userCollectionRef = collection(db, 'users', userId, collectionKey)
//   console.log(userCollectionRef)

//   const batch = writeBatch(db)

//   // Now add objects under the user's subcollection
//   objectToAdd.forEach(async (object) => {
//     const newDocRef = doc(
//       userCollectionRef,
//       stringConverter(object.title.toLowerCase())
//     )
//     batch.set(newDocRef, object)
//   })

//   await batch.commit()
//   console.log('done')
// }
export const addCollectionAndDocumentsToUser = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T,
  userId: string // Assuming userId is the user's unique identifier
): Promise<void> => {
  const userCollectionRef = collection(db, 'users', userId, collectionKey)
  console.log(userCollectionRef)

  const batch = writeBatch(db)

  // Now add objects under the user's subcollection

  const newDocRef = doc(
    userCollectionRef,
    stringConverter(objectToAdd.title.toLowerCase())
  )
  batch.set(newDocRef, objectToAdd)

  await batch.commit()
  console.log('done')
}
export const addExpenseToCollection = async <T extends Expense>(
  collectionKey: string,
  objectToAdd: T,
  userId: string,
  triCountName: string
): Promise<void> => {
  const triCountsCollectionRef = collection(db, 'users', userId, collectionKey)
  const triCountDocRef = doc(triCountsCollectionRef, triCountName)

  try {
    // Use updateDoc to add the new object to the existing array
    await updateDoc(triCountDocRef, {
      expenses: arrayUnion(objectToAdd), // Assuming "expenses" is your field
    })

    console.log('Expense added successfully')
  } catch (error) {
    console.error('Error adding expense: ', error)
  }
}

export const removeExpenseFromCollection = async <T extends Expense>(
  collectionKey: string,
  objectToRemove: T,
  userId: string,
  triCountName: string
): Promise<void> => {
  const triCountsCollectionRef = collection(db, 'users', userId, collectionKey)
  const triCountDocRef = doc(triCountsCollectionRef, triCountName)

  try {
    // Use updateDoc to remove the object from the existing array
    await updateDoc(triCountDocRef, {
      expenses: arrayRemove(objectToRemove), // Assuming "expenses" is your field
    })

    console.log('Expense removed successfully')
  } catch (error) {
    console.error('Error removing expense: ', error)
  }
}
export const removeTriCountFromCollection = async (
  collectionKey: string,
  userId: string,
  triCountName: string
): Promise<void> => {
  const documentRef = doc(db, 'users', userId, collectionKey, triCountName)

  try {
    await deleteDoc(documentRef)
    console.log('Document removed successfully')
  } catch (error) {
    console.error('Error removing expense: ', error)
  }
}

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
    } catch (error) {
      console.log('error when creating user', error)
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>
}

export const getCategoriesAndDocuments: (
  userId: string,
  collectionKey: string
) => Promise<TriCount[]> = async (
  userId,
  collectionKey
): Promise<TriCount[]> => {
  const collectionRef = collection(db, 'users', userId, collectionKey)
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as TriCount)
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
