import BaseStore from 'fluxible/addons/BaseStore';

class PageStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.pageTitle = '';
    }
    updatePageTitle(title) {
        this.pageTitle = title;
        this.emitChange();
    }
    getPageTitle() {
        return this.pageTitle;
    }
    dehydrate() {
        return {
            pageTitle: this.pageTitle
        };
    }
    rehydrate(state) {
        this.pageTitle = state.pageTitle;
    }
}

PageStore.storeName = 'PageStore';
PageStore.handlers = {
    'UPDATE_PAGE_TITLE': 'updatePageTitle'
};

export default PageStore;
