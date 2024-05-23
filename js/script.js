const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
// correctTag = document.querySelector(".correct span"),
correctTag = document.querySelector(".correct span"),
cpmTag = document.querySelector(".cpm span");

// select tag 
selectBox = document.querySelector(".select-box");
options = Object.keys(paragraphs);


selectBox.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join("");

let timer,
maxTime = 20,
timeLeft = maxTime,
charIndex = mistakes = isTyping = wordIndex = correct= 0;

words = [];
word = "";


function loadParagraph() {
    typingText.innerHTML = "";
    paragraphs[selectBox.value ].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1) {
        // if(!isTyping) {
        //     timer = setInterval(initTimer, 1000);
        //     isTyping = true;
        // }
        // console.log("typedChar: ", typedChar);
        if(typedChar == null) {
            // console.log("typedChar2: ", typedChar);
            if (word.length > 0) {
                // remove last character from word
                word = word.slice(0, -1);
            }
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;


            word += typedChar;
            if(typedChar == ",") {
                
                cWords = paragraphs[selectBox.value].substring(0,charIndex).toLowerCase().split(",");
                cWords = cWords.map(word => word.trim());
                // remove last element from array
                cWords.pop();
                tWords = word.toLowerCase().split(",");
                tWords = tWords.map(word => word.trim());
                // remove last element from array
                tWords.pop();


                correct = cWords.filter((word, index) => word === tWords[index]).length;
                mistakes = cWords.filter((word, index) => word !== tWords[index]).length;

                // print cWords
                // console.log("cWords: ", cWords);
                // console.log("tWords: ", tWords);

                // console.log("word: ", paragraphs[selectBox.value].substring(0,charIndex));
                // if(word.toLowerCase() === words[wordIndex].toLowerCase()) {
                //     correct ++;
                // }
                // else {
                //     mistakes ++;
                // }

                // word = "";
                // wordIndex++;
                // console.log("words[wordIndex]: ", words[wordIndex]);
                // console.log('mistakes: ', mistakes);
                // console.log("correct: ", correct);
            }
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");


        // console.log("correct: ", correct);
        correctTag.innerText = correct;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        // clearInterval(timer);
        inpField.value = "";
    }   
}

// function initTimer() {
//     if(timeLeft > 0) {
//         timeLeft--;
//         timeTag.innerText = timeLeft;
//         let correct = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
//         correctTag.innerText = correct;
//     } else {
//         clearInterval(timer);
//     }
// }

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    correctTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
selectBox.addEventListener("change", () => {
    maxTime = selectBox.value;
    resetGame();
});