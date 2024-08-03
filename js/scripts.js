document.querySelector('.range-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.querySelector('.range-form-input').value;
  const [start, end] = input.split('-').map(Number);
  const foldersDiv = document.querySelector('.folders');
  foldersDiv.innerHTML = '<h3>Mark the folders that are in the box</h3>';

  if (isNaN(start) || isNaN(end) || start > end) {
    alert('Please enter a valid range.');
    return;
  }

  for (let i = start; i <= end; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `folder-${i}`;
    checkbox.name = `folder-${i}`;
    checkbox.value = i;

    const label = document.createElement('label');
    label.htmlFor = `folder-${i}`;
    label.appendChild(document.createTextNode(`${i}`));

    const div = document.createElement('div');
    div.appendChild(checkbox);
    div.appendChild(label);

    div.addEventListener('click', function() {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        div.classList.add('checked');
      } else {
        div.classList.remove('checked');
      }
    });

    foldersDiv.appendChild(div);
  }

  const doneButton = document.createElement('button');
  doneButton.classList.add('done-button');
  doneButton.textContent = 'DONE';
  doneButton.addEventListener('click', function() {
    const missingFiles = [];
    const eFiles = [];

    for (let i = start; i <= end; i++) {
      const checkbox = document.getElementById(`folder-${i}`);
      if (!checkbox.checked) {
        missingFiles.push(i);
      } else {
        eFiles.push(`0${i}`);
      }
    }

    document.querySelector('#missing-files p').textContent = missingFiles.join(', ');
    document.querySelector('#e-files p').textContent = eFiles.join(', ');
  });

  foldersDiv.appendChild(doneButton);
});
