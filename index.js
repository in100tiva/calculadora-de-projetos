function calculateHourlyRate() {
    const monthlyCosts = parseFloat(document.getElementById('monthlyCosts').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);
    const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value);

    const firstTerm = (monthlyCosts + desiredSalary) / (hoursPerDay * daysPerWeek * 4);
    const secondTerm = (desiredSalary / (4 * vacationWeeks)) / ((hoursPerDay * daysPerWeek * 48) - (vacationWeeks * daysPerWeek * hoursPerDay));
    const hourlyRate = firstTerm + secondTerm;

    document.getElementById('hourlyRateResult').textContent = hourlyRate.toFixed(2);
    return hourlyRate; // Return the hourly rate for reuse in project cost calculation
}

function calculateProjectCost() {
    const projectHoursPerDay = parseFloat(document.getElementById('projectHoursPerDay').value);
    const totalProjectDays = parseFloat(document.getElementById('totalProjectDays').value);
    const hourlyRate = calculateHourlyRate();  // Reuse hourly rate calculation

    const projectCost = projectHoursPerDay * totalProjectDays * hourlyRate;
    document.getElementById('projectCostResult').textContent = projectCost.toFixed(2);
}
