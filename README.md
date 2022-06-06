Test Coverage: 80+%
Jira Link: https://matthewdduck.atlassian.net/jira/software/projects/P2/boards/3

# 5e Character Builder
This project is a way to build basic character sheets for DnD 5e. Users can create, view, update and delete their own character sheets. They can do this by interacting with the webpage built to display the data. The website displays the current character sheets in a list and new ones can be created by clicking the button at the bottom of the page. To delete and update characters a current one must be selected by clicking on it and the buttons then appear. All the fields other than names contain pregenerated choices which can be changed and updated as needed as well as displaying text based on the choice.

## Prerequisites
* SpringBoot
* Maven
* Java
* Lombok
* MySQL

## Installing
Can be installed two ways:
* Downloading the whole repository and running it through the applications class and then navigating to the localhost location.
* Running the fat jar and then navigating to the localhost location.

## Testing
First set the application properties variable to "test".
The tests run are two different types.
Unit tests check each class individually and use JUnit, Mockito and Mvc. Mockito is used to mock objects so that classes can be tested in isolation. Mvc is used to check that http requests return the correct response. JUnit was used to automate and run the tests themselves and check that the output matched the expected output.
Integration tests checked that all classes worked correctly together and used Mvc and JUnit.

## Authors
Matthew Duck

## License
Uses the MIT license.

## Acknowledgments
Thanks to Anoush Lowton for helping me on some issues when I got stuck and helping fix my HTML form issue.
