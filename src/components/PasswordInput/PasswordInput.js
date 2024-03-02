import React, { useState } from 'react';

function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
        <div className="password-name-div-value">
        <input
            type={showPassword ? 'text' : 'password'}
            className="current-pass"
            value={password}
            onChange={handlePasswordChange}
        />
        </div>
        <label htmlFor="showPassword">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={handleCheckboxChange}
        />
        Show Password
      </label>
    </div>
  );
}

export default PasswordInput;
