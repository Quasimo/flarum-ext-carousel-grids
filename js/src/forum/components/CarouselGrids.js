import Component from 'flarum/Component';
import app from 'flarum/app';

export default class CarouselGrids extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.items = app.forum.attribute('carouselGrids.items') || [];
    this.columns = app.forum.attribute('carouselGrids.columns') || 3;
    this.currentIndex = 0;
    this.interval = null;
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    if (this.items.length > this.columns) {
      this.startAutoScroll();
    }
  }

  onremove(vnode) {
    super.onremove(vnode);
    if (this.interval) clearInterval(this.interval);
  }

  startAutoScroll() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      m.redraw();
    }, 3000);
  }

  view() {
    if (!this.items.length) return null;

    const visibleItems = [];
    for (let i = 0; i < this.columns; i++) {
      const index = (this.currentIndex + i) % this.items.length;
      visibleItems.push(this.items[index]);
    }

    return (
      <div className="CarouselGrids">
        <div className="CarouselGrids-container" style={`grid-template-columns: repeat(${this.columns}, 1fr)`}>
          {visibleItems.map(item => this.renderItem(item))}
        </div>
      </div>
    );
  }

  renderItem(item) {
    const content = (
      <div
        className={`CarouselGrids-item CarouselGrids-item--${item.imagePosition || 'top'}`}
        style={item.backgroundImage ? `background-image: url(${item.backgroundImage})` : ''}
      >
        {item.logo && (
          <div className="CarouselGrids-logo">
            <img src={item.logo} alt={item.title} />
          </div>
        )}
        <div className="CarouselGrids-content">
          <h3 className="CarouselGrids-title">{item.title}</h3>
          <p className="CarouselGrids-description">{item.description}</p>
        </div>
      </div>
    );

    return item.link ? (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : content;
  }
}
