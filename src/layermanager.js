import'Origo';
import FilterMenu from './layermanager/filtermenu';
import LayerListStore from './layermanager/layerliststore';
import Main from './layermanager/main';
import layerRequester from './layermanager/layerrequester';

const Layermanager = function Layermanager(options = {}) {
  let {
    target
  } = options;
  const {
    cls: clsSettings = 'control width-52',
    sourceFields,
    url,
    sourceUrl
  } = options;
 
  const cls = `${clsSettings} flex fade-in box center-center padding-y-small padding-left layer-manager overflow-hidden`.trim();

  let filterMenu;
  let main;
  let viewer;

  const clearCls = 'absolute round small icon-smaller grey-lightest';
  const icon = '#ic_clear_24px';
  const closeButton = Origo.ui.Button({
    cls: clearCls,
    icon,
    style: {
      right: '1rem',
      top: '1rem'
    }
  });

  const openLayermanagerBtn = Origo.ui.Button({
    cls: 'round compact primary icon-small margin-x-smaller',
    click() {
      viewer.dispatch('active:layermanager');
    },
    style: {
      'align-self': 'center'
    },
    icon: '#o_add_24px',
    iconStyle: {
      fill: '#fff'
    }
  });

  const setActive = function setActive() {
    this.render();
  };

  const onClickClose = function onClickClose() {
    document.getElementById(this.getId()).remove();
    this.dispatch('close');
  };

  return Origo.ui.Component({
    onAdd(e) {
      viewer = e.target;
      viewer.on('active:layermanager', setActive.bind(this));
      let legend = viewer.getControlByName('legend');
      legend.addButtonToTools(openLayermanagerBtn);
      main = Main({ 
        viewer,
        sourceFields,
        sourceUrl,
        url
      });
      filterMenu = FilterMenu();
      this.addComponent(closeButton);
      this.addComponent(main);
      this.addComponent(filterMenu);
      closeButton.on('click', onClickClose.bind(this));
    },
    onInit() {
      this.on('render', this.onRender);
    },
    onRender() {
      LayerListStore.clear();
      layerRequester({ url });
    },
    render() {
      const template = `
        <div id="${this.getId()}" class="${cls}" style="height: 700px;">      
          <div class="relative padding-y flex overflow-hidden width-100" style="flex-wrap: wrap;">
            <div class="flex row width-100 overflow-hidden">
              ${filterMenu.render()}
              ${main.render()}
            </div>
          </div>
          ${closeButton.render()}  
        </div>
      `;
    
      const elLayerManger = Origo.ui.dom.html(template);
      target.appendChild(elLayerManger);
      this.dispatch('render');
    }
  });
}

if (window.Origo) {
  Origo.controls.Layermanager = Layermanager;
}

export default Layermanager;