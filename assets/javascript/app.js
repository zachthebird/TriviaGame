$(document).ready(function(){
    //define questions//
    var questions = [];
    questions[0] = 'What is the name of Vesuvio\'s owner and Tony\'s close friend?'
    questions[1] = 'In Season 3 episode "Pine Barrens", What did Paulie do that infuriated the Russian when he and Christopher went to make a routine pickup?';
    questions[2] = 'In Season 6 episode "Johnny Cakes", what did Vito\'s lover Jim do for a living?';
    questions[3] = 'In Season 5 episode "Long Term Parking", who was it that killed Adriana?';
    questions[4] = 'Who said, "The Federal Mashalls are so far up my ass, I can taste Brylcreeme!"';
    questions[5] = 'Which of the following people did NOT know Tony when he was in high school?';
    questions[6] = 'Who is Tony\'s consigliere, or top advisor/right hand man?';
    questions[7] = 'What does it mean when someone is from "the other side"?';
    questions[8] = 'Paulie gets promoted in season two, what rank is he promoted to?';
    questions[9] = 'Who does Tony inherit the role of mob-boss from?';
    //define choices//
    var answers = [];
    answers[0] = ['Artie Bucco', 'Davey Scatino', 'Febby Petrulio', 'Ralph Cifaretto'];
    answers[1] = ['He insults the Russian', 'He spits on the floor', 'He purposely drops the remote control', 'He punches him'];
    answers[2] = ['Volunteer Fireman', 'Motorcycle Gang', 'Diner owner', 'Art Gallery Salesman'];
    answers[3] = ['Paulie', 'Silvio', 'Tony', 'Christopher'];
    answers[4] = ['Tony Soprano', 'Corrado "Junior" Soprano', 'Herman Heche', 'Artie Bucco'];
    answers[5] = ['Davey Scatino', 'Artie Bucco', 'Carmela Soprano', 'Jennifer Melfi'];
    answers[6] = ['Paulie Gualtieri', 'Silvio Dante', 'Big Pussy Bonpensiero', 'Christopher Moltisanti'];
    answers[7] = [ "They're from South Jersey", "They are from Italy", "They are part of law enforcement", "They're from New York"]
    answers[8] = ['Captain', 'Soldier', 'Associate', 'Consigliere']
    answers[9] = ['Bob Sacamano', 'Jackie Aprille, Sr.', 'John Sacramoni', 'Junior Soprano'];
    //define correct answers//
    var rtAnswer = [];
    rtAnswer[0] = 'Artie Bucco';
    rtAnswer[1] = 'He purposely drops the remote control';
    rtAnswer[2] = 'Diner owner';
    rtAnswer[3] = 'Silvio';
    rtAnswer[4] = 'Corrado "Junior" Soprano';
    rtAnswer[5] = 'Jennifer Melfi';
    rtAnswer[6] = 'Silvio Dante';
    rtAnswer[7] = 'They are from Italy';
    rtAnswer[8] = 'Captain';
    rtAnswer[9] = 'Jackie Aprille, Sr.';
    //define time alotted for timer//
    var time = 31;
    //establish # of correct answers//
    var correct = 0;
    //establish # of wrong answers//
    var wrong = 0;
    //establish which question we're on//
    var currentQuestion = 0;
    var timer;

    $(document).on('click', '#start', function gamePlay(){
        changeQuestion()
        thirtySeconds()
        timer = setInterval(thirtySeconds, 1000);
    })

    //display current question, choices, and timer//
    $(document).on('click', '.btn', function (event){
        time = 31;
        checkAnswer($(this).text().trim())
    })


    function thirtySeconds (){
        if(time == 0){
            clearInterval(timer);
            noAnswer();
        } else if (time > 0){
            time--;
        }

        $('#timer').html(time);
    }

    function changeQuestion () {

        if(currentQuestion >= 10){
            clearInterval(timer);
            showScore();
            return;
        }

        $('#questions').html(
            '<p>'+questions[currentQuestion]+'</p>'
        );

        $('#choices').html(
            '<p class="btn">' + answers[currentQuestion][0] + '</p>' +
            '<p class="btn">' + answers[currentQuestion][1] + '</p>' +
            '<p class="btn">' + answers[currentQuestion][2] + '</p>' +
            '<p class="btn">' + answers[currentQuestion][3] + '</p>'
        );

        currentQuestion++;
    }

    function showScore() {
        $('#timer').html('Game Over')
        $('#questions').html('<p>Your score: ' + correct + ' out of ' + 10 + '!</p>');
        $('#choices').html('<p>what goes here</p>');
    }

    function checkAnswer (givenAnswer) {

        if (givenAnswer === rtAnswer[currentQuestion - 1]){
            correctAnswer();
        }

        if (givenAnswer !== rtAnswer[currentQuestion - 1]){
            wrongAnswer();
        }

        changeQuestion()
    }

    function correctAnswer(selection) {
        correct++;
        showImg(
            "https://api.giphy.com/v1/gifs/search?q=Good Sopranos HBO&api_key=dc6zaTOxFJmzC&limit=1"
        )
    }

    function wrongAnswer(selection) {
        wrong++;
        showImg(
            "https://api.giphy.com/v1/gifs/search?q=Bad Tony Soprano&api_key=dc6zaTOxFJmzC&limit=1"
        )
    }

    function showImg (url) {
        $.get(url).success(function (img) {


            $('#timer').html('&nbsp;')
            $('img').attr('src',  img.data[0].images.fixed_height.url);

            clearInterval(timer);

            setTimeout(function () {
                $('img').attr('src',  '');

                timer = setInterval(thirtySeconds, 1000);

            }, 5000)
        })
    }

    function noAnswer() {
        wrong++;
        console.log('Time has run out. Next question.');

        clearInterval(timer);
        time = 31;
        setInterval(thirtySeconds, 1000);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=too slow" + "&api_key=dc6zaTOxFJmzC&limit=1";
    }
});
