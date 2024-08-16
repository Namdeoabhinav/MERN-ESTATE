import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileper, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(fileper);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    //creating the storage using firebase.
    const storage = getStorage(app); // app that we created while using firebase.
    const fileName = new Date().getTime() + file.name; //Setting the file name.
    const storageref = ref(storage, fileName); //Creating the storage reference.
    const uploadTask = uploadBytesResumable(storageref, file); //method for uploading the file.

    {
      /* This will allow us to get the file upload percentage ans progress*/
    }
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setFilePer(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      //Now we are allowing user to make changes to their profile including the image through below lines of code
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        {/* creating the image upload functionality */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="images/*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar ||  currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error in Image Upload (image must be less than 2mb)</span>
          ) : fileper > 0 && fileper < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileper}`} </span>
          ) : fileper === 100 ? (
            <span className="text-green-700">
              {" "}
              Image successfully uploaded{" "}
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
