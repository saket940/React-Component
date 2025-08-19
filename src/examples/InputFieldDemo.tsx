import React, { useState } from "react";
import InputField from "../components/InputField";
import "../styles/globals.css";

const InputFieldDemo: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">InputField Demo</h2>

      <InputField
        label="Username"
        placeholder="Enter your username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="This is a helper text"
      />

      <InputField
        label="Email"
        placeholder="Enter your email"
        errorMessage="Invalid email address"
        invalid
      />

      <InputField
        label="Disabled"
        placeholder="You can't type here"
        disabled
      />

      <div>
        <p className="text-sm text-gray-700">
          <strong>Current Value:</strong> {value}
        </p>
      </div>
    </div>
  );
};

export default InputFieldDemo;
