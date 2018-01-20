document.addEventListener('deviceready', onDeviceReady, false)


function feetToMetre(feet) {
    return feet*0.3048
}

function truncate(value, n){ // round upto n decimal places 
    let tens = '1'
    for (let i=0 ; i<n; i++)    tens+= '0';    
    tens = parseInt(tens, 10)
    return Math.floor(value * tens) / tens
}

function calcBMI({sex, height, weight}){   // calculate BMI, height in metres, wt in kgs
    return weight / Math.pow(height, 2)
}
function BMICategory(BMI) {
    if (BMI < 18.5)  { // Underweight
        return "Underweight"
    } 
    else if (BMI < 24.9) {  // Normal
        return "Normal"
    }
    else if (BMI < 29.9) { // Overweight
        return "Overweight"
    } 
    else {   // Obese
        return "Obese"
    }
}


function onDeviceReady() {
    const app = document.querySelector('.app')
    

    // showed while starting
    const startTemplate = `
        <div class="about">
            <div>BMI</div>
            <div>CALCULATOR</div>    
        </div>
    `;
    // header
    const headTemplate = `
        <div class="header">
            <div>BMI</div>
            <div>CALCULATOR</div>
        </div>
    `;
    // mainPage
    const mainTemplate = `
        <div class="main">
            <div class="choose">
                <span class="male active"><i class="fa fa-male fa-4x"></i></span>
                <span class="female"><i class="fa fa-female fa-4x"></i></span>
                <div>(choose your sex)</div>
            </div>
            <div class="input">
                <div class="height">
                    <input type="text" value="5.7"/>
                    <div>height <span>(feet)</span></div>
                </div>
                <div class="weight">
                    <input type="text" value="65"/>
                    <div>weight <span>(kg)</span></div>
                </div>
            </div>
            <div class="calculate">
                <button>calculate your <span>BMI!</span> &#9655;</button>
            </div>
        </div>
    `;
    // result page
    const resultTemplate = `
        <div class="result">
            <div class="heart-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
                <path class="heart" stroke="#A03232" stroke-width="3" fill="none" d="M50.3,87.7c2-4.3,9.5-12.8,18-18.8c10.2-7.2,26-13.2,25.9-30.2C94,7.6,60.9,2.6,50,28.3
                    C38.5,1.6,6,7.8,5.7,38.8c-0.1,17,15.5,23.4,25.9,30.2C41.7,75.7,48.9,84.7,50,88.5C50.1,88.3,50.2,88,50.3,87.7"/>
                </svg>
            </div>
            <div class="me">You are <span>Normal</span> !</div>
            <div class="bmi">BMI : <span>22</span></div>
        </div>
    `;


    function afterInitialPhase() { // after start template
        function mainPage(){  // bring the main page
            app.innerHTML = `${headTemplate}${mainTemplate}`
        }
        function chooseSex() {  // choose the sex
            const choose = app.querySelector('.main .choose')
            choose.querySelectorAll('span').forEach(span => span.addEventListener('click', (e) => {
                if (e.target.nodeName == 'I'){
                    choose.querySelectorAll('span').forEach(s => s.classList.remove('active'))
                    e.currentTarget.classList.add('active')
                }
            }))
        }
        function submit(){ // submit on main page
            const button = app.querySelector('.main .calculate button')
            button.addEventListener('click', (e) => {
                const sex = app.querySelector('.main .choose .active').classList.contains('male') ? 'male' : 'female'
                const height = app.querySelector('.height input[type="text"]').value
                const weight = app.querySelector('.weight input[type="text"]').value
                const BMI = calcBMI({
                    sex,
                    height: feetToMetre(height),
                    weight 
                })
                showResult(truncate(BMI, 2))
            })
        }
        function showResult(BMI) {
            const color = { // heart color for different category
                Underweight: "gold",
                Normal : "#B74848",
                Overweight: "red",
                Obese: "darkred"
            }
            app.innerHTML = `${headTemplate}${resultTemplate}`
            app.querySelector('.result .heart-wrapper').style.setProperty('--color', color[BMICategory(BMI)])
            app.querySelector('.result .me span').innerHTML =  BMICategory(BMI) 
            app.querySelector('.result .bmi span').innerHTML = BMI
        }

        mainPage()
        chooseSex()
        submit()

    }

    app.innerHTML = startTemplate
    document.querySelector('.about').addEventListener('animationend', afterInitialPhase)


}