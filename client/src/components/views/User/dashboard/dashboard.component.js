import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import UserContext from "../../../../contexts/UserContext";

import { ReactComponent as Logo } from "../../../../assets/clear-logo-lg.svg";

import SideNav from "../../../navigation/side-nav/side-nav.component";
import UploadsList from "../../../elements/uploads-list/uploads-list.component";
// import UploadForm from "../../../elements/UploadForm";

import "./dashboard.styles.css";
import UploadForm from "../../../elements/upload-form/upload-form.component";

const Dashboard = () => {
  const BASE_API_URL = "http://localhost:4000/uploads";
  // const BASE_API_URL = 'https://clear-server.herokuapp.com/uploads';
  const [uploads, setUploads] = useState([]);
  const { userData } = useContext(UserContext);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const getAllUploads = () => {
      axios
        .get(`${BASE_API_URL}/all`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          const allUploads = response.data;
          setUploads(allUploads);
        })
        .catch((error) => console.error(`Error: ${error}`));
    };
    getAllUploads();
  }, []);

  return (
    <>
      <SideNav />
      <main className="dashboard-container">
        <header className="dashboard-header">
          <Logo />
          <div className="user-info">
            <div className="user-avatar"></div>
            <strong className="user-name">
              {userData.user && userData.user.displayName}
            </strong>
          </div>
        </header>
        <section className="dashboard-main-content">
          <h1 className="dashboard-heading">Library</h1>
          <UploadsList uploads={uploads && uploads} />
        </section>
        <UploadForm />
      </main>
    </>
  );
};

export default Dashboard;
