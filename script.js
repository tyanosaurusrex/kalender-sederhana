var monthField = document.querySelector('.monthField');
var yearField = document.querySelector('.yearField');
var submit = document.querySelector('.submit');
var calendar = document.querySelector('.calendar');
calendar.style.whiteSpace = 'pre';

var days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

function generateCalendar(){
  var month = monthField.value;
  var year = yearField.value;
  var dayArray = [];

  if (year === ''){
    alert('Pilih bulan dan masukkan tahun');
  } else {
    var manyDaysInMonth = new Date(year, month, 0).getDate();
    var firstDay = new Date(year + '-' + month + '-' + 1).getDay();

    firstDay = (firstDay != 0) ? firstDay - 1 : 6;

    var countDate = 1;
    var lastMonth = new Date(year, month - 1, 0).getDate();
    var lastMonthInWeek = lastMonth - firstDay + 1;
    var weeks = Math.ceil((manyDaysInMonth - (days.length - firstDay)) / 7) + 1;
    
    for (i = 1; i <= weeks; i++){
      dayArray[i] = [];
      for (j = 0; j < days.length; j++){
        if (firstDay !== 0){
          if (lastMonthInWeek <= lastMonth){
            dayArray[i][j] = lastMonthInWeek;
            lastMonthInWeek++;
          } else {
            if (countDate <= manyDaysInMonth){
              dayArray[i][j] = countDate;
            } else {
              dayArray[i][j] = countDate%manyDaysInMonth;
            }
            countDate++;
          }
        } else {
          if (countDate <= manyDaysInMonth){
            dayArray[i][j] = countDate;
          } else {
            dayArray[i][j] = countDate%manyDaysInMonth;
          }
          countDate++;
        }
      }
    }
  }
  render(weeks, dayArray);
}

function render(weeks, dayArray){
  var show = '';
  for (var i = 0; i <= weeks; i++){
    for (var j = 0; j < days.length; j++){
      if (i === 0){
        show += String(days[j]).padStart(7, ' ') + ' ';
      } else {
        show += String(dayArray[i][j]).padStart(7, ' ') + ' ';
      }
    }
    show += '\n';
  }
  calendar.textContent = show;
}

submit.addEventListener('click', generateCalendar);