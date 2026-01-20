const activityNames = {
  nhk: 'Lecture article NHK',
  asahi: 'Lecture article Asahi',
  drama: 'Visionnage drama',
  anime: 'Visionnage animé',
  youtube: 'Visionnage vidéo youtube',
  anki: 'Anki'
};

let currentActivities = {};
let allActivitiesData = {};

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function displayCurrentDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDate').textContent = today.toLocaleDateString('fr-FR', options);
}

function renderCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  console.log('renderCalendar - allActivitiesData:', allActivitiesData);

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const calendarElement = document.getElementById('calendar');
  calendarElement.innerHTML = '';

  const dayHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  dayHeaders.forEach(dayName => {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'calendar-day-header';
    headerDiv.textContent = dayName;
    calendarElement.appendChild(headerDiv);
  });

  for (let i = 0; i < adjustedStartDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'calendar-day empty';
    calendarElement.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = day;

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const isToday = dateString === getTodayDate();
    const hasActivity = allActivitiesData[dateString] && Object.keys(allActivitiesData[dateString]).length > 0;

    console.log(`Day ${day} (${dateString}): isToday=${isToday}, hasActivity=${hasActivity}, data=`, allActivitiesData[dateString]);

    if (isToday) {
      dayDiv.classList.add('today');
    } else if (hasActivity) {
      dayDiv.classList.add('has-activity');
    } else {
      dayDiv.classList.add('no-activity');
    }

    calendarElement.appendChild(dayDiv);
  }
}

function renderBadges() {
  const badgesArea = document.getElementById('badgesArea');
  badgesArea.innerHTML = '';

  if (Object.keys(currentActivities).length === 0) {
    badgesArea.innerHTML = '<div class="empty-state">Aucune activité sélectionnée</div>';
    return;
  }

  Object.entries(currentActivities).forEach(([activityKey, count]) => {
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.dataset.activity = activityKey;

    const activityName = document.createElement('span');
    activityName.textContent = activityNames[activityKey];
    badge.appendChild(activityName);

    if (count > 1) {
      const countSpan = document.createElement('span');
      countSpan.className = 'badge-count';
      countSpan.textContent = count;
      badge.appendChild(countSpan);
    }

    badge.addEventListener('click', () => removeBadge(activityKey));
    badgesArea.appendChild(badge);
  });
}

function addActivity(activityKey) {
  if (currentActivities[activityKey]) {
    currentActivities[activityKey]++;
  } else {
    currentActivities[activityKey] = 1;
  }
  renderBadges();
  saveActivities();
}

function removeBadge(activityKey) {
  if (currentActivities[activityKey] > 1) {
    currentActivities[activityKey]--;
  } else {
    delete currentActivities[activityKey];
  }
  renderBadges();
  saveActivities();
}

async function loadActivities() {
  try {
    allActivitiesData = await window.electronAPI.loadActivities();
    const today = getTodayDate();
    currentActivities = allActivitiesData[today] || {};
    renderBadges();
    renderCalendar();
  } catch (error) {
    console.error('Error loading activities:', error);
  }
}

async function saveActivities() {
  try {
    const today = getTodayDate();
    allActivitiesData[today] = currentActivities;
    await window.electronAPI.saveActivities(allActivitiesData);
    renderCalendar();
  } catch (error) {
    console.error('Error saving activities:', error);
  }
}

function initializeApp() {
  displayCurrentDate();
  loadActivities();

  const activityButtons = document.querySelectorAll('.activity-btn');
  activityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const activity = button.dataset.activity;
      addActivity(activity);
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeApp);
