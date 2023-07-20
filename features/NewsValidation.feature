Feature: The Guardian News Articles validation

Scenario: The Guardian site has at least 1 News Article
Given I visit The Guardian site with pre-accepted cookies
When I get the all the News Article
And I go to Google to search the first News Article and log it
Then I should expect that the first News Article is valid
