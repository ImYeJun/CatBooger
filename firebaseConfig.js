import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

import { 
  REACT_APP_API_KEY, 
  REACT_APP_AUTH_DOMAIN,  
  REACT_APP_DATABASE_URL, 
  REACT_APP_PROJECT_ID, 
  REACT_APP_STORAGE_BUCKET, 
  REACT_APP_MESSAGING_SENDER_ID, 
  REACT_APP_APP_ID, 
  REACT_APP_MEASUREMENT_ID
} from '@env';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";

// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyC-eIqRyTdjLxktH_K9LizWALQOIEoc5XQ",
//   authDomain: "petproject-34206.firebaseapp.com",
//   databaseURL: "https://petproject-34206-default-rtdb.firebaseio.com",
//   projectId: "petproject-34206",
//   storageBucket: "petproject-34206.appspot.com",
//   messagingSenderId: "18413965445",
//   appId: "1:18413965445:web:b7b01b374c6d07430619ec",
//   measurementId: "G-71GKE15W6M",
// };

console.log()

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY, 
  authDomain: REACT_APP_AUTH_DOMAIN, 
  databaseURL: REACT_APP_DATABASE_URL, 
  projectId: REACT_APP_PROJECT_ID, 
  storageBucket: REACT_APP_STORAGE_BUCKET, 
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID, 
  appId: REACT_APP_APP_ID, 
  measurementId: REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);

// export { database };
