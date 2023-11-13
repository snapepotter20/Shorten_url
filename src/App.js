import React, { useState} from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState('');
  const [data,setData] = useState('');
  const [flag1,setFlag1] = useState(false);
  const [flag2,setFlag2] = useState(true);

  const getUrl = () => {
    const postData = {
      url: url,
    };
    fetch("http://localhost:8001/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log("response from backend", response.id);
        setData(response.id);
        setUrl('');
        setFlag1(true);
        setFlag2(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const clearAll = () => {
    setUrl('');
    setFlag1(false);
    setFlag2(true);
  }

  return (
    <div className="App">
      <h1 className="app_heading">Make your url short here.</h1>
      <input
        type="text"
        value={url}
        placeholder="Enter your URL"
        onChange={(e) => setUrl(e.target.value)}
        className="app_input"
      />
       <br/> <br/>
      {flag1 ? <p className="app_url">{`http://localhost:8001/${data}`}</p>: null}
      {flag2 ? <button onClick={getUrl} className="app_btn1"><p className="app_btn1_heading">Get encrypted and short url</p><br/></button> : null }
      <br/> <br/>
      <button onClick={clearAll} className="app_btn2">Clear All</button>
    </div>
  );
}

export default App;
