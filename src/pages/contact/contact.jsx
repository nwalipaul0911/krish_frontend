import { useEffect } from "react";
import "./contact.css";
import { useState } from "react";
import { useAnimation, motion } from "framer-motion";
const Contact = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    let timeout = setTimeout(() => {
      setErrorMessage(null);
      setSuccess(false);
    }, 5000);
    () => {
      clearTimeout(timeout);
    };
  }, [formData]);
  const def = {
    name: "",
    email: "",
    message: "",
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    for (let input of Object.keys(formData)) {
      if (!formData[input]) {
        setErrorMessage(`${input} field required`);
        return false;
      }
      if (input == "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage(`invalid ${input} format`);
        return false;
      }
    }
    setErrorMessage(``);
    return true;
  };
  const submitMessage = async (e) => {
    e.preventDefault();
    let validated = validateForm();
    if (validated) {
      let res = await fetch(`${url}/contact`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      if (res.status == 201) {
        setFormData({ ...def });
        setSuccess(true);
      }
    }
  };
  return (
    <>
      <div className="container py-5 b">
        <div className="row border">
          <div className="col-md-7 p-5 position-relative bg-light">
              


            <div className="contact-text bottom-0">
              <h1 className="">Contact Us</h1>
              <p>
                Feel free to reach out to us for any
                inquiries, suggestions, or assistance you may need – we're here
                to help!
              </p>
              <div className="container-fluid p-0 mt-3 mb-1">
                <div className="row g-0">
                  <div className="col-md-6">
                    <h3>Address</h3>
                    <small>
                      Lzp023 lozinko plaza beside rivers gate tradefair complex
                    </small>
                  </div>
                  <div className="col-md-6">
                    <h3>Contact</h3>
                    <div>
                      <small>09037399585</small>
                    </div>
                    <div>
                      <small>Krishbeauty@gmail.com</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 bg-danger-2">
            <form
              action=""
              className="mx-auto col-10 py-5"
              onSubmit={submitMessage}
            >
              {errorMessage && (
                <motion.p
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  className="ps-3 error-message rounded text-light"
                >
                  {" "}
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {errorMessage}
                </motion.p>
              )}
              {success && (
                <p className="ps-3 success-message rounded text-light">
                  {" "}
                  <i className="fa-solid fa-check"></i> Message sent!
                </p>
              )}
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3 rounded-0"
                placeholder="Name"
                value={formData.name}
                onChange={handleFormData}
              />
              <input
                type="email"
                name="email"
                id="email"
                className="form-control mb-3 rounded-0"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleFormData}
              />

              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                className="form-control rounded-0"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleFormData}
              ></textarea>
              <div className="mt-3 mx-auto">
                <input
                  type="submit"
                  className="btn btn-dark rounded-0 col-12"
                  value="Send message"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container shadow mb-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31715.540487556344!2d3.2338371472776295!3d6.465484035658112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b861ebe55efa3%3A0x332668e3ad8c8be2!2sTrade%20Fair%20Complex%2C%20Lagos!5e0!3m2!1sen!2sng!4v1692149635842!5m2!1sen!2sng"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pt-2 col-12"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
