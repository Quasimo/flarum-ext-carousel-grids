import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import Page from 'flarum/common/components/Page';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo-carousel-grids', () => {
  const shouldDisplay = (page) => {
    const scope = app.forum.attribute('carouselGrids.scope') || 'homepage';
    if (scope === 'homepage') {
      return page instanceof IndexPage;
    }
    return true;
  };

  extend(Page.prototype, 'view', function (vnode) {
    if (!shouldDisplay(this)) return;

    const items = app.forum.attribute('carouselGrids.items');
    if (!items || items.length === 0) return;

    const position = app.forum.attribute('carouselGrids.position') || 'after_hero';
    const carousel = <div className="container"><CarouselGrids /></div>;

    if (position === 'before_footer') {
      const footer = vnode.children.find(child => child && child.attrs && child.attrs.id === 'footer');
      if (footer) {
        const footerIndex = vnode.children.indexOf(footer);
        vnode.children.splice(footerIndex, 0, carousel);
      }
    } else {
      const hero = vnode.children.find(child => child && child.tag === 'header' && child.attrs && child.attrs.className && child.attrs.className.includes('Hero'));
      if (hero) {
        const heroIndex = vnode.children.indexOf(hero);
        vnode.children.splice(heroIndex + 1, 0, carousel);
      } else {
        vnode.children.unshift(carousel);
      }
    }
  });
});
