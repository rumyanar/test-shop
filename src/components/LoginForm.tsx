import { useState } from "react";
import { Alert } from "./Alert.tsx";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const disabled = !inputUser || !inputPass || loading;

  const doLogin = (user: string, pass: string) => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (user.toLowerCase() === "admin" && pass === "123456") {
        onSuccess();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md space-y-4">
      {error && <Alert type="alert-error">Invalid username or password</Alert>}
      <div>
        <label className="pt-5">
          <span className="label-text mt-5">Username or email</span>
          <input
            type="text"
            id="username"
            spellCheck={false}
            className="input input-bordered w-full mt-1"
            value={inputUser}
            onChange={(c) => setInputUser(c.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disabled) {
                doLogin(inputUser, inputPass);
              }
            }}
          />
        </label>
      </div>
      <div>
        <label>
          <span className="label-text">Password</span>
          <input
            type="password"
            spellCheck={false}
            className="input input-bordered w-full mt-1"
            value={inputPass}
            onChange={(c) => setInputPass(c.target.value.trim())}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !disabled) {
                doLogin(inputUser, inputPass);
              }
            }}
          />
        </label>
      </div>
      <button
        disabled={disabled}
        className="btn btn-primary btn-block mt-5"
        onClick={() => doLogin(inputUser, inputPass)}
      >
        Submit
      </button>
    </div>
  );
};
