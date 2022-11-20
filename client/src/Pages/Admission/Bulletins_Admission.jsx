import React, { useContext, useEffect, useRef, useState } from "react";
import Admission_side from "../../Components/Sidebar/Admission_side.";
import Bulletin from "../../Dummy_data/pdfs/Admission/UGCF_2022.pdf";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Context/AuthProvider";
import Dropzone from "react-dropzone";
import axios from "axios";
import Maintanence from "../../Components/UnderMaintanence/Maintanence";

const Bulletins_Admission = () => {
  const [data1, setData1] = useState();
  const userRef = useRef();
  const errRef = useRef();
  const dropRef = useRef();
  const [link, setLink] = useState("");
  const [caption, setCaption] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const [file, setFile] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);

  const fetchdata = async () => {
    const response = await fetch("/bulletin");
    setData1(await response.json());
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|)$/));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const del = async (id) => {
    console.log(id);
    const response = await fetch(
      `/delete_admissionbulletin/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data || response.status === 200) {
      fetchdata();
    } else {
      setErrMsg("Unable to Delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (link.trim() !== "" && caption.trim() !== "") {
        // if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("link", link);
        formData.append("title", caption);

        setErrMsg("");
        console.log(formData);
        await axios.post(`/bulletin_add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setCaption("");
        setLink("");
        setFile("");
        setIsPreviewAvailable(false);
        setPreviewSrc("");
        setAuth(true);
        fetchdata();
      } else {
        // setErrMsg("Please select a file to add.");
        setErrMsg("Please enter all the field values.");
      }
      // } else {
      // }
    } catch (err) {
      err.response && setErrMsg(err.response.data);
    }
  };

  return (
    <div className=" flex flex-col">
      <div
        className="Banner"
        style={{ backgroundImage: "url(/images/img1.jpeg)" }}
      >
        <div className="name">
          <div className="flex flex-row justify-center">
            <p className="  text-[#fff] text-3xl md:text-4xl lg:text-6xl shadow-lg  mt-12 font-bold  p-5 flex justify-center w-full rounded-md  ">
              Admission Bulletins
            </p>
          </div>
          <div className=" bg-gray-400 pt-3 pb-3 pl-5 text-lg text-[#000080] mt-28 ">
            <Link to={"/"}>
              <span className="ml-5">Home</span>
            </Link>
            <span className="ml-5">Admission</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="md:w-[350px]">
          <Admission_side />
        </div>

        <div className="w-full ml-5">
          <h2 className=" text-3xl md:text-4xl uppercase font-bold mb-5 mt-[5%] flex flex-row justify-center items-center   ">
            Admission Bulletin
          </h2>
          {data1 ? "" : <Maintanence />}
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  w-full mt-5 mb-5">
            {data1
              ? data1.map((curElem) => {
                  const { _id, title, file_path, link } = curElem;
                  var path_pic = file_path;
                  var path2 = path_pic.replace(/\\/g, "/");
                  var path = path2.slice(19);
                  return (
                    <>
                      <div class="card2 ml-2 mb-10 " key={_id}>
                        <span className="  font-bold text-xl ml-2">{link}</span>
                        <div className="flex flex-col ml-4 w-full">
                          <div class="info2 ml-4 w-full">
                            <p className="text-justify">{title}</p>
                            <br />
                            <a href={path} className="">
                              <button className="w-[100%]">View</button>
                            </a>
                            {auth && (
                              <>
                                <div className="flex flex-col mt-2 w-full">
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size="lg"
                                    className=" cursor-pointer ml-auto  hover:text-red-500"
                                    onClick={() => del(_id)}
                                  ></FontAwesomeIcon>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
          {auth && (
            <>
              <form
                method="post"
                className="flex flex-col justify-center content-center max-w-sm mt-5  ml-auto mr-auto mb-16"
              >
                <h2 className="text-xl uppercase font-bold ml-10 mb-4 mt-[0] mr-auto flex flex-row justify-center items-center text-red-500">
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
                    {errMsg}
                  </p>
                </h2>
                <div className="mb-3">
                  <input
                    type="text"
                    name="Link"
                    // id=""
                    ref={userRef}
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    placeholder="Enter Text Here"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded md:w-full w-[70%] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#000080]"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="Caption"
                    // id=""
                    cols="10"
                    rows="5"
                    ref={userRef}
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded md:w-full w-[70%] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#000080]"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div class="md:flex flex-col h-full md:items-center">
                  {/* <div class="md:w-1/3"></div> */}
                  <div className="upload-section flex h-full mb-[10px] w-full">
                    <Dropzone
                      onDrop={onDrop}
                      onDragEnter={() => updateBorder("over")}
                      onDragLeave={() => updateBorder("leave")}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps({
                            className:
                              "drop-zone mb-[10px] py-[40px] px-[10px] flex flex-col justify-center items-center cursor-pointer focus:outline-none border-2 border-dashed border-[#e9ebeb] w-full h-full",
                          })}
                          ref={dropRef}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag and drop a file OR click here to select a file
                          </p>
                          {file && (
                            <div>
                              <strong>Selected file:</strong> {file.name}
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                    {previewSrc ? (
                      isPreviewAvailable ? (
                        <div className="image-preview ml-[5%] w-full">
                          <img
                            className="preview-image w-full h-full block mb-[10px]"
                            src={previewSrc}
                            alt="Preview"
                          />
                        </div>
                      ) : (
                        <div className="preview-message flex justify-center items-center ml-[5%]">
                          <p>No preview available for this file</p>
                        </div>
                      )
                    ) : (
                      <div className="preview-message flex justify-center items-center ml-[5%]">
                        <p>Image preview will be shown here after selection</p>
                      </div>
                    )}
                  </div>
                  <div class="md:w-2/3 ">
                    <button
                      class="shadow md:w-full w-[70%]  bg-[#000080] hover:bg-[#0000d0] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bulletins_Admission;