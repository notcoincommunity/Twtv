import './style.css'

const mockTitles = [
  {
    id: 1,
    title: 'Властелин колец',
    category: 'films',
    poster: 'https://images.unsplash.com/photo-1574267432644-f610fa4d3b0c?w=400&h=600&fit=crop',
    genres: ['Фэнтези', 'Приключения', 'Драма'],
    streamers: ['Дерзко69', 'Заквиель', 'Братишкин'],
    description: 'Эпическая трилогия о борьбе добра и зла в фантастическом мире Средиземья.',
    episodes: [
      { title: 'Часть 1', streamers: ['Дерзко69', 'Заквиель'] },
      { title: 'Часть 2', streamers: ['Братишкин', 'Заквиель'] },
      { title: 'Часть 3', streamers: ['Дерзко69', 'Братишкин'] }
    ]
  },
  {
    id: 2,
    title: 'Атака титанов',
    category: 'anime',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    genres: ['Аниме', 'Боевик', 'Драма'],
    streamers: ['Пятёрка', 'Морфи', 'Динаблин'],
    description: 'Человечество живёт в городах, окружённых высокими стенами, защищающими от титанов.',
    episodes: [
      { title: 'Сезон 1', streamers: ['Пятёрка', 'Морфи'] },
      { title: 'Сезон 2', streamers: ['Динаблин', 'Пятёрка'] },
      { title: 'Сезон 3', streamers: ['Морфи', 'Динаблин'] }
    ]
  },
  {
    id: 3,
    title: 'Игра престолов',
    category: 'series',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    genres: ['Драма', 'Фэнтези', 'Боевик'],
    streamers: ['Зубарев', 'Эвелон', 'Гаечка'],
    description: 'Великие дома ведут смертельную игру за власть над Семью Королевствами.',
    episodes: [
      { title: 'Сезон 1', streamers: ['Зубарев', 'Эвелон'] },
      { title: 'Сезон 2', streamers: ['Гаечка', 'Зубарев'] }
    ]
  },
  {
    id: 4,
    title: 'Корпорация монстров',
    category: 'cartoons',
    poster: 'https://images.unsplash.com/photo-1627873649417-c67f701f1949?w=400&h=600&fit=crop',
    genres: ['Мультфильм', 'Комедия', 'Семейный'],
    streamers: ['Морфилина', 'Байовл', 'Ураниум'],
    description: 'Монстры получают энергию из детских криков, работая в корпорации.',
    episodes: [
      { title: 'Фильм', streamers: ['Морфилина', 'Байовл', 'Ураниум'] }
    ]
  },
  {
    id: 5,
    title: 'Бегущий по лезвию 2049',
    category: 'films',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    genres: ['Фантастика', 'Триллер', 'Драма'],
    streamers: ['Папич', 'Скиллзор', 'Стил'],
    description: 'Офицер полиции раскрывает тайну, которая может разрушить общество.',
    episodes: [
      { title: 'Фильм', streamers: ['Папич', 'Скиллзор', 'Стил'] }
    ]
  },
  {
    id: 6,
    title: 'Хантер × Хантер',
    category: 'anime',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop',
    genres: ['Аниме', 'Приключения', 'Боевик'],
    streamers: ['Заквиель', 'Дерзко69'],
    description: 'Юный Гон ищет отца и становится Хантером.',
    episodes: [
      { title: 'Сезон 1', streamers: ['Заквиель', 'Дерзко69'] }
    ]
  },
  {
    id: 7,
    title: 'Рик и Морти',
    category: 'cartoons',
    poster: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&h=600&fit=crop',
    genres: ['Мультфильм', 'Комедия', 'Фантастика'],
    streamers: ['Строго', 'Шадоукек', 'Мокривский'],
    description: 'Приключения гениального учёного и его внука по мультивселенной.',
    episodes: [
      { title: 'Сезон 1', streamers: ['Строго', 'Шадоукек'] },
      { title: 'Сезон 2', streamers: ['Мокривский', 'Строго'] }
    ]
  },
  {
    id: 8,
    title: 'Очень странные дела',
    category: 'series',
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
    genres: ['Ужасы', 'Фантастика', 'Драма'],
    streamers: ['Байовл', 'Равшан', 'Квикхантик'],
    description: 'Таинственные события в маленьком городке в 80-х годах.',
    episodes: [
      { title: 'Сезон 1', streamers: ['Байовл', 'Равшан'] },
      { title: 'Сезон 2', streamers: ['Квикхантик', 'Байовл'] }
    ]
  }
]

let currentCategory = 'all'
let currentTitle = null

function renderTitles(category = 'all', searchQuery = '') {
  const grid = document.getElementById('titlesGrid')

  let filtered = mockTitles

  if (category !== 'all') {
    filtered = mockTitles.filter(t => t.category === category)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.streamers.some(s => s.toLowerCase().includes(query)) ||
      t.genres.some(g => g.toLowerCase().includes(query))
    )
  }

  grid.innerHTML = filtered.map(title => `
    <div class="title-card" data-id="${title.id}">
      <div class="title-poster">
        <img src="${title.poster}" alt="${title.title}">
      </div>
      <div class="title-info">
        <div class="title-name">${title.title}</div>
        <div class="title-meta">
          ${title.genres.map(g => `<span class="meta-tag">${g}</span>`).join('')}
        </div>
        <div class="streamers-list">
          ${title.streamers.slice(0, 3).map(s => `<span class="streamer-chip">${s}</span>`).join('')}
          ${title.streamers.length > 3 ? `<span class="streamer-chip">+${title.streamers.length - 3}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('')

  document.querySelectorAll('.title-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id)
      openModal(id)
    })
  })
}

function openModal(titleId) {
  const title = mockTitles.find(t => t.id === titleId)
  if (!title) return

  currentTitle = title
  const modal = document.getElementById('titleModal')
  const modalBody = document.getElementById('modalBody')

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-backdrop">
        <img src="${title.poster}" alt="">
      </div>
      <div class="modal-poster">
        <img src="${title.poster}" alt="${title.title}">
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-title-section">
        <h1 class="modal-title">${title.title}</h1>
        <div class="modal-genres">
          ${title.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
        <p class="modal-description">${title.description}</p>
      </div>

      <div class="streamers-section">
        <h3 style="color: var(--text-primary); margin-bottom: 16px; font-size: 20px;">Выберите стримера</h3>
        <div class="streamers-tabs">
          ${title.streamers.map((s, i) => `
            <button class="streamer-tab ${i === 0 ? 'active' : ''}" data-streamer="${s}">
              ${s}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="player-section">
        <div class="player-placeholder">
          Видео плеер (${title.streamers[0]})
        </div>
      </div>

      ${title.episodes && title.episodes.length > 1 ? `
        <div class="episodes-section">
          <h3 style="color: var(--text-primary); margin-bottom: 16px; font-size: 20px;">Эпизоды</h3>
          <div class="streamers-tabs">
            ${title.episodes.map((ep, i) => `
              <button class="streamer-tab ${i === 0 ? 'active' : ''}" data-episode="${i}">
                ${ep.title}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `

  modal.classList.add('active')

  document.querySelectorAll('.streamer-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const parent = e.target.closest('.streamers-tabs')
      parent.querySelectorAll('.streamer-tab').forEach(t => t.classList.remove('active'))
      e.target.classList.add('active')

      const streamer = e.target.dataset.streamer
      if (streamer) {
        document.querySelector('.player-placeholder').textContent = `Видео плеер (${streamer})`
      }
    })
  })
}

function closeModal() {
  document.getElementById('titleModal').classList.remove('active')
  currentTitle = null
}

document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')

    currentCategory = tab.dataset.category
    renderTitles(currentCategory)
  })
})

document.querySelector('.modal-overlay').addEventListener('click', closeModal)
document.querySelector('.modal-close').addEventListener('click', closeModal)

const searchInputs = document.querySelectorAll('.search-input, .hero-search-input')
searchInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    renderTitles(currentCategory, e.target.value)
  })
})

renderTitles()
