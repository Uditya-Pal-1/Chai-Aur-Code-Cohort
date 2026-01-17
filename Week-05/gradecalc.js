function CalculateGrade(score){
    if(score >= 90){
        return 'A';

    }
    else if(score >= 80 && score <= 89){
        return 'B';
    }
    else if(score >= 70 && score <= 79){
        return 'C';
    }
    else if(score >= 60 && score <= 69){
        return 'D';

    }
    else{
        return 'F';
    }
}
CalculateGrade(85)
let Grade = CalculateGrade(85);
console.log(Grade);