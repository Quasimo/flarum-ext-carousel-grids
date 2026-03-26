import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo/flarum-ext-carousel-grids', () => {
  extend(IndexPage.prototype, 'hero', function (items) {
    items.add('carousel-grids', <CarouselGrids />, 10);
  });
});
