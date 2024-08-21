import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

    class ProjectPage extends CommonPage{
        constructor(page) {
            super(page);
            this.page = page;
            this.addNewProjectButton="//a[@href='/my-projects/new']";
            this.projectname_Textbox = "//input[@id='project-name-input']";
            this.projectname_location = "//input[@id='project-location-input']";
            this.projectname_location_list = "(//p[@class='shrink text-left text-sm text-navy-black'])[1]";
            this.projectname_phase = "//input[@id='phase-input']";
            this.projectname_phase_list = "//ul[@id='vs1__listbox']";
            this.projectname_type = "//input[@id='project-type-input']";
            this.projectname_type_list = "//li[contains(text(),'Single Family Residential')]";
            this.projectname_budget = "//input[@id='budget-input']";
            this.projectname_budget_list = "//li[contains(text(),'$0 - 2.4 Million')]";
            this.project_submit_button = "//form//child::div[@class='pt-2.5']//child::button";
            this.project_notification = "//div[contains(@role,'alert')]";
            this.button_delete_project = "//span[contains(text(),'Delete Project')]";
            this.button_confirm = "//button[contains(text(),'Confirm')]";
            this.threeDot = "//span[text()='Edit Project Info']//parent::a//following-sibling::div/descendant::*[local-name()='svg']";
            this.button_delete_project = "//span[contains(text(),'Delete Project')]";
            this.button_confirm = "//button[contains(text(),'Confirm')]";
            

    }

    async createNewProject(projectName){
        await this.performClick(this.addNewProjectButton);
        await this.enterText(this.projectname_Textbox,projectName);
        await this.enterText(this.projectname_location,"south");
        await this.performClick(this.projectname_location_list);
        await this.performClick(this.projectname_phase);
        await this.performClick(this.projectname_phase_list);
        await this.performClick(this.projectname_type);
        await this.performClick(this.projectname_type_list);
        await this.performClick(this.projectname_budget);
        await this.performClick(this.projectname_budget_list);
        await this.performClick(this.project_submit_button);

    }
    
    async deleteProject(){
        await this.performClick(this.threeDot);
        await this.performClick(this.button_delete_project);
        await this.performClick(this.button_confirm);
    }
}

export default ProjectPage;