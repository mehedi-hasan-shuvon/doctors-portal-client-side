import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();


    // update user profile 
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);


    //for navigation after signup or updating
    const navigate = useNavigate();


    let signInErrorMessage;


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);



    if (user || gUser) {
        console.log(user || gUser);
    }


    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log("update done");
        navigate('/appointment');
    }

    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInErrorMessage = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }





    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>


                        {/* name field  */}
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name</span>
                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                            <input
                                type="text" placeholder="Your Name"
                                class="input input-bordered w-full max-w-xs"
                                {...register("name",
                                    {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                            />
                            <label class="label">

                                {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}

                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                        </div>



                        {/* email field */}
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                            <input
                                type="email" placeholder="Your email"
                                class="input input-bordered w-full max-w-xs"
                                {...register("email",
                                    {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid email'
                                        }
                                    })}
                            />
                            <label class="label">

                                {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                        </div>


                        {/* password field  */}
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                class="input input-bordered w-full max-w-xs"
                                {...register("password",
                                    {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                            />
                            <label class="label">

                                {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                {/* <span class="label-text-alt">Alt label</span> */}
                            </label>
                        </div>


                        {signInErrorMessage}
                        <input className='btn w-full max-w-xs text-white' type="submit" value="SIGN UP" />
                    </form>



                    <p><small>Already have an account? <Link className='text-primary' to='/login'>Please login</Link></small> </p>



                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >Continue with Google</button>

                </div>
            </div>
        </div>
    );
};

export default SignUp;