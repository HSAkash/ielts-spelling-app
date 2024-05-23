const typingText = document.querySelector(".typing-text p");

function loadParagraph() {
    typingText.innerHTML = ``;
    // all key value will be red and bold
    // and value will be in span tag
    for (let [key, value] of Object.entries(paragraphs)) {
        let span = `<span style="color: red; font-weight: bold;">${key} : </span><span>${value}</span>`;
        typingText.innerHTML += span;
        typingText.innerHTML += `<br>`;
        typingText.innerHTML += `<br>`;
    }


}

loadParagraph();