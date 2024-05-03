function calculateHourlyRate() {
    const monthlyCosts = parseFloat(document.getElementById('monthlyCosts').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);
    const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value);

    // Validação de inputs
    if (monthlyCosts < 0 || desiredSalary < 0 || hoursPerDay <= 0 || daysPerWeek <= 0 || daysPerWeek > 7 || vacationWeeks < 0 || vacationWeeks > 52) {
        alert("Por favor, insira valores válidos para todos os campos.");
        return;
    }

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
    const hourlyRate = calculateHourlyRate();  // Recalcula com a validação da função acima

    let totalDays;
    if (document.getElementById('timeOption').value === 'months') {
        totalDays = duration * 30; // Considerando 30 dias por mês para conversão
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
    calculateProjectCost(); // Recalcula o custo do projeto quando a duração é ajustada
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
    calculateProjectCost(); // Garante recálculo do custo do projeto quando dados relacionados à hora mudam
});
document.getElementById('daysPerWeek').addEventListener('input', function() {
    displayValue('daysPerWeekValue', this.value + ' dias');
    calculateHourlyRate();
    calculateProjectCost(); // Garante recálculo do custo do projeto quando dados relacionados à hora mudam
});
document.getElementById('vacationWeeks').addEventListener('input', function() {
    displayValue('vacationWeeksValue', this.value + ' semanas');
    calculateHourlyRate();
    calculateProjectCost(); // Garante recálculo do custo do projeto quando dados relacionados à hora mudam
});
document.getElementById('projectDuration').addEventListener('input', function() {
    let durationType = document.getElementById('timeOption').value === 'months' ? ' meses' : ' dias';
    displayValue('projectDurationValue', this.value + durationType);
    calculateProjectCost();
});

window.onload = function() {
    updateDurationSlider();
    calculateProjectCost();
    calculateHourlyRate(); // Cálculo inicial ao carregar a página
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'button-toggle';
    toggleButton.textContent = 'Switch to Dark Theme'; // Texto inicial
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    });
});
