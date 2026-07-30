import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

// TODO: O cliente deverá substituir os valores abaixo pelas chaves do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4scX6KYDotbZyomWC6q_X_6o2mjThB3s",
  authDomain: "ggondimtecnologia.firebaseapp.com",
  projectId: "ggondimtecnologia",
  storageBucket: "ggondimtecnologia.firebasestorage.app",
  messagingSenderId: "799713455958",
  appId: "1:799713455958:web:d4ca6af57c2b7ab25bb0f7"
};

// Initialize Firebase only if the user has replaced the API key
let app;
let db;

try {
  if (firebaseConfig.apiKey !== "COLE_SUA_API_KEY_AQUI") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("⚠️ Firebase não configurado. As chaves (API Keys) ainda não foram adicionadas em src/firebase.js");
  }
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
}

// Function to track clicks
export async function trackClick(buttonName, sourcePage) {
  if (!db) {
    console.log(`Simulando rastreamento (Firebase inativo): Clique no botão "${buttonName}" da página "${sourcePage}"`);
    return;
  }
  
  try {
    await addDoc(collection(db, "clicks"), {
      buttonName: buttonName,
      sourcePage: sourcePage,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent
    });
    console.log("Clique registrado no Firebase com sucesso!");
  } catch (e) {
    console.error("Erro ao gravar clique:", e);
  }
}

// Function to get all clicks for reports
export async function getClicksData() {
  if (!db) {
    return [
      { id: 'mock1', buttonName: 'Exemplo Baixar PDV', sourcePage: '/mercadopdv.html', timestamp: new Date(), userAgent: 'Mock' }
    ];
  }
  
  try {
    const q = query(collection(db, "clicks"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const clicks = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clicks.push({
        id: doc.id,
        ...data,
        // Convert Firebase Timestamp to JS Date object safely
        timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
      });
    });
    return clicks;
  } catch (e) {
    console.error("Erro ao ler relatórios:", e);
    return [];
  }
}
