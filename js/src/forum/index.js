import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo-carousel-grids', () => {
  extend(IndexPage.prototype, 'view', function(vnode) {
    const items = app.forum.attribute('carouselGrids.items');
    if (!items || items.length === 0) return;

    const scope = app.forum.attribute('carouselGrids.scope') || 'homepage';
    if (scope !== 'homepage' && scope !== 'all') return;

    const position = app.forum.attribute('carouselGrids.position') || 'after_hero';
    const carousel = m('.container', m(CarouselGrids));

    if (position === 'before_footer') {
      vnode.children.push(carousel);
    } else {
      const hero = vnode.children.find(c => c && c.attrs && c.attrs.className && c.attrs.className.includes('Hero'));
      if (hero) {
        vnode.children.splice(vnode.children.indexOf(hero) + 1, 0, carousel);
      } else {
        vnode.children.unshift(carousel);
      }
    }
  });

  extend(DiscussionPage.prototype, 'view', function(vnode) {
    const scope = app.forum.attribute('carouselGrids.scope');
    if (scope !== 'all') return;

    const items = app.forum.attribute('carouselGrids.items');
    if (!items || items.length === 0) return;

    const carousel = m('.container', m(CarouselGrids));
    vnode.children.unshift(carousel);
  });
});
