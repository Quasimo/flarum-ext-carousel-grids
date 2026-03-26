import app from 'flarum/app';
import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo-carousel-grids', () => {
  extend(IndexPage.prototype, 'hero', function (items) {
    items.add('carousel-grids', <CarouselGrids />, 10);
  });
});
