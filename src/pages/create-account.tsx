import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { login, loginVariables } from "../__generated__/login";
import { LS_TOKEN } from "../constants";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, handleSubmit, getValues, errors, formState } = useForm<
    ICreateAccountForm
  >({ mode: "onChange",
    defaultValues:{
        role: UserRole.Listener,
    } });
   
    const history = useHistory()
    const onCompleted = (data: createAccountMutation) => {
            const {createAccount:{ok, error}} = data;
          
            if(ok){
                history.push("/")
                isLoggedInVar(true);
            }
    }

    const [createAccountMutation, { data: createAccountMutationResults, loading }] = useMutation<
        createAccountMutation,
        createAccountMutationVariables
    >(CREATE_ACCOUNT_MUTATION,{onCompleted});
    const onSubmit = () => {
        if(!loading){
            const {email, password, role} = getValues();
            createAccountMutation({
                variables:{
                    createAccountInput: {email, password, role},
                }
            })
        }
    };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Helmet>
        <title>Create Account | Podcast</title>
      </Helmet>
      <h2 className="text-3xl mb-9">Let's get started</h2>
      <form
        className="grid gap-3 w-full max-w-xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border border-gray-300 focus:outline-none px-5 py-3 focus:border-gray-500 transition-colors duration-500"
          ref={register({
            required: "Email is required",
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        {errors.email?.message && <FormError error={errors.email?.message} />}
        {errors.email?.type === "pattern" && (
          <FormError error="Please enter a valid email" />
        )}
        <input
          className="border border-gray-300 focus:outline-none px-5 py-3 focus:border-gray-500 transition-colors duration-500"
          ref={register({
            required: "Password is required"
          })}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {errors.password?.message && (
          <FormError error={errors.password?.message} />
        )}
        <select name="role" ref={register({required:true})}>
          {Object.keys(UserRole).map(role=><option key={role}>{role}</option>)}
        </select>
        <Button isValid={formState.isValid} loading={loading} text="Create Account" />
        {createAccountMutationResults?.createAccount.error && (
            <FormError error={createAccountMutationResults.createAccount.error}/>
        )}
      </form>
      <div>
        Already have an account? <Link to="/" className="text-lime-600 hover:underline">Log in now</Link>
      </div>
    </div>
  );
};
