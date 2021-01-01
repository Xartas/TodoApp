const signInForm = document.querySelector('#sign-in-form');
const signedInContent = document.querySelector('#signed-in-content');

const showSignedInContent = () => {
    signInForm.style.display = 'none';
    signedInContent.style.display = 'block';
};

const showSignInForm = () => {
    signInForm.style.display = 'block';
    signedInContent.style.display = 'none';
};

const handleAuthChanged = (user) => {
    if (user){
        showSignedInContent();
    } else {
        showSignInForm();
    }
};

const showError = (error) =>{
    const errorBox = document.querySelector('#error-box');

    errorBox.innerHTML = error;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';       
    }, 5000)
};

const getUserEmailAndPassword =() => ({
    email: document.querySelector('#email').Value,
    password: document.querySelector('#passwrord').value,
});

const createUserAccount = () => {
    const { email, password } = getUserEmailAndPassword();

    firebase.auth().createUserWithEmailAndPassword(email, password);
};

const handleErrorSignIn = (error) =>{
    switch (error.code){
        case 'auth/user=not=found':
            createUserAccount();
            break;
        case 'auth/wrong-password':
            showError('Podałeś nieprawidłowe hasło');
            break;
        default:
            showError('Coś poszło nie tak');
    }
};


const handleSubmitSignInForm = (event) =>{
    const{ email, password} = getUserEmailAndPassword();
    firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(handleErrorSignIn);
    
        event.preventDefault();
};

firebase.auth().onAuthStateChanged(handleAuthChanged);
signInForm.addEventListener('submit', handleSubmitSignInForm);