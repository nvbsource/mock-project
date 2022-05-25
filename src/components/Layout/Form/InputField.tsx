import React from "react";

export default function InputField({ icon, ...props }: any) {
  return (
    <div className="form-group">
      {icon}
      <input {...props} />
    </div>
  );
}
