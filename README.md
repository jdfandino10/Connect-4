# Connect-4
An online multiplayer connect 4 game using Meteor
[The Demo Game](https://connect-04.herokuapp.com/)

## Play now!
Create or join public or private games and play online with your friends. Just login or create an account to get started.

## What’s connect-4?
Connect-4 is a very simple board game. On a 6x7 grid players must insert chips alternately. The main goal is to get the largest number of 4 chips in a row, either horizontally, vertically or diagonally. Strategy is the key!
It's simple and accessible!

## Development/Run
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8092d1ceaa4a4f819ee6d09379de30e3)](https://www.codacy.com/app/dalthviz/Connect-4?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jdfandino10/Connect-4&amp;utm_campaign=Badge_Grade)
![Circleci](https://circleci.com/gh/jdfandino10/Connect-4/tree/master.svg?style=shield&circle-token=d729a3c0266d02cfb200b87a85e599c5d509d33a)

In order to run this application you will need [Meteor](https://www.meteor.com/)

Then clone this repository with:
`git clone https://github.com/jdfandino10/Connect-4.git`

Install the dependencies:

`meteor npm install`

And run the application:

`meteor run`

Also if you want to run the test locally run:

`meteor test --driver-package dispatch:mocha`

Or for a view of the results in the browser:

`meteor test --driver-package practicalmeteor:mocha`

**Note:** The application in your local environment will work with a local database created by meteor.
