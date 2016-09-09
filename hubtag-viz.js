if (!window.angular) throw new Error('Please load angular prior to this script');

angular.module('hubtagApp', [])
  .controller('HubtagController', HubtagController)
  .filter('sortedSchedule', sortedScheduleFilter);

function HubtagController() {

  // helper to generate a hashmap key; this makes sorting easier
  function key(week, day) {
    return week * 10000  +  day;
  }

  // the maximum number of colors for each tile
  var MAX_COLORS = 5;

  // hold the weeks
  this.weeks = [];
  for (var i = 1; i < 52; i++) { this.weeks.push(i);}

  // hold the days of one week
  this.days = {
    'SUN': 0,
    'MON': 1,
    'TUE': 2,
    'WED': 3,
    'THR': 4,
    'FRI': 5,
    'SAT': 6
  };

  // contains the schedule to pursuit
  this.tiles = {};

  // changes the state of the tile
  this.clickOnTile = function clickOnTile(week, day, dayLabel) {

    var oldContribution = this.tiles[ key(week, day) ] ? this.tiles[ key(week, day) ].contributions : 0;
    var newContribution = (oldContribution + 1) % MAX_COLORS;

    this.tiles[ key(week, day) ] = { // we use a hashmap for simple lookup avoiding nested lists
      contributions: newContribution,
      week: week,
      day: dayLabel
    };
  };

  // returns the contribution count of the tile
  this.getContributions = function getContributions(week, day) {
    if (this.tiles && this.tiles[ key(week, day) ]) {
      return this.tiles[ key(week, day) ].contributions;
    }
    return 0;
  }
}
// returns a nice schedule sorted by week and day
function sortedScheduleFilter() {
  return function (items) {

    // will contains the days
    var weeks = {};
    var keys = Object.keys(items);
    keys.sort(function (val1, val2) { return val1 - val2; });

    var schedule = [];
    keys.forEach(function(key) {
      schedule.push(items[key]);
    });

    return schedule;
  }
}
