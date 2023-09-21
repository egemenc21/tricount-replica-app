import { initializeApp } from 'firebase/app'
import {
  User,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  linkWithPopup,
  linkWithCredential,
  EmailAuthProvider, 
} from 'firebase/auth'
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

const firebaseConfig = {
  apiKey: 'AIzaSyCtbJvpuLUGUR0n1OUuAoE5Xe14tYlF7Rw',

  authDomain: 'tricount-replica-app.firebaseapp.com',

  projectId: 'tricount-replica-app',

  storageBucket: 'tricount-replica-app.appspot.com',

  messagingSenderId: '29019903104',

  appId: '1:29019903104:web:9f2fc91f6f4715b07a8265',

  measurementId: 'G-JZMLEQXVV0',
}
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()

getAnalytics(app)

export type ObjectToAdd = {
  id: string
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
export const auth = getAuth(app)

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider)
}

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const linkEmailSignInWithGoogle = (user: User) =>
  linkWithPopup(user, googleProvider)

export const linkGoogleWithEmailSignIn = (
  user: User,
  email: string,
  password: string
) => {
  const credential = EmailAuthProvider.credential(email, password)
  return linkWithCredential(user, credential)
}

export const addCollectionAndDocumentsToUser = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T,
  userId: string
): Promise<void> => {
  const userCollectionRef = collection(db, 'users', userId, collectionKey)

  const batch = writeBatch(db)

  const newDocRef = doc(userCollectionRef, objectToAdd.id)
  batch.set(newDocRef, objectToAdd)

  await batch.commit()
  console.log('done')
}
export const addExpenseToCollection = async <T extends Expense>(
  collectionKey: string,
  objectToAdd: T,
  userId: string,
  triCountId: string
): Promise<void> => {
  const triCountsCollectionRef = collection(db, 'users', userId, collectionKey)
  const triCountDocRef = doc(triCountsCollectionRef, triCountId)

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
  triCountId: string
): Promise<void> => {
  const triCountsCollectionRef = collection(db, 'users', userId, collectionKey)
  const triCountDocRef = doc(triCountsCollectionRef, triCountId)

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

export const updateExpenseInCollection = async (
  userId: string,
  triCountId: string,
  expenseId: string,
  updatedExpenseData: Partial<Expense>
): Promise<void> => {
  const triCountsCollectionRef = collection(db, 'users', userId, 'tricounts')
  const triCountDocRef = doc(triCountsCollectionRef, triCountId)

  try {
    const triCountDocSnapshot = await getDoc(triCountDocRef)
    if (triCountDocSnapshot.exists()) {
      const expenses = triCountDocSnapshot.data()?.expenses || []

      const expenseIndex = expenses.findIndex(
        (expense: Expense) => expense.id === expenseId
      )

      if (expenseIndex !== -1) {
        const updatedExpense = {
          ...expenses[expenseIndex],
          ...updatedExpenseData,
        }

        expenses[expenseIndex] = updatedExpense

        await updateDoc(triCountDocRef, { expenses })
        console.log('Expense updated successfully')
      } else {
        console.error('Expense not found in the document')
      }
    } else {
      console.error('TriCount document not found')
    }
  } catch (error) {
    console.error('Error updating expense: ', error)
  }
}

export const removeTriCountFromCollection = async (
  collectionKey: string,
  userId: string,
  triCountId: string
): Promise<void> => {
  const documentRef = doc(db, 'users', userId, collectionKey, triCountId)

  try {
    await deleteDoc(documentRef)
    console.log('Document removed successfully')
  } catch (error) {
    console.error('Error removing expense: ', error)
  }
}

export const createUserDocumentFromAuth = async (
  userAuth: User,  
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { email,displayName } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
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
