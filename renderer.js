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
  } catch (error) {
    console.error('Error loading activities:', error);
  }
}

async function saveActivities() {
  try {
    const today = getTodayDate();
    allActivitiesData[today] = currentActivities;
    await window.electronAPI.saveActivities(allActivitiesData);
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
