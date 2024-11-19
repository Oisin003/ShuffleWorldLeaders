// Array to store information about world leaders
let leaders = [
  { name: 'Joe Biden', country: 'America', path: './worldLeaders/biden.jpg' },
  { name: 'Frank-Walter Steinmeier', country: 'Germany', path: './worldLeaders/german.jpg' },
  { name: 'Giorgia Meloni', country: 'Italy', path: './worldLeaders/italy.jpg' },
  { name: 'Margrethe Alexandrine Þórhildur Ingrid', country: 'Denmark', path: './worldLeaders/denmark.jpg' },
  { name: 'Kim Jong Un', country: 'North Korea', path: './worldLeaders/northKorea.jpg' },
  { name: 'Rishi Sunak', country: 'Britain', path: './worldLeaders/britian.jpg' },
  { name: 'Micheál Martin', country: 'Ireland', path: './worldLeaders/ireland.jpg' },
  { name: 'Emmanuel Macron', country: 'France', path: './worldLeaders/france.jpg' },
  { name: 'Xi Jinping', country: 'China', path: './worldLeaders/china.jpg' },
  { name: 'Naruhito', country: 'Japan', path: './worldLeaders/japan.jpg' }
];

// Array to store deleted leaders
let deletedLeaders = [];

// Function to update the page with the latest leader information
function updatePage() {
  // Update the displayed leaders
  let imageBox = document.getElementById('imageBox');
  imageBox.innerHTML = '';

  // Display leaders based on the current number
  leaders.slice(0, leaders.length).forEach((leader, index) => {
    let img = document.createElement('img');
    img.src = leader.path || 'default-path.jpg';
    img.alt = leader.name;
    img.title = leader.name;
    img.classList.add('leader');
    img.id = `leaderImg_${index}`; // Set a unique ID for each image
    img.addEventListener('mouseover', () => displayLeaderName(leader.name));
    img.addEventListener('mouseout', hideLeaderName);
    imageBox.appendChild(img);
  });

  // Update the leaders list
  let list = document.getElementById('list');
  list.innerHTML = '';
  leaders.forEach((leader) => {
    let li = document.createElement('li');
    li.textContent = `${leader.name} - ${leader.country}`;
    list.appendChild(li);
  });

  // Disable delete button if there are no leaders
  let deleteButton = document.getElementById('deleteButton');
  deleteButton.disabled = leaders.length === 0;
}

// Function to display the leader's name in the textbox
function displayLeaderName(name) {
  let leaderNameTextbox = document.getElementById('name');
  leaderNameTextbox.textContent = `World Leader: ${name}`;
  leaderNameTextbox.style.visibility = 'visible';
}

// Function to hide the leader's name when not hovering over an image
function hideLeaderName() {
  let leaderNameTextbox = document.getElementById('name');
  leaderNameTextbox.style.visibility = 'hidden';
}


// Function to add a new leader
function add() {
  if (leaders.length < 10) {
    if (deletedLeaders.length > 0) {
      // If there are deleted leaders, pop one and add it back
      let deletedLeader = deletedLeaders.pop();
      leaders.push(deletedLeader);
    } else {
      // If no deleted leaders, add a new one
      leaders.push({ name: 'New Leader', country: 'New Country', path: 'default-path.jpg' });
    }
    updatePage();
  }
}

// Function to delete a leader
function remove() {
  if (leaders.length > 0) {
    // Remove the leader and push it to deletedLeaders
    let deletedLeader = leaders.shift();
    deletedLeaders.push(deletedLeader);
    updatePage();
  }
}

// Function to highlight a leader on mouseover
function highlightLeader(index) {
  let imageBox = document.getElementById('imageBox');
  imageBox.children[index].style.border = '2px solid #f00';
}

// Function to remove the highlight from leaders
function removeHighlight() {
  let imageBox = document.getElementById('imageBox');
  Array.from(imageBox.children).forEach((child) => {
    child.style.border = '2px solid #ddd';
  });
}

// Function to shuffle leaders randomly
function shuffle() {
  leaders = leaders.sort(() => Math.random() - 0.5);
  updatePage();
}

// Function to swap the first and last leaders
function swap() {
  if (leaders.length > 1) {
    [leaders[0], leaders[leaders.length - 1]] = [leaders[leaders.length - 1], leaders[0]];
    updatePage();
  }
}

// Event listener to update the page on content load
document.addEventListener('DOMContentLoaded', function () {
  updatePage();
});
