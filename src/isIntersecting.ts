// import map from './map';
// import constrain from './constrain';

export default class isIntersecting{
    public static is(target: Element, root: Element | any, rootMargin: string = '0px'): any{
        const parentTree = isIntersecting.computeParentNode(root, target);  
    
        if (parentTree === false) return false;
        
        const rectList = isIntersecting.computeCheckTargetRectList(root, parentTree, rootMargin);
        const targetRect = isIntersecting.getBoundingClientRect(target);

        let counter = 0;

        while (counter !== rectList.length) {
            const contanerRect = rectList[counter];
            
            if (contanerRect.width <= 0 || contanerRect.height <= 0) {
                return false;
            }

            if (contanerRect.bottom <= targetRect.top || contanerRect.top >= targetRect.bottom) {
                return false;
            }

            counter++;
        }

        return true;
    }
    private static computeParentNode(root, target) {
        const rootNode = (root) ? root : document.documentElement;        
        const tree = [];
        const html = document.documentElement;  
        
        let parent = target;
        
        while (parent !== html) {
            parent = isIntersecting.getParentNode(parent);
            tree.push(parent);
        }

        if (!tree.includes(rootNode)) return false;

        return tree.splice(0, tree.indexOf(rootNode) + 1);
    }
    private static computeCheckTargetRectList(root, parentTree, rootMargin): any[]{
        const rootNode = (root) ? root : document.documentElement;

        const resultList = parentTree.map(parentNode => {
            if (parentNode !== rootNode) {
                return isIntersecting.getBoundingClientRect(parentNode);
            } else {
                return isIntersecting.getRootRect(parentNode, rootMargin);
            }
        })

        return resultList;
    }
    private static getRootRect(rootNode: Element | any, rootMargin: String): {}{
        let rect = null;
        const html = document.documentElement;        

        if (rootNode !== html) {
            rect = isIntersecting.getBoundingClientRect(rootNode);
        } else {
            rect = {
                top: 0,
                bottom: html.clientHeight,
                right: html.clientWidth,
                left: 0,
                width: html.clientWidth,
                height:html.clientHeight,
            }
        }

        return isIntersecting.applyRootMargin(rect, rootMargin);
    }
    private static applyRootMargin(rect:any, rootMargin:String): {}{
        const margin = isIntersecting.parseRootMargin(rootMargin);

        const rectWidth = rect.width;
        const rectHeight = rect.height;

        const marginTop = (margin.top[1] === 'px') ? margin.top[0] : rectHeight * margin.top[0] / 100;
        const marginBottom = (margin.bottom[1] === 'px') ? margin.bottom[0] : rectHeight * margin.bottom[0] / 100;
        const marginRight = (margin.right[1] === 'px') ? margin.right[0] : rectWidth * margin.right[0] / 100;
        const marginLeft = (margin.left[1] === 'px') ? margin.left[0] : rectWidth * margin.left[0] / 100;

        const applyedRect = {
            top: rect.top - marginTop,
            bottom: rect.bottom + marginBottom,
            right: rect.right + marginRight,
            left: rect.left - marginLeft,
            width: 0,
            height:0,
        }

        applyedRect.width = applyedRect.right - applyedRect.left;
        applyedRect.height = applyedRect.bottom - applyedRect.top;
        
        return applyedRect;
    }
    private static parseRootMargin(rootMargin: String): any{
        const rootMarginArray = rootMargin.split(' ');
        const parser = (rootMarginString) => {
            return [parseFloat(rootMarginString), rootMarginString.match(/(px|%)/)[0]];
        }

        const result = {
            top: null,
            bottom: null,
            right: null,
            left:null,
        };

        switch (rootMarginArray.length) {
            case 1:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[0]);
                result.right = parser(rootMarginArray[0]);
                result.left = parser(rootMarginArray[0]);
                break;
            case 2:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[0]);
                result.right = parser(rootMarginArray[1]);
                result.left = parser(rootMarginArray[1]);
                break;
            case 4:
                result.top = parser(rootMarginArray[0]);
                result.bottom = parser(rootMarginArray[2]);
                result.right = parser(rootMarginArray[1]);
                result.left = parser(rootMarginArray[3]);
                break;
        }
        
        return result;
    }
    public static getParentNode(target: Element|any): Element | any{
        const parent = target.parentNode;

        if (parent && parent.nodeType == 11 && parent.host) return parent.host;

        if (parent && parent.assignedSlot) return parent.assignedSlot.parentNode;

        return parent;
    }
    private static getBoundingClientRect(target: Element | any): {} | any{
        const empty = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };

        let rect = null;

        try {
            return rect = target.getBoundingClientRect();
        } catch (error) {
            
        }

        if (rect === null) return empty;
    }
    
}