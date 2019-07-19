import rikaaaIntersectionWatcher from './rikaaa-IntersectionWatcher';
import isIntersecting from './isIntersecting';
import isDisplay from './IsDisplay';
import throttle from './throttle';
import debounce from './debounce';
import valueObserver from './valueObserver';
import onebang from './onbang';

import './Array.prototype.includes';


export default class Controller{
    private instancesOfintersectionWatcher: rikaaaIntersectionWatcher[] = [];
    private targetsAll: Element[] = [];

    private entriesContaner:rikaaaIntersectionWatcher [];

    private firstCallback: Function;
    
    private watcher_binded: Function | any;

    private scrollAreasOftargets: Element[] = [];

    private mo;
    private mutationObserverConfig = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    };

    // public scrollbarbarThickness: Number | number = 0;

    constructor() {
        this.watcher_binded = throttle(Controller.watcher.bind(null,this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded);
        
        // this.scrollbarbarThickness = isIntersecting.getScrollbarThickness()
        
        this.firstCallback = debounce(onebang((entriesContaner:rikaaaIntersectionWatcher[]) => {
            entriesContaner.forEach(entries => {

                const callbackArg = entries.entries.map(entry => {
                    const isDisplay = Controller.isDisplay(entry.target);
                    if (isDisplay) return Object.freeze(
                        {
                            target:         entry.target,
                            isIntersecting: entry.isIntersecting,
                        }
                    );
                }).filter(entry => typeof entry !== 'undefined');
                
                if(callbackArg.length !== 0) entries.callback(callbackArg);
            });
        }),Controller.THROTTLE_INTERVAL);

    }

    public init(instance:rikaaaIntersectionWatcher) {
        this.instancesOfintersectionWatcher.push(instance);
    }
    public observe() {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.scrollAreasOftargets = Controller.updateScrollAreasOftargets(this.targetsAll);
        if (this.targetsAll.length !== 0) Controller.onWather(this);

        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        this.firstCallback(this.entriesContaner);
    }
    public unobserve(){
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
    }
    public disconnect() {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        if (this.targetsAll.length === 0) {
            Controller.offWather(this);
            this.scrollAreasOftargets = [];
        }
    }

    private static watcher(instanse: Controller) {
        instanse.entriesContaner.forEach(entries => {
            
            const callbackArg = entries.entries.map(entry => {
                const option = entries.option;
                const isDisplay = Controller.isDisplay(entry.target);
                const currentIntersecting = Controller.isIntersecting(entry.target, option.root, option.rootMargin);
                const isIntersectionChenge = entry.valueObserver({ watch: currentIntersecting});   

                if (isIntersectionChenge) entry.isIntersecting = currentIntersecting;

                if (isDisplay && isIntersectionChenge) return Object.freeze(
                    {
                        target: entry.target,
                        isIntersecting: entry.isIntersecting,
                    }
                );
            }).filter(entry => typeof entry !== 'undefined');
            
            if (callbackArg.length !== 0) entries.callback(callbackArg);
        });
    }
    private static calculateEntriesContaner(instances: rikaaaIntersectionWatcher[]):rikaaaIntersectionWatcher[] {
        return instances.map(instance => {
            const option = instance.option;

            const entries = instance.targets.map(target => {
                const isIntersecting = Controller.isIntersecting(target, option.root, option.rootMargin);
                return {
                    target: target,
                    isIntersecting: isIntersecting,
                    valueObserver: valueObserver(isIntersecting, ():boolean => true),
               } 
            });

            instance.entries = entries;

            return instance;
        });
    }
    private static updateTargetsAll(instance: Controller):Element[] {
        return instance.instancesOfintersectionWatcher.map(instance => instance.targets).reduce((a, c) => a.concat(c), []);
    }
    private static updateScrollAreasOftargets(targetsAll: Element[]): Element[]{
        const computeParentNode = (target: Element):Element[] => {
            const tree = [];
            const html = document.documentElement;

            let parent = target;

            while (parent !== html) {
                parent = isIntersecting.getParentNode(parent);
                tree.push(parent);
            }
            
            return tree;
        }

        const scrollAreas = targetsAll.map(target => {
            const parents = computeParentNode(target);
            return parents.filter(parent => {
                const style = getComputedStyle(parent, '');

                const isScroll = (style.overflow  === 'scroll' ||
                                  style.overflow  === 'auto'   ||
                                  style.overflowY === 'scroll' ||
                                  style.overflowY === 'auto');
                                  
                if (isScroll) return true;
            });
        });
        
        return scrollAreas.reduce((a, c) => a.concat(c), []);
    }
    private static onWather(instance: Controller) {
        const scrollPassive = {
            passive: true,
        }

        window.addEventListener('resize', instance.watcher_binded, false);

        window.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.documentElement.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.body.addEventListener('scroll', instance.watcher_binded, scrollPassive);

        instance.mo.observe(document.querySelector('html'), instance.mutationObserverConfig);

        instance.scrollAreasOftargets.forEach(target => {
            target.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        });
    }
    private static offWather(instance: Controller) {
        window.removeEventListener('resize', instance.watcher_binded);

        window.removeEventListener('scroll', instance.watcher_binded);
        document.documentElement.removeEventListener('scroll', instance.watcher_binded);
        document.body.removeEventListener('scroll', instance.watcher_binded);
        
        instance.mo.disconnect();

        instance.scrollAreasOftargets.forEach(target => {
            target.removeEventListener('scroll', instance.watcher_binded);
        });
    }
    public static isIntersecting(target: Element, root: Element | any, rootMargin: string): boolean {
        return isIntersecting.is(target, root, rootMargin);
    }
    public static isDisplay(target: Element) {
        return isDisplay(target);
    }
    public static get THROTTLE_INTERVAL() {
        return 33;
    }
}