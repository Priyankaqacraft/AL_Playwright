import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class manufacturerSearch extends CommonPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.brandButton = '//button[contains(text(),"Brands")]';
        this.abclink = '//a[contains(@href,"abc-window-systems")]';
        this.message = '//p[contains(@class,"text-sm text-secondary")]';
        this.resouceButton = '//button[contains(text(),"Resources")]';
        this.productguide = '//p[contains(text(),"product guides")]';
        this.resouceslink = '//a[contains(@href,"insulation-requirements")]';
        this.articleclick = '//a[contains(@href,"science-in-architecture")]'

    }
}
export default manufacturerSearch;