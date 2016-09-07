
if (!window.angular) throw new Error('Please load angular prior to this script');

angular.module('hubtagApp', [])
.controller('HubtagController', HubtagController)
.filter('sortedSchedule', tagFilter);

function HubtagController() {
    // the maximum number of colors for each tile
    var MAX_COLORS = 5;

    // hold the weeks
    this.weeks = [];
    for(var i = 1; i < 52; i++) { this.weeks.push(i);}

    // hold the days of one week
    this.days = ['SUN', 'MON','TUE', 'WED', 'THR', 'FRI', 'SAT']

    // contains the schedule to pursuit
    this.tiles = {};

    // changes the state of the tile
    this.clickOnTile = function clickOnTile(week, day) {

        var oldContribution = this.tiles[week + '_' + day] ? this.tiles[week + '_' + day].contributions : 0;
        var newContribution = (oldContribution + 1) % MAX_COLORS;


        this.tiles[week + '_' + day] = { // we use a hashmap for simple lookup avoiding nested lists
            contributions: newContribution,
            week: week,
            day: day
        };
    }

    // returns the contribution count of the tile
    this.getContributions = function getContributions(week, day) {
        if (this.tiles && this.tiles[week + '_' + day]) {
            return this.tiles[week + '_' + day].contributions;
        }
        return 0;
    }
}
// returns a nice schedule sorted by week and day
function tagFilter() {
    return function(items) {
        var keys = Object.keys(items);

        // we want to have things sorted 1,2,3,22 and not 1,2,22,3
        keys.sort(function(val1, val2) {
            return val1.localeCompare(val2);
        });

        var schedule = [];
        keys.forEach(function(key) {
            schedule.push(items[key]);
        })

        return schedule;
    }
}
