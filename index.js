function calculateHourlyRate() {
    const monthlyCosts = parseFloat(document.getElementById('monthlyCosts').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);
    const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value);

    // Calcular horas de trabalho anuais, excluindo semanas de férias
    const weeksWorkedPerYear = 52 - vacationWeeks;
    const totalWorkHoursPerYear = hoursPerDay * daysPerWeek * weeksWorkedPerYear;

    // Salário anual desejado ajustado mais os custos mensais anualizados
    const totalAnnualCosts = (monthlyCosts * 12) + (desiredSalary * 12);
    const hourlyRate = totalAnnualCosts / totalWorkHoursPerYear;

    document.getElementById('hourlyRateResult').textContent = hourlyRate.toFixed(2);
    return hourlyRate; // Retornar a taxa horária para uso em outras funções
}

function calculateProjectCost() {
    const projectHoursPerDay = parseFloat(document.getElementById('projectHoursPerDay').value);
    const totalProjectDays = parseFloat(document.getElementById('totalProjectDays').value);
    const hourlyRate = calculateHourlyRate();  // Reutilizar a taxa horária calculada
    const projectCost = projectHoursPerDay * totalProjectDays * hourlyRate;
    document.getElementById('projectCostResult').textContent = projectCost.toFixed(2);
}

function updateValues() {
    calculateHourlyRate();
    calculateProjectCost();
}

function displayValue(elementId, value) {
    document.getElementById(elementId).textContent = value;
}
