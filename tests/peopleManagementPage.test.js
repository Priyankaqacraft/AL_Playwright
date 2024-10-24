import { noLoginsetup, teardown } from './setup';
import CommonPage from '../pages/commonPage';
import { activeBaseUrl } from '../utils/config';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { Paths } from '../utils/path';
import { performLogins } from '../utils/logins';
import PeopleManagement from '../pages/peopleManagementPage';
import Collaborator from '../pages/addCollaboratorCompanyPage';
import ArticlesPage from '../pages/articlesPage';
import MyAccountPage from '../pages/myAccountPage';

jest.setTimeout(50000);

describe('Author: ', () => {
    let page,
        timestampUTC,
        commonPage,
        context,
        addCollaboratorCompanyPage,
        peopleManagementPage,
        myAccountPage,
        articlesPage,
        browser

    beforeAll(async () => {
        const setupResults = await noLoginsetup();
        page = setupResults.page;
        timestampUTC = setupResults.timestampUTC;
        commonPage = new CommonPage(page);
        browser = setupResults.browser;
        context = browser.defaultBrowserContext();
        peopleManagementPage = new PeopleManagement(page);
        addCollaboratorCompanyPage = new Collaborator(page);
        myAccountPage = new MyAccountPage(page);
        articlesPage = new ArticlesPage(page);
        await page.goto(activeBaseUrl);
    });

    afterAll(async () => {
        await teardown();
    });

    it("Should verify that Account Status text", async () => {
        try {
            await performLogins(page, 'admin');
            await commonPage.navigateTo(Paths.MyAccount);
            const accountStatusText = await commonPage.getElementText(peopleManagementPage.account_Status_Text);
            expect(accountStatusText).toBe("Account Status");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Account Status text');
            throw error;
        }
    });

    it("Should verify that Upload Profile Pic text", async () => {
        try {
            const accountStatusText = await commonPage.getElementText(peopleManagementPage.upload_Profile_Pic_Button);
            expect(accountStatusText).toBe("Upload Profile Pic");
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Upload Profile Pic text');
            throw error;
        }
    });

    it("Should verify that Change Password Button is Displayed", async () => {
        try {
            const isChangePasswordButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.change_Password_Button);
            expect(isChangePasswordButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Change Password text');
            throw error;
        }
    });

    it("Should verify that Delete Account Button is Displayed", async () => {
        try {
            const isDeleteAccountButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.delete_Account_Button);
            expect(isDeleteAccountButtonDisplayed).toBe(true);
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Delete Account Button');
            throw error;
        }
    });

    it("Should verify that People Management Text is Displayed", async () => {
        try {
            await performLogins(page, 'admin');
            await commonPage.navigateTo(Paths.MyAccount);
            await commonPage.wait();
            await commonPage.performClick(addCollaboratorCompanyPage.company_Edit_Link);
            const isPeopleManagementTextDisplayed = await commonPage.getElementText(peopleManagementPage.people_Management_Text);
            expect(isPeopleManagementTextDisplayed).toContain('People Management');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'People Management Text');
            throw error;
        }
    });

    it("Should verify that Click On Company edit button and verify Save Button on that page", async () => {
        try {
            const isSaveButtonDisplayed = await commonPage.isElementExists(addCollaboratorCompanyPage.btnSave);
            expect(isSaveButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Save Button');
            throw error;
        }
    });

    it("Should verify that Click On Company edit button and verify Cancel Button on that page", async () => {
        try {
            const isCancelButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.btnCancel);
            expect(isCancelButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Cancel Button');
            throw error;
        }
    });

    it("Should verify that Click On Company edit button and verify Leave Company Button on that page", async () => {
        try {
            const isLeaveCompanyButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.leave_Company_Button);
            expect(isLeaveCompanyButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Leave Company Button');
            throw error;
        }
    });

    it("Should verify that Click On Company edit button and verify Email on that page", async () => {
        try {
            const isEmailDisplayed = await commonPage.getElementText(peopleManagementPage.people_management_email);
            expect(isEmailDisplayed).toContain('admin')
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Email text');
            throw error;
        }
    });

    it("Should verify that Click On Company edit button and verify Add Team Member Button on that page", async () => {
        try {
            const isAddTeamMemberButtonDisplayed = await commonPage.isElementExists(addCollaboratorCompanyPage.add_Team_Member_Button);
            expect(isAddTeamMemberButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Team Member Button');
            throw error;
        }
    });

    it("Should verify that click on Add Team Member Button and verify Email Text Field on that page", async () => {
        try {
            await commonPage.performClick(addCollaboratorCompanyPage.add_Team_Member_Button);
            const isEmailTextFieldDisplayed = await commonPage.isElementExists(addCollaboratorCompanyPage.email_TextField);
            expect(isEmailTextFieldDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Email Text Field');
            throw error;
        }
    });

    it("Should verify that click on Add Team Member Button and verify Add Another Team Member Button on that page", async () => {
        try {
            const isAddAnotherTeamMemberDisplayed = await commonPage.isElementExists(peopleManagementPage.button_add_another_email_member);
            expect(isAddAnotherTeamMemberDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Add Another Team Member Button');
            throw error;
        }
    });

    it("Should verify that click on Add Team Member Button and verify Email Textbox count on that page", async () => {
        try {
            await commonPage.performClick(peopleManagementPage.button_add_another_email_member);
            const textboxes = await page.$x(addCollaboratorCompanyPage.email_TextField);
            const textboxCount = textboxes.length;
            console.log('Email Textbox Count:',textboxCount);
            expect(textboxCount).toBe(2);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Email Textbox Count');
            throw error;
        }
    });

    it("Should verify that click on Add Team Member Button and verify Send invitation Button is Disabled", async () => {
        try {
            await commonPage.performClick(articlesPage.btn_model_close);
            await commonPage.performClick(addCollaboratorCompanyPage.add_Team_Member_Button);
            const isSendInvitationButtonDisabled = await commonPage.isElementDisabled(addCollaboratorCompanyPage.send_Invitation_Button);
            expect(isSendInvitationButtonDisabled).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Send invitation Button');
            throw error;
        }
    });

    it("Should verify that click on Add Team Member Button and verify Send invitation Button is Enabled", async () => {
        try {
            await commonPage.clearAndSendKeys(addCollaboratorCompanyPage.email_TextField, 'abc@acelab.com');
            await page.keyboard.press('Enter');
            await commonPage.wait();
            const isSendInvitationButtonEnabled = await commonPage.isElementDisabled(addCollaboratorCompanyPage.send_Invitation_Button);
            expect(isSendInvitationButtonEnabled).toBe(false);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Send invitation Button');
            throw error;
        }
    });

    it("Should verify that new email invitation count", async () => {
        try {
            await commonPage.performClick(addCollaboratorCompanyPage.send_Invitation_Button);
            await commonPage.wait();
            const email_Invitation = await page.$x(peopleManagementPage.new_email_invitation);
            const new_email = email_Invitation.length;
            console.log('New Email Invitation Count:',new_email);
            expect(new_email).toBe(1);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'New Email Invitation count');
            throw error;
        }
    });

    it("Should verify that resend email button is Displayed", async () => {
        try {
            const isResendEmailButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.button_resend_email);
            expect(isResendEmailButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Resend Email Button');
            throw error;
        }
    });

    it("Should verify that Remove Button is Displayed", async () => {
        try {
            await commonPage.performClick(peopleManagementPage.button_close_button);
            await commonPage.wait();
            const isRemoveButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.button_remove);
            expect(isRemoveButtonDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Remove Button');
            throw error;
        }
    });

    it("Should verify that Close Button is Displayed", async () => {
        try {
            await commonPage.performClick(peopleManagementPage.button_close);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Close Button');
            throw error;
        }
    });

    it("Should verify that new email invitation count", async () => {
        try {
            await commonPage.wait();
            const email_Invitation = await page.$x(peopleManagementPage.new_email_invitation);
            const new_email_Invitation = email_Invitation.length;
            expect(new_email_Invitation).toBe(1);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'New Email Invitation count');
            throw error;
        }
    });

    it("Should verify that click on close and remove email invitation and check invitation count", async () => {
        try {
            await commonPage.performClick(peopleManagementPage.button_close_button);
            await commonPage.performClick(peopleManagementPage.button_remove);
            await commonPage.wait();
            const email_Invitation = await page.$x(peopleManagementPage.new_email_invitation);
            const new_email_Invitation = email_Invitation.length;
            expect(new_email_Invitation).toBe(0);
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Remove new email invitation');
            throw error;
        }
    });

    it("Should verify that User Text is Displayed", async () => {
        try {
            await performLogins(page, 'admin');
            await commonPage.waitForLoadComplete();
            await page.goto(activeBaseUrl); // Please Remove after Bug Resolve (Redirect on Admin Panel)
            await commonPage.performClick(myAccountPage.profile_dropdown);
            await commonPage.performClick(peopleManagementPage.manage_account_link);
            await commonPage.performClick(addCollaboratorCompanyPage.company_Edit_Link);
            await commonPage.wait();
            const isUserTextDisplayed = await commonPage.isElementExists(peopleManagementPage.userText);
            expect(isUserTextDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'User Text');
            throw error;
        }
    });

    it("Should verify that Role Text is Displayed", async () => {
        try {
            const isRoleTextDisplayed = await commonPage.isElementExists(peopleManagementPage.roleText);
            expect(isRoleTextDisplayed).toBe(true);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Role Text');
            throw error;
        }
    });

    it("Should verify values of role dropdown", async () => {
        try {
            const dropdownRoleOptions = await commonPage.getList(peopleManagementPage.dropdownRoleOp);
            expect(dropdownRoleOptions).toContain('Admin\nCreator\nEditor\nViewer');
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Values of role dropdown');
            throw error;
        }
    });

    it("Should verify usre are in ascending order", async () => {
        try {
            const names = await commonPage.getList(peopleManagementPage.admin_user_List);
            console.log(names);
            const sortedNames = [names].sort();
            const sortedNamesString = sortedNames.join(' ');
            console.log(sortedNamesString);
            expect(names).toEqual(sortedNamesString, 'Names are not in ascending order');
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'User are in ascending');
            throw error;
        }
    });

    it("Should verify leave company button is not diplayed for manufacture collaborator user", async () => {
        try {
            await performLogins(page, 'mfgRep');
            await commonPage.navigateTo(Paths.MyAccount);
            await commonPage.performClick(addCollaboratorCompanyPage.company_Edit_Link);
            await commonPage.wait();
            const isLeaveCompanyButtonDisplayed = await commonPage.isElementExists(peopleManagementPage.leave_Company_Button);
            expect(isLeaveCompanyButtonDisplayed).toBe(false);
            await myAccountPage.logOut();
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Leave company button');
            throw error;
        }
    }, 85000);

    it("Should verify manufacturer admin's Resend Email Link count", async () => {
        try {
            const resentEmailLinksSize = await page.$x(addCollaboratorCompanyPage.button_resend_email);
            expect(resentEmailLinksSize.length).toBe(0);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Resend Email Link count');
            throw error;
        }
    });

    it("Should verify manufacturer admin's Role Options Dropdown count", async () => {
        try {
            const roleOptionsDropdownSize = await page.$x(addCollaboratorCompanyPage.dropdownRole);
            expect(roleOptionsDropdownSize.length).toBe(0);
        } catch (error) {
            await captureAndAttachScreenshot(page, 'Role Options Dropdown count');
            throw error;
        }
    });
});