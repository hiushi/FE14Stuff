app.controller('chartsCtrl', 
	['$rootScope', '$scope', 'Characters', 'Classes', 'Skills',
	function($rootScope, $scope, Characters, Classes, Skills) {

		var vm = this;

		var chars = vm.chars = Characters.getCharacters();
		var classes = vm.classes = Classes.getClasses();
		var skills = vm.skills = Skills.getAllSkills();


		vm.colDisplayName = {
			"HP": "HP", "Str": "Str", "Mag": "Mag", "Skl": "Skl", "Spd": "Spd", "Lck": "Lck", "Def": "Def", "Res": "Res",
			"Mov": "Mov",
			"weaponRanks": "Weapon Ranks",
			"bonus": "Bonus",
			"maxStats": "Caps",
			"growths": "Growths",
			"bases": "Bases"
		};

		vm.statsFilters = {
			'tier1': function(obj) { return obj.classTier == 'tier1' },
			'tier2': function(obj) { return obj.classTier == 'tier2' },
			'tierSpecial': function(obj) { return obj.classTier == 'special' }


		};


		vm.sv = vm.statsView = 'classes';

		vm.sm = vm.statsModel = {
			classes: {
				cols: ['HP', 'Str', 'Mag', 'Skl', 'Spd', 'Lck', 'Def', 'Res', 'weaponRanks', 'bonus'],
				mode: 'maxStats',
				rows: null
			},
			chars: {
				cols: [],
				mode: null
			},
		};


		vm.sortedBy = { field: '', order: 'asc' };

		vm.sortBy = function(col) {
			var sortOrder = 'desc';
			if (col == 'name') sortOrder = 'asc';
			if (vm.sortedBy.field == col) {
				sortOrder = (vm.sortedBy.order == 'desc') ? 'asc' : 'desc';
			}

			angular.extend(vm.statsParams, {
				sort: {
					field: col,
					order: sortOrder
				}
			});
			buildStatsRows();

			vm.sortedBy.field = col;
			vm.sortedBy.order = sortOrder;
		};

		vm.applyStatsFilter = function(filterKey) {
			var filterToAdd = vm.statsFilters[filterKey];

			if (!vm.statsParams.filters) {
				vm.statsParams.filters = [filterToAdd];
			}
			else if (vm.statsParams.filters.indexOf(filterToAdd) == -1) {
				vm.statsParams.filters.push(filterToAdd);
			}
			else {
				vm.statsParams.filters.splice(vm.statsParams.filters.indexOf(filterToAdd), 1);
			}
			buildStatsRows();
		};

		vm.statsParams = {};

		window.statsParams = vm.statsParams;


		function buildStatsRows() {
			var statsRows = {};
			var rows = vm[vm.statsView];

			// filter rows (union of all applied filters)
			if (vm.statsParams.filters) {
				var individualFilteredRows = vm.statsParams.filters.map(function(filter) {
					return filterRows(rows, filter);
				});
				// console.log(individualFilteredRows);
				// console.log(angular.extend.apply(null, [{}].concat(individualFilteredRows)));
				// rows = filterRows(rows, filterFunc);
				rows = angular.extend.apply(null, [{}].concat(individualFilteredRows));
			}

			// sort rows
			if (vm.statsParams.sort) {
				rows = sortRows(rows, vm.statsParams.sort.field, vm.statsParams.sort.order);
			}


			var cols = vm.statsModel[vm.statsView].cols;

			// filter cols
			// console.log(cols);
			
			Object.keys(rows).forEach(function(rowName) {
				var rowObj = rows[rowName];
				statsRows[rowName] = {name: rowObj.name};

				cols.forEach(function(col) {
					if (rowObj[vm.statsModel[vm.statsView].mode] &&
						rowObj[vm.statsModel[vm.statsView].mode][col]) {

						statsRows[rowName][col] = rowObj[vm.statsModel[vm.statsView].mode][col];
					}
					

				});

			});

			vm.statsRows = statsRows;

		}
		buildStatsRows();

		function filterRows(rows, filterFunc) {
			if (!filterFunc) return rows;

			var filteredRowList = Object.keys(rows)
				.map(function(row) {
					return rows[row];
				})
				.filter(filterFunc);

			var filteredRows = {};
			filteredRowList.forEach(function(row) {
				filteredRows[row.key] = row;
			});

			return filteredRows;
		}


		function sortRows(rows, field, order) {
			if (!field) return rows;
			if (!order) order = 'asc';

			var sortedRowList = Object.keys(rows)
				.map(function(row) {
					return rows[row];
				})
				.sort(function(a, b) {
					var sortNum = 0;
					if (a[field]) {
						if (a[field] > b[field]) sortNum = 1;
						else if (a[field] < b[field]) sortNum = -1;			
					}
					else {
						var cat = vm.statsModel[vm.statsView].mode;
						if (a[cat] && a[cat][field]) {
							if (a[cat][field] > b[cat][field]) sortNum = 1;
							else if (a[cat][field] < b[cat][field]) sortNum = -1;
						}
					}

					if (order == 'desc') sortNum *= -1;
					return sortNum;
				});


			var sortedRows = {};
			sortedRowList.forEach(function(row) {
				sortedRows[row.key] = row;
			});

			return sortedRows;
		}

	}






]);










