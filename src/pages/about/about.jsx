import { useEffect } from "react";
import { useState } from "react";
import "./about.css";
const About = () => {
  const [abouts, setAbouts] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    getAbout();
  }, []);
  const getAbout = async () => {
    let res = await fetch(`${url}/about`);
    if (res.status == 200) {
      const data = await res.json();
      setAbouts(data);
    }
  };
  return (
    <div className="container-fluid bg-light my-5 shadow p-5 about-container">
      <div className="">
        <h1 className="text-center">About Krishbeauty</h1>
      </div>

      {abouts.map((about, index) => (
        <div key={index}>
          <i className="fa-solid fa-quote-left fs-1 text-danger"></i>
          <p>{about.about.slice(0, 1).toUpperCase() + about.about.slice(1)}</p>
          <div style={{ width: "fit-content" }} className="ms-auto">
            <i className="fa-solid fa-quote-right fs-1 text-danger"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
