import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Register = () => {

    const handleForm = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error =>{
            console.error(error);
        })
    }

    return (
        <div className="w-2/3 mx-auto">
            <h2 className="text-3xl py-2 px-2">Please Register</h2>
            <div className="text-black bg-gray-200 p-4">
                <form onSubmit={handleForm} className="w-2/3 mx-auto">
                    <input className="w-full mb-4 py-2 px-2" type="email" placeholder="Email Address" name="email" />
                    <br />
                    <input className="w-full mb-4 py-2 px-2" type="password" name="password" placeholder="Password" id="" />
                    <br />
                    <input className="btn btn-secondary w-full" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;