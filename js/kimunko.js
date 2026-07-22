document.documentElement.classList.remove('no-js');

const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('#site-navigation');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

const dialog = document.querySelector('[data-search-dialog]');
const searchInput = document.querySelector('[data-search-input]');
const results = document.querySelector('[data-search-results]');
let searchIndex;

document.querySelector('[data-search-open]')?.addEventListener('click', async () => {
  dialog.showModal();
  searchInput.focus();
  if (!searchIndex) {
    const response = await fetch(`${document.documentElement.lang.startsWith('en') ? '/en' : ''}/index.json`);
    searchIndex = await response.json();
  }
});

document.querySelector('[data-search-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase();
  results.replaceChildren();
  if (query.length < 2) return;

  const matches = searchIndex.filter(item =>
    `${item.title} ${item.description} ${item.content}`.toLocaleLowerCase().includes(query)
  ).slice(0, 12);

  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'search-empty';
    empty.textContent = results.dataset.empty;
    results.append(empty);
    return;
  }

  matches.forEach(item => {
    const link = document.createElement('a');
    const title = document.createElement('strong');
    const description = document.createElement('span');
    link.className = 'search-result';
    link.href = item.url;
    title.textContent = item.title;
    description.textContent = item.description;
    link.append(title, description);
    results.append(link);
  });
});

const publicationBrowser = document.querySelector('[data-publications]');

if (publicationBrowser) {
  const publicationSearch = publicationBrowser.querySelector('[data-publication-search]');
  const publicationYear = publicationBrowser.querySelector('[data-publication-year]');
  const publicationItems = [...publicationBrowser.querySelectorAll('[data-publication-item]')];
  const publicationGroups = [...publicationBrowser.querySelectorAll('[data-publication-group]')];
  const publicationCount = publicationBrowser.querySelector('[data-publication-count]');
  const publicationEmpty = publicationBrowser.querySelector('[data-publication-empty]');

  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

  const filterPublications = () => {
    const query = normalize(publicationSearch.value.trim());
    const year = publicationYear.value;
    let visible = 0;

    publicationItems.forEach(item => {
      const matchesText = !query || normalize(item.dataset.search).includes(query);
      const matchesYear = !year || item.dataset.year === year;
      item.hidden = !(matchesText && matchesYear);
      if (!item.hidden) visible += 1;
    });

    publicationGroups.forEach(group => {
      group.hidden = !group.querySelector('[data-publication-item]:not([hidden])');
    });

    publicationCount.textContent = String(visible);
    publicationEmpty.hidden = visible !== 0;
  };

  publicationSearch.addEventListener('input', filterPublications);
  publicationYear.addEventListener('change', filterPublications);
}
