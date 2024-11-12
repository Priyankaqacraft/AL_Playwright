import CommonPage from './commonPage';
import { Path } from 'glob';
const extensions = ['Courses'];
import { activeBaseUrl } from '../utils/config';

class manufacturerDetail extends CommonPage{
    constructor(page) {
        super(page);
        this.page = page; 
        this.productname='//span[contains(text(),"Doors")]';
        this.direction='//span[contains(text(),"West")]';
        this.country='//span[contains(text(),"USA")]';
        this.location='//span[contains(text(),"Residential")]';
        this.producttab='//li[contains(@class,"!font-medium")]//child::button';
        this.inspirationtab='//span[contains(text(),"Inspiration")]//parent::button';
        this.listofproduct='//div[@class="p-4"]//child::a';
        this.inspirationimage='//div[contains(@class,"cursor-pointer")]//child::img';
        this.firstproduct='//a[contains(@href,"window-side-hinged?")]';
        this.manufacturerbreadcrumb='//a[contains(text(),"All")]',
        this.homebreadcrumb='//a[contains(text(),"Home")]'
    }
}
    export default manufacturerDetail;