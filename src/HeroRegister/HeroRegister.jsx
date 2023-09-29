import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);    

        // clear error and success
        setRegisterError('');  
        setSuccess(''); 

        if(password.length < 6){
            setRegisterError('password should be at least 6 character or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('password should have al least one uppercase character');
            return;
        }
        else if(!accepted){
            setRegisterError('please accept our terms and conditions!');
            return;
        }
                 
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setSuccess('Registered successful');
            // update profile
            updateProfile(result.user, {
              displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() => console.log('profile updated'))
            .catch()
            // 
            sendEmailVerification(result.user)
            .then(() =>{
              alert('please check your email to verify your email')
            })        
        })
        .catch(error => {
            console.error(error);
            setRegisterError(error.message);
        })
    }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
             <form onSubmit={handleRegister}>
             <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text" name="name"
                  placeholder="Your Name"
                  className="input input-bordered" required
                />
              </div>
             <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email" name="email"
                  placeholder="email"
                  className="input input-bordered" required
                />
              </div>
               <div className="">
               <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword? "text" : "password"} name="password"
                  placeholder="password"
                  className="input input-bordered" required
                />
                <span className="absolute top-14 right-2 text-lg" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> :
                  <AiFillEye></AiFillEye>
                  }
                </span>
                <br />
                <div>
                  <input type="checkbox" name="terms" id="terms" />
                  <label htmlFor="terms" className="ml-2">Accept our <a href="">terms and conditions</a></label>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
               </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
             </form>
             {
               registerError && <p className="text-red-400">{registerError}</p>
             }
             {
               success && <p className="text-green-400">{success}</p>
             }
             <p>Already have an account? Please <Link to='/login' className="text-blue-600">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
