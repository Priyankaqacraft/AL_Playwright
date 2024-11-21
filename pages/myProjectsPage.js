import puppeteer from 'puppeteer';
import CommonPage from './commonPage';

class MyProjectPage extends CommonPage {
    constructor(page){
        super(page);
        this.project_titles = "//h3";
        this.new_project_link = "//span[contains(text(),'New Project')]";
        this.workspace_button = "//button[@id='workspace-button']";
        this.project_link = "//a[@href='/my-projects']";
        this.back_to_myProject_link = "//span[text()='Back to My Projects']";
        this.general_research_button = "//h3[contains(text(),'General Research')]";
        this.general_research_text = "//h1[contains(text(),'General Research')]";
        this.btnSpecPlanner = "(//span[text()='Spec Planner'])[1]"; // Element is removed on page
        this.btnSchedules = "(//span[text()='Schedules'])[1]";
        this.btnComparisons = "(//span[text()='Comparisons'])[1]";
        this.btnResearch = "(//span[text()='Research'])[1]";
        this.btnConversations ="(//span[text()='Conversations'])[1]";
        this.btnProjectInfo = "(//span[text()='Project Info'])[1]";
        this.btnCreateBlankProject = "//a[contains(text(),'Create Blank Project')]";
        
    }
}
export default MyProjectPage