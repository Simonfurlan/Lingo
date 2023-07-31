const optionPicker = document.getElementById("optionPicker");
selectedData = presente;
index = 0;
pointer = 6;

optionPicker.addEventListener("change", function() {
    const option = optionPicker.value;
    console.log("option:" + option)
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
        default:
            selectedData = presente;
            pointer = 6;
    }

    console.log("pointer: " + pointer);
    //getting Index
    if(pointer != null){
        indexTmp = parseInt(localStorage.getItem(pointer));
        console.log(indexTmp);
        if (!isNaN(indexTmp)){
            console.log("run");
            index = indexTmp;
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
        console.log(index);
        localStorage.setItem(pointer, index);
    }
    update();
}

update()

function update() {
    const textQuestion = document.getElementById("textQuestion");
    const textSolution = document.getElementById("textSolution");

    indexTmp = parseInt(localStorage.getItem(pointer));
    if (indexTmp != NaN && indexTmp > index){
        index = indexTmp;
        textQuestion.innerHTML = selectedData[index];
        textSolution.innerHTML = selectedData[index + 1];
        return;
    }

    console.log(index);

    textQuestion.innerHTML = selectedData[index];
    textSolution.innerHTML = selectedData[index + 1];

    if(pointer != null){
        localStorage.setItem(pointer, index);
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