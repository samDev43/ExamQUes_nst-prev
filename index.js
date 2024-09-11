examinationsInfo= JSON.parse(localStorage.getItem('examinationsInfo')) || [];
let questionIndex = 0;

     ExamStorage=()=>{
         localStorage.setItem('examinationsInfo', JSON.stringify(examinationsInfo))
     }
     console.log(examinationsInfo)

     getExamInfo = function(){
         let correctAns = document.getElementById('correctAns').value
         let question = document.getElementById('question').value;
         let option2 = document.getElementById('option2').value; 
         let option1 = document.getElementById('option1').value; 
         let option3 = document.getElementById('option3').value; 
         console.log(question, option1, option2, option3)
         let examObj = {question, options:[option1, option2, option3],correctAns,optionChoseByUsrer:''}
         examinationsInfo.push(examObj)
         console.log(examinationsInfo)
         ExamStorage()
         displayExam()
         clearFOrm()
     }


     displayExam=()=>{
        let questionON = examinationsInfo[questionIndex]
        
        if(!examinationsInfo.length == 0){
           console.log(questionON)
           let {correctAns,optionChoseByUsrer,question,options} = questionON;
           console.log(options)
           let [now,mom,uyt] = options;
           console.log(now,mom,uyt)
         let optionsHTML = options.map((option, i)=>{
             let checked = mom == option ?'checked':'';
             console.log(checked)
           return  ` <input id="options${i}" name='option'  value='${option}' type="radio" ${checked}>
               <label for="">${option}</label>`
           
         }).join('')
           
         document.getElementById('examPage').innerHTML = `
              <h3>${questionON.question}</h3>
              <div>
                 ${optionsHTML}
             </div>
             <button onclick="delet(${questionIndex})">DELETE</button>
              `
       }else{
         document.getElementById('examPage').innerHTML =`no question yet`
       }
     }

    
   clearFOrm = function (){
     document.getElementById('correctAns').value = ''
      document.getElementById('question').value  = ''
      document.getElementById('option1').value  = ''
      document.getElementById('option2').value   = ''
      document.getElementById('option3').value  = ''
   }


     startExam=()=>{
         displayExam()
         timeOutFunc()
     }
     

     nextFUNC=()=>{
         if(questionIndex == examinationsInfo.length - 1){
             saveUserAnswer()

         }else{
             questionIndex++
             console.log(questionIndex)
             displayExam();
         }
     }
     previousFUNC=()=>{
         if(questionIndex == 0){
             saveUserAnswer()
         }else{
             questionIndex--
             console.log(questionIndex)
             displayExam()
         }
     }

     function delet(i){
         console.log(i,questionIndex)
         examinationsInfo.splice(i, 1);
         ExamStorage()
         displayExam()
     }
     saveUserAnswer=()=>{
         let userAnswer = document.querySelector('input[name="option"]:checked')
         if(userAnswer){
             examinationsInfo[questionIndex].optionChoseByUsrer = userAnswer.value;
             // console.log(optionChoseByUsrer)
         }else{
         }
         ExamStorage()
     }

     subbmit=()=>{
         saveUserAnswer()
     let score = 0;
         examinationsInfo.forEach((question) => {
           
             if(question.optionChoseByUsrer === question.correctAns){
             score++
            console.log(examinationsInfo[questionIndex])

             }else{
             }
         });
         console.log(`you score ${score}/${examinationsInfo.length}`)
     }
     let sec = 0;
     let min = 0;
     let timeOut = 0;
        timeOutFunc=()=>{
            setExamTime = setInterval(()=>{
            timeOut++
            if(sec < 60){
                sec++
            } else {
               
                min++
                sec=0
            }
            if(timeOut == 10){
                subbmit()
                clearInterval(setExamTime)
            }


            document.getElementById('showTime')
             .innerHTML = `Time ${min}:${sec}`
        },1000)
     }