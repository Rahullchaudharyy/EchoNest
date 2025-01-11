import { useState } from "react";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import axiosInstence from "../utils/axiosInstance";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }
    return newErrors;
  };
//   /api/feedback/send
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    const send = await axiosInstence.post('/api/feedback/send',formData)

    if (send.statusText == 'OK') {
        
    }

    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center shadow-xl border justify-center">
      <div className="w-full max-w-md bg-card rounded-lg shadow-sm p-8">
        <h2 className="text-heading font-heading text-foreground mb-6 flex items-center gap-2">
          <FiMessageSquare className="text-primary" />
          Feedback Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-body font-body text-foreground mb-2" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
              <input
              required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.name ? "border-destructive" : "border-input"} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-500 text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-body font-body text-foreground mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
              <input
              required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.email ? "border-destructive " : "border-input"} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="mt-1 text-red-500 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-body font-body text-foreground mb-2" htmlFor="message">
              Message
            </label>
            <textarea
            required
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border ${errors.message ? "border-destructive" : "border-input"} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
              placeholder="Write your feedback here..."
              maxLength="500"
            />
            <div className="flex justify-between mt-1">
              {errors.message && <p className="text-sm text-red-500 text-destructive">{errors.message}</p>}
              <span className="text-sm text-accent">{formData.message.length}/500</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-center gap-2 transition-colors"
          >
            <FiSend />
            Submit Feedback
          </button>
        </form>

        {showSuccess && (
          <div className="fixed top-4 bg-gray-500 right-4 bg-card shadow-sm rounded-lg p-4 flex items-center gap-2 text-primary animate-fade-in">
            <IoCheckmarkCircle className="text-xl" />
            <span>Feedback submitted successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
