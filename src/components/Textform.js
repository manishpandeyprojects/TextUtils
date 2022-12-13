import React, { useState } from 'react'

export default function Textform(props) {

    const [text, setText] = useState("");

    // To handle the onclick
    let convertTextToUpperCase = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Text Converted into a Uppercase!", "success");
    }

    // To handle the onchange
    let changeTextAreaValue = (event) => {
        setText(event.target.value);
    }

    // Convert Text to lower case
    let convertTextToLowerCase = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Text Converted into a LowerCase!", "success");
    }

    // Clear the text
    let clearText = ()=>{
        let newText = "";
        setText(newText);
        props.showAlert("Cleared the text!", "success");
    }

    let handleCopy = ()=>{

        let copyText = document.getElementById("text");
        // Select the text field
        copyText.select();
         // Copy the text inside the text field

        navigator.clipboard.writeText(copyText.value);
        window.getSelection().removeAllRanges();
        props.showAlert("Text copy into the clipboard!", "success");
    }

    let handleExtraSpace = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(' '));
        props.showAlert("Extra Spaces removed!", "success");
    }


    let handleCamelCase = ()=>{
        const arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        
        }
        const newText = arr.join(" ");
        setText(newText);
        props.showAlert("All text first letter capitalized!", "success");
    }


    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }

    function countWords(str) {
        const arr = str.split(' ');  
        return arr.filter(word => word !== '').length;
    }
    

    return (
        <div className={`container my-3 text-${props.mode==='light'?'dark':'light'}`}>
            <div className="mb-3">
                <h2 style={{color:props.mode === 'light'?'black':'white'}}>{props.title}</h2>
                <textarea style={{color:props.mode === 'light'?'black':'white', backgroundColor:props.mode === 'light'?'white':'#424360'}} className="form-control" value={text} onChange={changeTextAreaValue} id="text" rows="12"></textarea>
            </div>
            <div>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={convertTextToUpperCase}>Convert to Uppercase</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={convertTextToLowerCase}>Convert to Lowercase</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={clearText}>Clear</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={handleExtraSpace}>Remove extra spaces</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={handleCamelCase}>Camel case</button>
                <button disabled={text.length===0} className='btn btn-primary m-2' onClick={handleSpeak}>Speak</button>
            </div>
            <div className='my-3'>
                <h4>Your text summary</h4>
                <p> {countWords(text)} Words and {text.length} Characters </p>
                <p>{0.008 * countWords(text)} Minutes read time</p>
            </div>
            <div className='my-3'>
                <h4>Preview Text</h4>
                <p> {text.length>0?text:"No text to preview!"} </p>
            </div>
        </div>
    )
}