import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class CarouselGridEditModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    const item = this.attrs.item || {};
    this.title = item.title || '';
    this.description = item.description || '';
    this.backgroundImage = item.backgroundImage || '';
    this.logo = item.logo || '';
    this.link = item.link || '';
    this.imagePosition = item.imagePosition || 'top';
  }

  className() {
    return 'CarouselGridEditModal Modal--small';
  }

  title() {
    return app.translator.trans(this.attrs.item ? 'carousel-grids.admin.edit_item' : 'carousel-grids.admin.add_item');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.title')}</label>
            <input className="FormControl" value={this.title} oninput={(e) => (this.title = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.description')}</label>
            <textarea className="FormControl" value={this.description} oninput={(e) => (this.description = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.background_image')}</label>
            <input className="FormControl" value={this.backgroundImage} oninput={(e) => (this.backgroundImage = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.logo')}</label>
            <input className="FormControl" value={this.logo} oninput={(e) => (this.logo = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.link')}</label>
            <input className="FormControl" value={this.link} oninput={(e) => (this.link = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.image_position')}</label>
            <select className="FormControl" value={this.imagePosition} onchange={(e) => (this.imagePosition = e.target.value)}>
              <option value="top">{app.translator.trans('carousel-grids.admin.position_top')}</option>
              <option value="left">{app.translator.trans('carousel-grids.admin.position_left')}</option>
            </select>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" type="submit">
              {app.translator.trans('core.admin.basics.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();
    this.attrs.onsubmit({
      title: this.title,
      description: this.description,
      backgroundImage: this.backgroundImage,
      logo: this.logo,
      link: this.link,
      imagePosition: this.imagePosition,
    });
    app.modal.close();
  }
}
