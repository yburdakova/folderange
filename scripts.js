document.querySelector('.range-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.querySelector('.range-form-input').value;
  const [start, end] = input.split('-').map(Number);
  const foldersDiv = document.querySelector('.folders');
  foldersDiv.innerHTML = '<h3 class="title">Mark the folders that are in the box</h3>'; 
  
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

    // Automatically check the first and last checkbox
    if (i === start || i === end) {
      checkbox.checked = true;
      div.classList.add('checked');
    }

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

  foldersDiv.classList.remove('hidden');

  const doneButton = document.createElement('button');
  doneButton.classList.add('done-button');
  doneButton.textContent = 'DONE';
  doneButton.addEventListener('click', function() {
    const missingFiles = [];
    const eFiles = [];
    let checkedCount = 0;

    for (let i = start; i <= end; i++) {
      const checkbox = document.getElementById(`folder-${i}`);
      if (!checkbox.checked) {
        missingFiles.push(i);
      } else {
        eFiles.push(`0${i}`);
        checkedCount++;
      }
    }

    const missingFilesText = formatMissingFiles(missingFiles);
    const eFilesText = eFiles.join(', ');
    const eRangeText = `0${start}-0${end}`;

    document.querySelector('#missing-files p').textContent = missingFilesText;
    document.querySelector('#e-files p').textContent = eFilesText;
    document.querySelector('#amount p').textContent = checkedCount;
    document.querySelector('#e-range p').textContent = eRangeText;

    document.querySelectorAll('.copyable').forEach(element => {
      element.addEventListener('click', function(event) {
        const text = event.target.textContent;
        navigator.clipboard.writeText(text).then(() => {
          showCopyNotification(event.clientX, event.clientY);
        });
      });
    });

    document.querySelector('.final-data').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  foldersDiv.appendChild(doneButton);
});

function formatMissingFiles(missingFiles) {
  if (missingFiles.length === 0) {
    return '';
  }

  let ranges = [];
  let start = missingFiles[0];
  let end = missingFiles[0];

  for (let i = 1; i < missingFiles.length; i++) {
    if (missingFiles[i] === end + 1) {
      end = missingFiles[i];
    } else {
      if (end === start) {
        ranges.push(`0${start}`);
      } else if (end === start + 1) {
        ranges.push(`0${start}`, `0${end}`);
      } else {
        ranges.push(`0${start}-0${end}`);
      }
      start = missingFiles[i];
      end = missingFiles[i];
    }
  }
  if (end === start) {
    ranges.push(`0${start}`);
  } else if (end === start + 1) {
    ranges.push(`0${start}`, `0${end}`);
  } else {
    ranges.push(`0${start}-0${end}`);
  }

  return ranges.join(', ');
}

function showCopyNotification(x, y) {
  const notification = document.getElementById('copy-notification');
  notification.style.left = `${x}px`;
  notification.style.top = `${y}px`;
  notification.classList.remove('hidden');
  notification.classList.add('visible');
  setTimeout(() => {
    notification.classList.remove('visible');
    notification.classList.add('hidden');
  }, 1500);
}
