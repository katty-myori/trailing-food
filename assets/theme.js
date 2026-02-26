document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('[data-food-filter]');
  const cards = document.querySelectorAll('[data-food-grid] .food-card');

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.foodFilter;

      filterButtons.forEach((chip) => chip.classList.remove('is-active'));
      button.classList.add('is-active');

      cards.forEach((card) => {
        const category = card.dataset.category;
        const isVisible = filter === 'all' || category === filter;
        card.style.display = isVisible ? '' : 'none';
      });
    });
  });
});
