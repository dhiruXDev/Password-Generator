const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-no]");

const passwordDisplay = document.querySelector("[data_password_display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[copy-msg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#Numbers");
const symbolCheck = document.querySelector("#Symbols");
const strengthIndicator = document.querySelector("[data-strength-Indicator]");
const generateBtn = document.querySelector("[password_generate]");

const allCkeckBox = document.querySelectorAll("input[type=checkbox]");

// Initially 
let password = " ";
let passwordLength = 10;
let checkCount = 1;  // By default checkBox is selected , So checkCount = 1
handleSlider();
// const allSymbols  = '@`!#$%^&*(?><{})|/*-+';
const allSymbols = ["!", "#", "$", "%", "^", "&", "*", "(", "?", ">", "<", "{", "}", ")", "|", "/", "*", "-", "+", "`"];
// set initially indicator color as white
setIndecatorColor('#ccc');

//Set color and Shadow of StrengthIndicator   =  Grey ;
function handleSlider() {          // Iska kam hai ki UI pr slider ko change ge krna
    lengthDisplay.innerText = passwordLength;
    inputSlider.value = passwordLength;
    
   // or kuch krna hai
    const min = parseInt(inputSlider.min);
    const max = parseInt(inputSlider.max);
    inputSlider.style.backgroundSize = ((passwordLength - min)*100 / (max - min)) + "% 100%";
}
function setIndecatorColor(color) {
    strengthIndicator.style.backgroundColor = color;
    // Shadow
    strengthIndicator.style.boxShadow = "0 0 14px " + color;
}
function getRandomInteger(min, max) {
    console.log("getRandomInteger");
    return Math.floor((Math.random()) * (max - min)) + min;

}
function GenerateRandomNumber() {     // only Random number should be 1 Digit 
    console.log("GenerateRandomNumber");
    return getRandomInteger(0, 9);
}
function GenerateLowercase() {
    return String.fromCharCode(getRandomInteger(97, 123));
    // ASCII value a=97 ...z=123
}
function GenerateUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}
function GenerateSymbols() {
    const index = getRandomInteger(1, allSymbols.length);
    return allSymbols[index];
}

// Its for calculating strength means , indicating the color on Indecator button
function calculateStrength() {
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasSymbol = false;
    let hasNumber = false;
    if (upperCaseCheck.checked)    // For checking wheathr this checkBox is Checked or Not?   and ".checked" is a method for checking thick
        hasUpperCase = true;
    if (lowerCaseCheck.checked)
        hasLowerCase = true;
    if (symbolCheck.checked)
        hasSymbol = true;
    if (numberCheck.checked)
        hasNumber = true;

    if ((hasUpperCase && hasLowerCase && hasSymbol) || (hasUpperCase && hasNumber && passwordLength >= 8)
        || (hasUpperCase && hasLowerCase && hasSymbol && hasNumber)) {
        setIndecatorColor('#0f0');
    }
    else if ((hasLowerCase && hasUpperCase) || (hasLowerCase && hasSymbol) || (hasNumber && hasUpperCase)) {
        setIndecatorColor('#ff0');
    } else {
        setIndecatorColor('#f00');
    }
}

// its for copyContent 
async function copyContent() {
    // It is for coping the data from clipBoard (Or )
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);    /// By this the value will copied on clipBord
        copyMsg.innerText = "Copied!";   // This will show when The text is complitly copid then after the copid! text will show

        // Try block is for if any error will come then its used
    }
    catch (e) {
        copyMsg.innerText = "Failed!";
    }

    // To make copy wala Span Visible
    copyMsg.classList.add("active");
    // It is for the copy Sapn wiill visible for only for 2sec.
    setTimeout(() => {
        copyMsg.classList.remove("active");
        copyMsg.innerText = " ";
    }, 2000);


}
function shufflePassword(Array) {
    //Fisher yates Method
    for (let i = Array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));   //hhh
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = " ";
    Array.forEach((e) => { // 'e' is a parameter representing each element of the array arr as the loop iterates.
        str = str + e;   // here i'm adding the each element of array in str and at last we will return it
    })
    console.log("suffle paswor in main fun");

    return str;
}


function handleCheckBoxChange() {
    checkCount = 0;
    allCkeckBox.forEach((checkBox) => {    // Iterate every element of  "allcheckBox"  (and int every one iteration the one element will representsd by 'checkBox' and we will perforn poeration ) 
        if (checkBox && checkBox.checked)     // if checkBox is Marked then Increase the count of CheckCount 
            checkCount++;
    });
    //Specical case
    if (passwordLength < checkCount)
        passwordLength = checkCount;

    console.log("handle check box done");
}

allCkeckBox.forEach((checkBox) => {        // on Every checkBox wheather it is checked or not the handleCheckBoxChange() function will call for maintaing the count (then increase the count of CheckCount and if Not checked then decrease count)
    checkBox.addEventListener('click', handleCheckBoxChange);
    console.log("allCheckBox");

});

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();    // For maintain the slider / Or update the UI
    console.log("input slider-slider run");
});

copyBtn.addEventListener('click', () => {
    if (password.valueOf && password !== " ") {    // valueOf instead of value /????????????
        copyContent();
    }
    else {
        return;
    }

})

// Now generating the password
generateBtn.addEventListener("click", () => {
    // lets check the conddition
    //  if None of Checkboxes are selected....

    if (checkCount <= 0)
        return;         // Chlo bhago yaha se

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();         // for updating the slider
    }

    // Let's start the journey of gnerating the passsword

    // Firstly remove the old password
    password = " ";

    // Lets put the stuff mentoined by Checkboxes
    // By using this wee cann't make a password when the passwordLength will than passwordLength  
    // if(upperCaseCheck.checked)
    //       password += GenerateUppercase();
    // if(lowerCaseCheck.checked)
    //      password +=GenerateLowercase();
    // if(symbolCheck.checked)
    //       password += GenerateSymbols();
    // if(numberCheck.checked)
    //      password +=GenerateRandomNumber();
    // So use this one
    let funcArr = [];        // creating the array of Function which contain the Function's  ( of GenerateUpperrcase,lowecase,Number,Symbols)
    if (upperCaseCheck.checked)
        funcArr.push(GenerateUppercase);

    if (lowerCaseCheck.checked)
        funcArr.push(GenerateLowercase);
    if (symbolCheck.checked)
        funcArr.push(GenerateSymbols);
    if (numberCheck.checked)
        funcArr.push(GenerateRandomNumber);
    console.log("push ho gaya");

    // cumpulsary Addition of the character 
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();   // calling the function the is at the given index .. Ek ek function ko call kra rahe hai and uska value store kr rahe hai
    }
    console.log("calling for cumpulssary remaining");
    // Remaining addition    ( if passwordLength = 10 nad checked to 4 hi hai to reamaming  6 ke liye  )
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    console.log("calling for adding remaining");
    // Now sufffle the password  

    // dikattttt

    shufflePassword(funcArr);


    // Now display the password on UI
    passwordDisplay.value = password;

    calculateStrength();
})