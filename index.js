/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



function createEmployeeRecord(array){
    return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(array){
    return array.map(function(addToArray){
        return createEmployeeRecord(addToArray)
    })

}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date, })
    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date, })
    return this
}

function hoursWorkedOnDate(date){
    let matchDate = function(day) {return day.date === date}
    let timeIn = this.timeInEvents.find(matchDate).hour;
    let timeOut = this.timeOutEvents.find(matchDate).hour;

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
    
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, firstName){
    return array.find(function(findName){
        return findName.firstName === firstName
    })

}


function calculatePayroll(array){
    return array.reduce(function(start, payRecords){
        return start + allWagesFor.call(payRecords)
    }, 0)

}