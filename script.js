const searchFilters = document.querySelector('.search-filters')

const activeFilters = {
  technology: '',
  location: '',
  experience: '',
}

searchFilters.addEventListener('change', (event) => {
  const target = event.target

  if (target.name !== null) {
    activeFilters[target.name] = target.value
    applyFilters()
  }
})

const applyFilters = () => {
  const jobs = document.querySelectorAll('article')

  jobs.forEach((job) => {
    const technology = job.dataset.technology
    const location = job.dataset.location
    const experience = job.dataset.experience

    let isShown = true

    if (
      activeFilters.technology &&
      !technology.includes(activeFilters.technology)
    ) {
      isShown = false
    }

    if (activeFilters.location && activeFilters.location !== location) {
      isShown = false
    }

    if (activeFilters.experience && activeFilters.experience !== experience) {
      isShown = false
    }

    job.classList.toggle('is-hidden', !isShown)
  })
}

// Dinamic jobs
const jobsContainer = document
  .querySelector('.search-results')
  .querySelector('div')

const loading = document.querySelector('#jobs-loading')

fetch('./data.json')
  .then((response) => response.json())
  .then((jobs) => {
    if (loading) loading.remove()

    if (jobs.length === 0) {
      const p = document.createElement('p')
      p.textContent = 'No hay empleos disponibles por ahora.'

      jobsContainer.appendChild(p)
      return
    }

    jobs.forEach((job) => {
      const article = document.createElement('article')

      article.dataset.technology = job.data.technology
      article.dataset.location = job.data.location
      article.dataset.experience = job.data.experience

      const wrapper = document.createElement('div')

      const h3 = document.createElement('h3')
      h3.textContent = job.title

      const small = document.createElement('small')
      small.textContent = `${job.company} | ${job.location}`

      const p = document.createElement('p')
      p.textContent = job.description

      const applyButton = document.createElement('button')
      applyButton.textContent = 'Aplicar'

      wrapper.append(h3, small, p)
      article.append(wrapper, applyButton)
      jobsContainer.appendChild(article)
    })
  })
  .catch((error) => {
    if (loading) loading.textContent = 'No se pudieron cargar los empleos'
    console.error(error)
  })
