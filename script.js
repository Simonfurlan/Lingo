const optionPicker = document.getElementById("optionPicker");
selectedData = presente;
index = 0;
pointer = 6;
version = "v1.4"

darkmode()

function darkmode(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.style.backgroundColor = "black";
      document.documentElement.style.backgroundColor = "black";
      document.getElementById("titleText").style.color = "white";
      document.getElementById("optionPicker").style.color = "white";
    }
}

optionPicker.addEventListener("change", function() {
    const option = optionPicker.value;
    switch(option) {
        case "condizionalePassato":
            selectedData = condizionalePassato;
            pointer = 0;
          break;
        case "imperfetto":
            selectedData = imprefetto;
            pointer = 1;
          break;
        case "passatoProssimo":
            selectedData = passatoProssimo;
            pointer = 2;
          break;
        case "futuroSemplice":
            selectedData = futuroSemplice;
            pointer = 3;
          break;
        case "futuroAnteriore":
            selectedData = futuroAnteriore;
            pointer = 4;
          break;
        case "condizionalePresente":
            selectedData = condizionalePresente;
            pointer = 5;
          break;
        case "congiuntivoPresente":
            selectedData = congiuntivoPresente;
            pointer = 6;
          break;
        case "congiuntivoImperfetto":
            selectedData = congiuntivoImperfetto;
            pointer = 7;
          break;
        case "congiuntivoMix":
            selectedData = congiuntivoMix;
            pointer = 8;
          break;
        default:
            selectedData = presente;
            pointer = 9;
    }

    //getting Index
    if(pointer != null){
        indexTmp = parseInt(localStorage.getItem("Lingo" + pointer));
        if (!isNaN(indexTmp)){
            index = indexTmp;
            document.getElementById("textNumber").innerHTML = ((index/2)+1) + "/" + getMax();
        }
        else{
            index = 0;
        }
    }

    const textSolution = document.getElementById("textSolution");
    textSolution.style.filter =  "blur(5px)"; 
    update();
});

function next() {
    if (index >= ((getMax()*2) - 2)){
        animatePress();
        return;
    }

    animatePress();
    index+=2;
    const textSolution = document.getElementById("textSolution");
    textSolution.style.filter =  "blur(5px)"; 
    update();
    shown = 0;
}

function animatePress() {
    const div = document.querySelector(".question");
    div.classList.add("animation-start");
    div.addEventListener("animationend", function() {
        div.classList.remove("animation-start");
    });
}

function prev() {
    if (index < 2){
        return;
    }
    index = index - 2;
    if(pointer != null){
        localStorage.setItem("Lingo" + pointer, index);
    }
    update();
}

update()

function update() {
    const textQuestion = document.getElementById("textQuestion");
    const textSolution = document.getElementById("textSolution");
    
    indexTmp = parseInt(localStorage.getItem("Lingo" + pointer));
    if (indexTmp != NaN && indexTmp > index){
        index = indexTmp;
        textQuestion.innerHTML = selectedData[index];
        textSolution.innerHTML = selectedData[index + 1];
        shown = 0;
        document.getElementById("textNumber").innerHTML = ((index/2)+1) + "/" + getMax();
        value = ((((index/2)+1)/getMax())*100)
        var progressBar = document.getElementById("progress-bar");
        progressBar.style.width = value + "%";
        return;
    }

    document.getElementById("textNumber").innerHTML = ((index/2)+1) + "/" + getMax();
    setProgress((((index/2)+1)/getMax())*100)
    textQuestion.innerHTML = selectedData[index];
    textSolution.innerHTML = selectedData[index + 1];
    shown = 0;
    if(pointer != null){
        localStorage.setItem("Lingo" + pointer, index);
    }
}

shown = 0;
function showMe() {
    if (shown) {
        return;
    }

    const textSolution = document.getElementById("textSolution");
    textSolution.classList.add("show");
    textSolution.addEventListener("animationend", function() {
        textSolution.classList.remove("show");
        textSolution.style.filter =  "blur(0px)"; 
        shown = 1;
    });
}

function getMax() {
    sum = 0;
    for (let i = 0; selectedData[i] != undefined; i = i + 2) {
        sum++;
    }

    return sum;
}


// Progress Bar

function setProgress(value) {
    setTimeout(animateProgressBar, 50);
    setTimeout(function() {
        var progressBar = document.getElementById("progress-bar");
        progressBar.style.width = value + "%";
      }, 50);
}

function animateProgressBar() {
    const div = document.querySelector(".progress-container");
    div.classList.add("animation-progress-start");
    div.addEventListener("animationend", function() {
        div.classList.remove("animation-progress-start");
    });
}

let versionTextRunning = 0;

function animateVersionText() {
    if(versionTextRunning){
        return;
    }
    versionTextRunning = 1;
    setTimeout(showVersionText, 500);
    setTimeout(hideVersionText, 2500);
}

function showVersionText(){
    for (let i = 0; i < version.length; i++) {
        setTimeout(textAdd, 80*i, version.slice(0, i+1));
    }
}

function hideVersionText(){
    for (let i = 0; i <= version.length; i++) {
        setTimeout(textAdd, 80*i, version.slice(0, version.length - i));
    }
    setTimeout(versionTextRunning = 0, 2000);
}

function textAdd(str) {
    text = document.getElementById("textVersion");
    text.innerHTML = str;
}

function initialize() {
    let height = screen.height;
    let headHeight = 122;
    divBodyBox = document.getElementById("bodyBox");
    divSolution = document.getElementById("solution");
    divQuestion = document.getElementById("question");
    
    newHeight = ((height - headHeight)*0.5) + "px";

    divSolution.style.height = newHeight;
    divQuestion.style.height = newHeight;

    animateVersionText();
}

initialize()
