import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  

    const handleLogin = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

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
     

        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res.user);
            if(res.user.emailVerified){
              setSuccess('Login successful'); 
            }else{
              alert('please verify your email')
            }
        })
        .catch(error =>{
            console.log(error);
            setRegisterError(error.message);
        })
    }

    const handleForgot = () => {
      const email = emailRef.current.value;
      if(!email){
        console.log('Please provide email', emailRef.current.value);
        return;
      }
      else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        console.log('Please provide valid email');
        return;
      }
      // reset password with mail
      sendPasswordResetEmail(auth, email)
      .then(() =>{
        alert('check your email');
        return;
      })
      .catch(error => {
        console.log(error);
      })
    }

    return (
        <div>
          <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
             <form onSubmit={handleLogin}>
             <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
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
                  type= {showPassword? "text" : "password"} name="password"
                  placeholder="password"
                  className="input input-bordered" required
                />
                <span className="absolute top-14 right-2 text-lg" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> :
                  <AiFillEye></AiFillEye>
                  }
                </span>
                {/* <br />
                <div>
                  <input type="checkbox" name="terms" id="terms" />
                  <label htmlFor="terms" className="ml-2">Accept our <a href="">terms and conditions</a></label>
                </div> */}
                <label className="label">
                  <a href="#" onClick={handleForgot} className="label-text-alt link link-hover">
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
             <p>New to this website? Please <Link to='/HeroRegister' className="text-blue-600">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Login;