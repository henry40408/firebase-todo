import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBF0mlSYv1eQeKrsu6MEFVNX6ShuKbs86o',
  authDomain: 'fir-todo-e225a.firebaseapp.com',
  databaseURL: 'https://fir-todo-e225a.firebaseio.com',
  storageBucket: 'fir-todo-e225a.appspot.com',
  messagingSenderId: '921798007956',
};

const initializedFirebase = firebase.initializeApp(config);

export default initializedFirebase;
