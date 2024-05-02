function calculateHourlyRate() {
    const monthlyCosts = parseFloat(document.getElementById('monthlyCosts').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);
    const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value);

    const weeksWorkedPerYear = 52 - vacationWeeks;
    const totalWorkHoursPerYear = hoursPerDay * daysPerWeek * weeksWorkedPerYear;
    const totalAnnualCosts = monthlyCosts * 12 + desiredSalary * 12;
    const hourlyRate = totalAnnualCosts / totalWorkHoursPerYear;

    document.getElementById('hourlyRateResult').textContent = hourlyRate.toFixed(2);
    return hourlyRate;
}

function calculateProjectCost() {
    const projectHoursPerDay = parseFloat(document.getElementById('projectHoursPerDay').value);
    const duration = parseFloat(document.getElementById('projectDuration').value);
    const hourlyRate = calculateHourlyRate();

    let totalDays;
    if (document.getElementById('timeOption').value === 'months') {
        totalDays = duration * 30; // Assuming 30 days per month for months to days conversion
    } else {
        totalDays = duration;
    }

    const projectCost = projectHoursPerDay * totalDays * hourlyRate;
    document.getElementById('projectCostResult').textContent = projectCost.toFixed(2);
}

function updateDurationSlider() {
    const timeOption = document.getElementById('timeOption').value;
    const durationSlider = document.getElementById('projectDuration');
    const durationLabel = document.getElementById('durationLabel');

    if (timeOption === 'days') {
        durationSlider.min = 1;
        durationSlider.max = 30;
        durationSlider.value = 5;
        durationLabel.textContent = 'Duração do Projeto em Dias:';
    } else {
        durationSlider.min = 1;
        durationSlider.max = 12;
        durationSlider.value = 6;
        durationLabel.textContent = 'Duração do Projeto em Meses:';
    }
    displayValue('projectDurationValue', durationSlider.value + (timeOption === 'months' ? ' meses' : ' dias'));
    calculateProjectCost(); // Recalculates the project cost when duration is adjusted
}

function displayValue(elementId, value) {
    document.getElementById(elementId).textContent = value;
}

// Attach event listeners to update displays in real-time and calculate costs
document.getElementById('projectHoursPerDay').addEventListener('input', function() {
    displayValue('projectHoursPerDayValue', this.value + ' horas');
    calculateProjectCost();
});
document.getElementById('hoursPerDay').addEventListener('input', function() {
    displayValue('hoursPerDayValue', this.value + ' horas');
    calculateHourlyRate();
    calculateProjectCost(); // Ensure project cost recalculates when hourly related data changes
});
document.getElementById('daysPerWeek').addEventListener('input', function() {
    displayValue('daysPerWeekValue', this.value + ' dias');
    calculateHourlyRate();
    calculateProjectCost(); // Ensure project cost recalculates when hourly related data changes
});
document.getElementById('vacationWeeks').addEventListener('input', function() {
    displayValue('vacationWeeksValue', this.value + ' semanas');
    calculateHourlyRate();
    calculateProjectCost(); // Ensure project cost recalculates when hourly related data changes
});
document.getElementById('projectDuration').addEventListener('input', function() {
    let durationType = document.getElementById('timeOption').value === 'months' ? ' meses' : ' dias';
    displayValue('projectDurationValue', this.value + durationType);
    calculateProjectCost();
});

window.onload = function() {
    updateDurationSlider();
    calculateProjectCost();
    calculateHourlyRate(); // Initial calculation on page load
}
