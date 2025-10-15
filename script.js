const searchFilters = document.querySelector('.search-filters')

const activeFilters = {
  technology: '',
  location: '',
  experience: '',
}

const jobs = document.querySelectorAll('article')

searchFilters.addEventListener('change', (event) => {
  const target = event.target

  if (target.name !== null) {
    activeFilters[target.name] = target.value
    applyFilters()
  }
})

const applyFilters = () => {
  jobs.forEach((job) => {
    const small =
      job.querySelector('small')?.textContent.trim().toLowerCase() || ''
    const p = job.querySelector('p')?.textContent.trim().toLowerCase() || ''

    let visible = true

    if (activeFilters.location && !small.includes(activeFilters.location)) {
      visible = false
    }

    if (activeFilters.technology && !p.includes(activeFilters.technology)) {
      visible = false
    }

    if (activeFilters.experience && !p.includes(activeFilters.experience)) {
      visible = false
    }

    job.classList.toggle('is-hidden', !visible)
  })
}
