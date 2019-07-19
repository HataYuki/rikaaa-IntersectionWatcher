import Controller from './Controller';

interface option {rootMargin: string;root:any};
type PartialOption = Partial<option>;
const defaultOption: option = { rootMargin: '0px', root: null };

const controller = new Controller();

export default class rikaaaIntersectionWatcher{
    public option: option;
    public targets: Element[] = [];
    public entries: any = [];

    constructor(public callback: Function, option: PartialOption = {}) {
        this.option = { ...defaultOption, ...option };        

        controller.init(this);
    }
    
    public observe(target:Element) {
        const exist = this.targets.includes(target);
        if (!exist) this.targets.push(target);
        controller.observe();
    }
    public unobserve(target:Element) {
        this.targets = this.targets.filter(existTarget => existTarget !== target);
        controller.unobserve();
    }
    public disconnect() {
        this.targets = [];
        controller.disconnect();
    }

    private static isIntersecting(target:Element,root:Element|any,rootMargin:string):boolean {
        return Controller.isIntersecting(target, root, rootMargin); 
    }
    private static isDisplay(target:Element) {
        return Controller.isDisplay(target);
    }
    private static get THROTTLE_INTERVAL() {
        return Controller.THROTTLE_INTERVAL;
    }
    private static get CONTROLLER() {
        return controller;
    }
}
