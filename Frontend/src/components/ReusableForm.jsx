import React, { useState } from "react";
import axios from "axios";
const ReusableForm = ({
    url,
    action,
    data = {},
    fields = [],
    onSuccess,
    buttonLabel = "Submit",
  }) => {
    const [formData, setFormData] = useState(data);
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
  
      try {
        const response = await axios.patch(url, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log(`${action} successful`, response.data);
          onSuccess(response.data);
        }
      } catch (error) {
        console.error(`${action} failed`, error.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={field.name} className="font-bold">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                rows={field.rows || 4}
                className="p-2 border rounded-md"
                readOnly={field.readOnly || false} // Add readOnly support
              />
            ) : field.type === "file" ? (
              <input
                id={field.name}
                name={field.name}
                type="file"
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
            ) : field.type === "radio" ? (
              field.options.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleChange}
                  />
                  {option.label}
                </label>
              ))
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="p-2 border rounded-md"
                readOnly={field.readOnly || false} // Add readOnly support
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {buttonLabel}
        </button>
      </form>
    );
  };
  
  export default ReusableForm;
  
