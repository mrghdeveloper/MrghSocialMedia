import React, { useRef, useState } from 'react';
import "./editProfile.css";
import axios from "axios";

export default function EditProfile({ user }) {

    const username = useRef();
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);

    const submitHandler = async (e) => {
        window.localStorage.clear();
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username: username.current.value,
            fullName: fullName.current.value,
            email: email.current.value.toLowerCase(),
            password: password.current.value,
            city: city.current.value,
            from: from.current.value,
            relationship: (relationship.current.value === "Single") ? 1 : (relationship.current.value === "Married") ? 2 : 3
        }
        console.log(username.current.value);
    //Upload CoverPhoto
        if (coverPhotoFile) {
//____________WITHOUT CLOUDINARY___________
            const data = new FormData();
            const fileName = Date.now() + coverPhotoFile.name;
            data.append("name", fileName);
            data.append("file", coverPhotoFile); 
            updatedUser.coverPicture = fileName;
            try {
              await axios.post("/upload", data);
            } catch (err) { }
//____________WITHOUT CLOUDINARY___________
//____________USE CLOUDINARY___________
            // const data = new FormData();
            // data.append("file", coverPhotoFile);
            // data.append("upload_preset", "SocialMediaUploads");
            // try {
            //     const uploadRes = await axios.post(
            //     "https://api.cloudinary.com/v1_1/<YOUR ACCOUNT ID>/image/upload",
            //     data
            //     );
            //     const { url } = uploadRes.data;
            //     updatedUser.coverPicture = url;
            // } catch (err) { }

//____________USE CLOUDINARY___________
        }
    //Upload ProfilePhoto
        if (profilePhotoFile) {
//____________WITHOUT CLOUDINARY___________
            const data = new FormData();
            const fileName = Date.now() + profilePhotoFile.name;
            data.append("name", fileName);
            data.append("file", profilePhotoFile); 
            updatedUser.profilePicture = fileName;
            try {
              await axios.post("/upload", data);
            } catch (err) { }
//____________WITHOUT CLOUDINARY___________
//____________USE CLOUDINARY___________
            // const data = new FormData();
            // data.append("file", profilePhotoFile);
            // data.append("upload_preset", "SocialMediaUploads");
            // try {
            //     const uploadRes = await axios.post(
            //     "https://api.cloudinary.com/v1_1/<YOUR ACCOUNT ID>/image/upload",
            //     data
            //     );
            //     const { url } = uploadRes.data;
            //     updatedUser.profilePicture = url;
            // } catch (err) { }

//____________USE CLOUDINARY___________
        }

        try {
            await axios.put("/users/" + user._id, updatedUser);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }

    };


    return (
        <div className="editProfileContainer">

            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm" onSubmit={submitHandler}>
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input
                                ref={username}
                                type="text"
                                placeholder={user.username}
                                className="userUpdateInput"
                                defaultValue={user.username}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input
                                ref={fullName}
                                type="text"
                                placeholder={user.fullName}
                                className="userUpdateInput"
                                defaultValue={user.fullName}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input
                                ref={email}
                                type="text"
                                placeholder={user.email}
                                className="userUpdateInput"
                                defaultValue={user.email}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Password</label>
                            <input
                                ref={password}
                                required
                                type="Password"
                                placeholder="New Password"
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>City</label>
                            <input
                                ref={city}
                                type="text"
                                placeholder={user.city}
                                className="userUpdateInput"
                                defaultValue={user.city}
                            />
                        </div>

                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateItem">
                            <label>From</label>
                            <input
                                ref={from}
                                type="text"
                                placeholder={user.from}
                                className="userUpdateInput"
                                defaultValue={user.from}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="relationship">Relationship</label>
                            <select ref={relationship} name="relationship" id="relationship" defaultValue={user.relationship}>
                                <option value="Single" >Single</option>
                                <option value="Married" >Married</option>
                                <option value="Other" >Other</option>
                            </select>
                        </div>

                        <div className="userUpdateItem">
                            <label htmlFor="profilePhotoFile">Profile Photo:</label>
                            <input
                                type="file"
                                className="userUpdateInput"
                                id="profilePhotoFile"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setProfilePhotoFile(e.target.files[0])}
                            />
                        </div>

                        <div className="userUpdateItem">
                            <label htmlFor = "coverPhotoFile">Cover Photo:</label>
                            <input
                                type="file"
                                className="userUpdateInput"
                                id="coverPhotoFile"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setCoverPhotoFile(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="userUpdateButton" >Update</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
