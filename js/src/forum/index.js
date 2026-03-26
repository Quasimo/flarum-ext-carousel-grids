import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo-carousel-grids', () => {
  extend(IndexPage.prototype, 'view', function (vnode) {
    const items = app.forum.attribute('carouselGrids.items');
    if (items && items.length > 0) {
      vnode.children.unshift(<CarouselGrids />);
    }
  });
});
