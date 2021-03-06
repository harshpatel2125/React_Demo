import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [editcont, seteditcont] = useState({
    flag: false,
    editfilename: "",
    editcontent: "",
  });
  const [namefloder, setnamefloder] = useState("");
  const [file, setfile] = useState({});
  const [folderstr, setfolderstr] = useState({
    foldername: [],
    filedetails: [],
  });
  const handlefoldername = (e) => {
    setnamefloder(e.target.value);
  };
  const handlefilenamechange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setfile({ ...file, [name]: value });
  };
  const handlesubmitfolder = (e) => {
    e.preventDefault();
    if (
      folderstr?.foldername?.filter((ele) => ele === namefloder)?.length > 0
    ) {
      alert("folder with same name is already exists");
    } else {
      setfolderstr({
        ...folderstr,
        foldername: [...folderstr.foldername, namefloder],
      });
    }
    setnamefloder("");
  };
  const handlesubmitsubfolder = (e) => {
    e.preventDefault();
    setfolderstr({
      ...folderstr,
      filedetails: [
        ...folderstr.filedetails,
        {
          contents: file.contents,
          filename: file.filename,
          parentfolder: selectedFolder,
        },
      ],
    });
    setfile({ filename: "", contents: "" });
    setSelectedFolder(null);
  };

  const handleclickfolder = (val) => {
    setSelectedFolder(val);
  };
  const clearsel = () => {
    setSelectedFolder(null);
  };
  const handleedit = (e) => {
    e.preventDefault();
    folderstr.filedetails.splice(editcont.indexid, 1);
    setfolderstr({
      ...folderstr,
      filedetails: [
        ...folderstr.filedetails,
        {
          contents: editcont.editcontent,
          filename: editcont.editfilename,
          parentfolder: editcont.parentfolder,
        },
      ],
    });
    seteditcont({ flag: false, editfilename: "", editcontent: "" });
    clearsel();
  };
  const editxx = (value, iqd, parent) => {
    seteditcont({
      flag: true,
      editfilename: value.filename,
      editcontent: value.contents,
      indexid: iqd,
      parentfolder: parent,
    });
  };
  console.log(folderstr, "folderstr");
  return (
    <>
      <br />
      {!editcont.flag && (
        <>
          <form onSubmit={handlesubmitfolder}>
            <label>ADD Folder:</label>
            <input type="text" value={namefloder} onChange={handlefoldername} />
            <button type="submit">Add Folder</button>
          </form>
          <br />
          <br />
          <form onSubmit={handlesubmitsubfolder}>
            <label>New File Name:</label>
            <input
              type="text"
              name="filename"
              required
              value={file.filename}
              onChange={handlefilenamechange}
            />
            <label>Contents:</label>
            <input
              type="text"
              name="contents"
              required
              value={file.contents}
              onChange={handlefilenamechange}
            />
            <button
              disabled={selectedFolder === null ? true : false}
              type="submit"
            >
              Add file
            </button>
          </form>
          <button
            disabled={selectedFolder === null ? true : false}
            onClick={clearsel}
          >
            Clear Selection
          </button>
        </>
      )}
      <br />

      {editcont.flag && (
        <div>
          <form onSubmit={handleedit}>
            <label>File:</label>
            <label>{editcont.editfilename}</label>
            <input
              type="text"
              value={editcont.editcontent}
              onChange={(e) => {
                seteditcont({ ...editcont, editcontent: e.target.value });
              }}
            />
            <button type="submit">Save</button>
            <br />
            <button
              onClick={() => {
                seteditcont({ flag: false, editfilename: "", editcontent: "" });
              }}
            >
              Clear Selection
            </button>
          </form>
        </div>
      )}

      <div
        style={{
          minWidth: "500px",
          minHeight: "400px",
          border: "3px dashed black",
          margin: "5px",
        }}
      >
        {folderstr.foldername.map((val) => {
          return (
            <div>
              <div style={selectedFolder !== val ? null : { color: "red" }}>
                {" "}
                <h2 onClick={() => handleclickfolder(val)}>
                  {val ? "(folder)" + val : null}
                </h2>
              </div>
              {folderstr.filedetails.map((value, index) => {
                return (
                  <>
                    {value?.parentfolder === val && (
                      <h3
                        onDoubleClick={() => {
                          editxx(value, index, value?.parentfolder);
                        }}
                      >
                        {"(File) " +
                          value.filename +
                          " " +
                          ":" +
                          " " +
                          value.contents}
                      </h3>
                    )}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
