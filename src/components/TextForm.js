import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [mic, setMic] = useState(false);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleUpperCase = () => {
    let UpperCaseText = text.toUpperCase();
    setText(UpperCaseText);
    // props.showAlert('UpperCase transform done', 'success');
  };

  const handleLowerCase = () => {
    let LowerCaseText = text.toLowerCase();
    setText(LowerCaseText);
  };

  const handleCaptalize = () => {
    let CaptalizeCaseText = text.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
    setText(CaptalizeCaseText);
  };

  const handleSentence = () => {
    let SentenceCaseText =
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setText(SentenceCaseText);
  };

  const handleRemoveSpaces = () => {
    let RemoveSpace = text.split(/[ ]+/);
    setText(RemoveSpace.join(" "));
  };

  const handleCopy = () => {
    let copyText = text;
    document.getElementById("appendText").innerHTML =
      '<div id="copied" class="alert alert-success mt-3 p-2 mb-0" role="alert">Text copied to clipboard</div>';
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      document.getElementById("copied").remove();
    }, 4000);
  };

  const handleRemoveNumeric = () => {
    setText(text.replace(/[0-9]/g, ""));
  };

  const handleClear = () => {
    setText("");
  };
  let finalTranscripts = "";

  const handleSpeechToText = () => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognizer = new window.webkitSpeechRecognition();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = "en-US";
      speechRecognizer.start();
      setMic(true);

      speechRecognizer.onresult = function (event) {
        let interimTranscripts = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>");
          if (event.results[i].isFinal) {
            finalTranscripts += transcript;
          } else {
            interimTranscripts += transcript;
          }
        }
        const result = finalTranscripts + interimTranscripts;
        setText(result);
        // finalTranscripts = "";
      };
      speechRecognizer.onerror = function (event) {
        setMic(false);
        console.error("Speech recognition error:", event.error);
      };

      speechRecognizer.onspeechend = () => {
        setMic(false);
        console.log("Speech recognition has stopped.");
      };
    } else {
      setError(
        "Your browser is not supported speech to text. Please download Google Chrome or update your Google Chrome."
      );
    }
  };

  return (
    <div className="container">
      <div className="mb-3 mt-3">
        <h2
          className={`mb-3 text-${props.mode === "light" ? "dark" : "light"}`}
        >
          {props.title}
        </h2>
        <textarea
          className={`form-control text-${
            props.mode === "dark" ? "light" : "dark"
          } bg-${props.mode === "dark" ? "dark" : "light"}`}
          value={text}
          onChange={(e) => handleOnChange(e)}
          id="myBox"
          rows="8"
          disabled={mic}
        ></textarea>
        <span id="appendText"></span>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleUpperCase}
        >
          UPPER CASE
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleLowerCase}
        >
          lower case
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleCaptalize}
        >
          Capitalized Case
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleSentence}
        >
          Sentence case
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleRemoveSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mt-3 me-2"
          onClick={handleRemoveNumeric}
        >
          Remove Numeric Digits
        </button>
        <button
          disabled={error || mic}
          className="btn btn-primary mt-3 me-2"
          onClick={handleSpeechToText}
        >
          {mic ? "Listening" : "Speech to Text"}
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-danger mt-3 me-2"
          onClick={handleClear}
        >
          Clear Text
        </button>
      </div>
      <span className="text-danger d-block mb-2">{error}</span>
      <div className="mb-3">
        <h3 className={`text-${props.mode === "light" ? "dark" : "light"}`}>
          Your Text Summary
        </h3>
        <p className={`text-${props.mode === "light" ? "dark" : "light"}`}>
          {text.split(/\s+/).filter((element) => element.length !== 0).length}{" "}
          {text.split(/\s+/).filter((element) => element.length !== 0)
            .length === 1
            ? "Word"
            : "Words"}{" "}
          and {text.length} {text.length === 1 ? "Character" : "Characters"}
        </p>

        {text.length > 0 && (
          <>
            <h3 className={`text-${props.mode === "light" ? "dark" : "light"}`}>
              Preview
            </h3>
            <p className={`text-${props.mode === "light" ? "dark" : "light"}`}>
              {text}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
