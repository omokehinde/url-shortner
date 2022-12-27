import "./App.css";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [shortUrl2, setshortUrl2] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://api.shrtco.de/v2/", {
        method: "POST",
        body: JSON.stringify({
          url: url,
        }),
      });
      let resJson = await res.json();
      if (res.ok === true) {
        setshortUrl(res.result.short_link);
        setshortUrl2(res.result.short_link2);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <h2 className="App">Create a shorter url for your website</h2>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={url}
          placeholder="Type in Url"
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit">Create</button>
        <div>{shortUrl ? <><h4>Short Url:</h4> <p>{shortUrl}</p></> : null}</div>
        <div>{shortUrl2 ? <><p><h4>Short Url2:</h4>{shortUrl2}</p></> : null}</div>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    </>
  );
}

export default App;
