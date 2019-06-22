/*AddMinutes - function adds or subtracts minutes from a time and then returns the new time 
Input 1: the first argument is a 12-hour time string with the format "[H]H:MM{AM|PM}"
Input 2: and the second argument is a (signed) integer and represents the minutes to add to the first argument
Function returns timeMeridiemArray as a string value in the format "[H]H:MM{AM|PM}"*/


AddMinutes = (time, minutesToAdd) => {
    let minutesToAdd1 = (minutesToAdd >= 0) ? (minutesToAdd % 1440) : (1440 + (minutesToAdd % 1440));/* if minutesToAdd is greater than 0, 
                                                            set minutesToAdd1 to the remainder of minutesToAdd divided by 1440. Otherwise, 
                                                            set minutesToAdd1 to the remainder of minutesToAdd divided by 1440 and then 
                                                            add that value from 1440 */
    let timeArray = [0,0];// this is the array that will hold the new time hours value in the first index, and the new time minutes value in the second
    let meridiemArray = [0];// this array will hold the new time's "AM/PM" value
    let splitTime = time.split(":"); // this variable holds the array after the user's time input value is split at the semi-colon
    let hours = parseInt(splitTime[0]); // giving the variable hours the integer value of splitTime's 0th index
    let minutes = parseInt(splitTime[1]);// giving the variable minutes the integer value of splitTime's 1st index
    let middayChange = splitTime[1].split("").splice(2,4).join(""); // getting the "AM/PM" value from splitTime's 1st index
    let hourChange = (hours === 12) ? 0 : hours;// if hours equals 12, set hourChange to 0, otherwise set hourChange to value of hours
    let hoursInMinutes = hourChange*60;// converting hours to minutes
    const addPMminutes = (middayChange === "PM") ? 720 : 0;// adding 720 minutes if time input reads "PM"
    let newTimeHours = parseInt(((hoursInMinutes + minutes + addPMminutes + minutesToAdd1) % 1440) / 60); /*setting newTimeHours to the integer 
                                                            of the remainder of the sum in minutes of the user's total input in minutes divided by 
                                                            1440 and then that number divided by 60*/
    let newTimeMinutes = ((hoursInMinutes + minutes + addPMminutes + minutesToAdd1) % 1440) % 60; /* setting newTimeMinutes to the remainder of 
                                                            sumMinutes divided by 1440 and then the remainder of that number divided by 60*/
    timeArray[1] = (newTimeMinutes < 10) ? ("0"+newTimeMinutes).slice(-2) : newTimeMinutes; /* if the newTimeMintues value is less than 10, 
                                                            we want to add a 0 in front of the number*/
        switch (true) {
            case (newTimeHours >= 13 && newTimeHours < 24):
                timeArray[0] = newTimeHours - 12;// setting the value of timeArray's 0th index to newTimeHours minus 12
                meridiemArray[0] = "PM";// setting the value of meridiemArray's 0th index to "PM"
                break;
            case (newTimeHours == 0 ):
                timeArray[0] = 12;// setting the value of timeArray's 0th index to 12
                meridiemArray[0] = "AM"; // setting the value of meridiemArray's 0th index to "AM"
                break;
            case (newTimeHours == 12):
                timeArray[0] = newTimeHours;// setting the value of timeArray's 0th index to newTimeHours
                meridiemArray[0] = "PM";// setting the value of meridiemArray's 0th index to "PM"
                break;
            case (newTimeHours == 24 ):
                timeArray[0] = 12;// setting the value of timeArray's 0th index to 12
                meridiemArray[0] = "AM";// setting the value of meridiemArray's 0th index to "AM"
                break;
            case (newTimeHours < 12 && newTimeHours > 0):
                timeArray[0] = newTimeHours;// setting the value of timeArray's 0th index to newTimeHours 
                meridiemArray[0] = "AM";// setting the value of meridiemArray's 0th index to "AM"
                break;
            default:
                console.log("That didn't work.")
            }
    const timeMeridiemArray = timeArray.join(":").concat(meridiemArray); /*joining the 0th and 1st index of timeArray with a semicolo and 
                                                            setting value to timeArrayJoined and then concatenating the timeArrayJoined 
                                                            string with meridiemArray*/
    console.log(timeMeridiemArray)// returning timeMeridiemArray as final time
    return timeMeridiemArray;// returning timeMeridiemArray as final time
}

AddMinutes("12:00AM", -0) //expected output "12:00AM"
AddMinutes("12:00AM", 0)//expected output "12:00AM"
AddMinutes("12:00AM", 1439)//expected output "11:59PM"
AddMinutes("12:00AM", -1439)//expected output "12:01AM"
AddMinutes("12:00AM", 1440)//expected output "12:00AM"
AddMinutes("12:00AM", -1440)//expected output "12:00AM"
AddMinutes("12:00AM", 2880)//expected output "12:00AM"
AddMinutes("12:00AM", -2880)//expected output "12:00AM"
AddMinutes("12:00AM", -1)//expected output "11:59PM"
AddMinutes("12:00AM", 1)//expected output "12:01AM"
AddMinutes("12:00AM", 720)//expected output "12:00PM"
AddMinutes("12:00AM", -720)//expected output "12:00PM"
AddMinutes("12:00PM", -0)//expected output "12:00PM"
AddMinutes("12:00PM", 0)//expected output "12:00PM"
AddMinutes("12:00PM", 1439)//expected output "11:59AM"
AddMinutes("12:00PM", -1439)//expected output "12:01PM"
AddMinutes("12:00PM", 1440)//expected output "12:00PM"
AddMinutes("12:00PM", -1440)//expected output "12:00PM"
AddMinutes("12:00PM", 2880)//expected output "12:00PM"
AddMinutes("12:00PM", -2880)//expected output "12:00PM"
AddMinutes("12:00PM", -1)//expected output "11:59AM"
AddMinutes("12:00PM", 1)//expected output "12:01PM"
AddMinutes("12:00PM", 720)//expected output "12:00AM"
AddMinutes("12:00PM", -720)//expected output "12:00AM"
AddMinutes("12:00PM", -60)//expected output "11:00AM"
AddMinutes("12:00PM", 60)//expected output "1:00PM"
AddMinutes("11:59AM", 1)//expected output "12:00PM"
AddMinutes("11:59PM", 1)//expected output "12:00AM"
AddMinutes("12:01AM", -1)//expected output "12:00AM"
AddMinutes("12:01PM", -1)//expected output "12:00PM"
AddMinutes("11:59AM", +1)//expected output "12:00PM"
AddMinutes("12:00AM", 1500)//expeected output "1:00AM"
AddMinutes("12:00AM", -1500)//expected output "11:00PM"
AddMinutes("12:00PM", 1500)//expeected output "1:00PM"
AddMinutes("12:00PM", -1500)//expected output "11:00AM"
AddMinutes("12:00AM") // expected output "That didn't work." 