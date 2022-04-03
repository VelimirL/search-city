export const deleteSearchResults = () => {
  const parentElement = document.getElementById('searchResults');
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildOpenResults = (resOpen) => {
  const searcResults = document.getElementById('searchResults');
  const createOpenDiv = document.createElement('div');
  createOpenDiv.setAttribute('id', 'openFlex');
  searcResults.append(createOpenDiv);
  const openFlex = document.getElementById('openFlex');

  const sunrise = new Date(0);
  sunrise.setUTCSeconds(resOpen.sys.sunrise);
  const sunset = new Date(0);
  sunset.setUTCSeconds(resOpen.sys.sunset);

  openFlex.innerHTML = `
  <div class="openString">${resOpen.name} ${resOpen.sys.country}</div>
    <div class="openUsual"><span class="openHl">Weather · </span>${resOpen.weather[0].description} · ${resOpen.main.temp.toFixed(1)}°</div>
    <div class="openUsual"><span class="openHl">Sunrise at · </span>${sunrise.toLocaleString()}</div>
    <div class="openUsual"><span class="openHl">Sunset at · </span>${sunset.toLocaleString()}</div>
  `;
};

export const buildSearchResults = (resultArray) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContents = document.createElement('div');
    resultContents.classList.add('resultContents');
    if (result.img) {
      const resultImage = createResultImage(result);
      resultContents.append(resultImage);
    }
    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);
    const searchResults = document.getElementById('searchResults');
    searchResults.append(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};

const createResultImage = (result) => {
  const resultImage = document.createElement('div');
  resultImage.classList.add('resultImage');
  const img = document.createElement('img');
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
};

const createResultText = (result) => {
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('resultDescription');
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

export const clearStatsLine = () => {
  document.getElementById('stats').textContent = '';
};

export const setStatsLine = (searchTerm, numberOfResults) => {
  const statLine = document.getElementById('stats');
  let searchCapitalized = '';
  for (let i = 0; i < searchTerm.length; i++) {
    if (i === 0) {
      searchCapitalized += searchTerm[i].toUpperCase();
    } else {
      searchCapitalized += searchTerm[i].toLowerCase();
    }
  }

  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results related to ${searchCapitalized}.`;
  } else {
    statLine.textContent = 'Sorry, no such place found.';
  }
};
