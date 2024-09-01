import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.loge(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);
  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            onChange={onChange}
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Enter Your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 w-full p-3 rounded-lg text-center uppercase text-white hover:opacity-95">
          Send Message
          </Link>

        </div>
      )}
    </>
  );
}
