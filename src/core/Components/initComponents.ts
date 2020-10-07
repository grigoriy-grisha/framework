import { WrapperComponents } from "./WrapperComponents";
export function initComponents(component: any, store: any, className: string) {
    
  if (component) {
    const instance = new WrapperComponents({
      components: [component],
      class: className,
      store,
    });

    return {
        html: instance.getRoot(),
        init: instance.init,
        destroy: instance.destroy
    }
  } else {
      throw Error('Provide to component!')
  }
}
