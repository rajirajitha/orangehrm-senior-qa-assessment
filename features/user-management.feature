Feature: Admin User Management

  As an administrator
  I want to manage users in OrangeHRM
  So that I can maintain valid user accounts

  @smoke @regression
  Scenario: Successfully create a new user
    Given I am logged into OrangeHRM as an administrator
    When I navigate to the Admin user management page
    And I create a new user
    Then the new user should be created successfully
    When I search for the newly created user
    Then the newly created user should be displayed
    When I logout from OrangeHRM
    Then I should be redirected to the login page