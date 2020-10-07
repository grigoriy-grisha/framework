export const cardRender = (card: string) => {
  return `
      <div class="card blue-grey darken-1">
        <a href="#search">
          <div class="card-content white-text">
            <i class="material-icons" style="color: #43A047">control_point</i>
            <span class="card-title">${card}</span>
            <span>1800</span>
          </div>
        </a>
        <div class="card-action">
          Никакие продукты еще не были добавлены
        </div>
      </div>`;
};
