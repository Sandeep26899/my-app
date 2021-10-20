import React, {useState} from 'react'

export default function TextForm(props) {
    
    const [text, setText] = useState("");

    const handleOnChange = (event)=> {
        setText(event.target.value);
    }

    const handleUpperCase = ()=> {
        let UpperCaseText = text.toUpperCase();
        setText(UpperCaseText);
        // props.showAlert('UpperCase transform done', 'success');
    }

    const handleLowerCase = ()=> {
        let LowerCaseText = text.toLowerCase();
        setText(LowerCaseText);
    }

     const handleCaptalize = ()=> {
        let CaptalizeCaseText = text.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
        setText(CaptalizeCaseText);
    }

    const handleSentence = ()=> {
        let SentenceCaseText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        setText(SentenceCaseText);
    }

    const handleRemoveSpaces = ()=> {
        let RemoveSpace = text.split(/[ ]+/);
        setText(RemoveSpace.join(" "));
    }

    const handleCopy = ()=> {
    let copyText = text;
        document.getElementById("appendText").innerHTML = '<div id="copied" class="alert alert-success mt-3 p-2 mb-0" role="alert">Text copied to clipboard</div>';
        navigator.clipboard.writeText(copyText);
        setTimeout(() => {
            document.getElementById("copied").remove();
        }, 4000);
    }

    const handleRemoveNumeric = () => {
        setText(text.replace(/[0-9]/g, ''));
    }

    const handleClear = ()=> {
        setText('');
    }


    return (
        <div className="container">
            <div className="mb-3 mt-3">
                <h2 className={`mb-3 text-${props.mode==='light'?'dark':'light'}`}>{props.title}</h2>
                <textarea className={`form-control text-${props.mode==='dark'?'light':'dark'} bg-${props.mode==='dark'?'dark':'light'}`} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
                <span id="appendText"></span>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleUpperCase}>UPPER CASE</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleLowerCase}>lower case</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleCaptalize}>Capitalized Case</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleSentence}>Sentence case</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleRemoveSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mt-3 me-2" onClick={handleRemoveNumeric}>Remove Numeric Digits</button>
                <button disabled={text.length===0} className="btn btn-danger mt-3 me-2" onClick={handleClear}>Clear Text</button>
            </div>
            <div className="mb-3">
                <h3 className={`text-${props.mode==='light'?'dark':'light'}`}>Your Text Summary</h3>
                <p className={`text-${props.mode==='light'?'dark':'light'}`}>{text.split(/\s+/).filter((element)=>{ return element.length!==0}).length} {text.split(" ").length === 1 && " Word" } {text.split(" ").length > 1 && " Words" } and {text.length} {text.length < 2 && " Character" }  {text.length > 1 && " Characters" }</p>
        
                {text.length > 0 &&
                <>
                <h3 className={`text-${props.mode==='light'?'dark':'light'}`}>Preview</h3>
                <p className={`text-${props.mode==='light'?'dark':'light'}`}>{text}</p>
                </>
                }
            </div>
        </div>
    )
}
