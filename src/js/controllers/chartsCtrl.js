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

		vm.weaponRankOrder = ["S", "A", "B", "C"];
		vm.weaponTypeOrder = ["Sword", "Lance", "Axe", "Dagger", "Bow", "Tome", "Staff", "Stone"];

		vm.statsFilters = {
			'tier1': { key: 'tier1', group: 'tier', fn: function(obj) { return obj.classTier == 'tier1' } },
			'tier2': { key: 'tier2', group: 'tier',  fn: function(obj) { return obj.classTier == 'tier2' } },
			'tierSpecial': { key: 'tierSpecial', group: 'tier', fn: function(obj) { return obj.classTier == 'special' } },
			'anyWeapon': { key: 'anyWeapon', group: 'misc', fn: function(obj) { return true } },
			'Sword': { key: 'Sword', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Sword } },
			'Lance': { key: 'Lance', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Lance } },
			'Axe': { key: 'Axe', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Axe } },
			'Dagger': { key: 'Dagger', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Dagger } },
			'Bow': { key: 'Bow', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Bow } },
			'Tome': { key: 'Tome', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Tome } },
			'Staff': { key: 'Staff', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Staff } },
			'Stone': { key: 'Stone', group: 'weaponType', fn: function(obj) { return !!obj.weaponRanks.Stone } },


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
			selectedRows: {}
		};

		vm.changeStatsMode = function() {
			buildStatsRows();
		};

		vm.selectStatsRow = function(rowKey) {
			vm.statsModel.selectedRows[rowKey] = !vm.statsModel.selectedRows[rowKey];
		};

		vm.sortedBy = { field: '', order: 'asc' };

		vm.sortBy = function(col) {
			var sortOrder = 'desc';
			if (col == 'name' || col == 'weaponRanks') sortOrder = 'asc';
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
			var rows = angular.copy(vm[vm.statsView]);

			// console.log('rows before filter or sort');
			// console.log(rows);

			// first pass: replace all gender duplicates with a single row
			Object.keys(rows).forEach(function(rowName) {
				var rowObj = rows[rowName];
				if (rowObj.combinedDisplayName) {
					var combinedRow = angular.copy(rowObj);
					combinedRow.combinedDisplayName = null;
					combinedRow.name = rowObj.combinedDisplayName;
					delete rows[rowName];
					rows[combinedRow.name] = combinedRow;
				}

			});

			// filter rows
			if (vm.statsParams.filters) {

				// organize into supersets by filter group by taking the union
				// of the filters within each group
				var filterGroups = {};
				vm.statsParams.filters.forEach(function(filter) {
					if (!filterGroups[filter.group]) {
						filterGroups[filter.group] = filterRows(rows, filter.fn);
					} else {
						angular.extend(filterGroups[filter.group], filterRows(rows, filter.fn));
					}
				});

				// then take the intersection of the supersets

				var filterGroupKeys = Object.keys(filterGroups);
				var filterIntersection = filterGroups[filterGroupKeys[0]];

				for (var i=1; i<filterGroupKeys.length; i++) {
					var nextFilterGroup = filterGroups[filterGroupKeys[i]];

					for (var j=Object.keys(filterIntersection).length; j>=0; j--) {
						var commonRowKey = Object.keys(filterIntersection)[j];

						if (!nextFilterGroup.hasOwnProperty(commonRowKey)) {
							delete filterIntersection[commonRowKey];
						}
						
					}
				}

				// console.log('filterIntersection');
				// console.log(filterIntersection);

				rows = filterIntersection;

				// var individualFilteredRows = vm.statsParams.filters.map(function(filter) {
				// 	return filterRows(rows, filter.fn);
				// });

				// rows = angular.extend.apply(null, [{}].concat(individualFilteredRows));
				
			}

			// sort rows
			if (vm.statsParams.sort) {
				rows = sortRows(rows, vm.statsParams.sort.field, vm.statsParams.sort.order);
			}


			// get the list of columns that are currently set to be displayed
			var cols = vm.statsModel[vm.statsView].cols;

			// filter cols
			// console.log(cols);
			
			Object.keys(rows).forEach(function(rowName) {
				var rowObj = rows[rowName];
				statsRows[rowName] = {name: rowObj.name};

				cols.forEach(function(col) {
					if (rowObj[vm.statsModel[vm.statsView].mode] &&
						rowObj[vm.statsModel[vm.statsView].mode][col] || rowObj[vm.statsModel[vm.statsView].mode][col] === 0) {

						statsRows[rowName][col] = rowObj[vm.statsModel[vm.statsView].mode][col];
					}

					else if (!rowObj[col]) {
						statsRows[rowName][col] = "";
					}

					// hardcode special cases
					else if (col == 'weaponRanks') {
						var html = "";
						Object.keys(rowObj[col]).forEach(function(weapon) {
							html += '<span class="max-weaponrank">'
								+ '<i class="icon-weaponrank icon-weaponrank-'+weapon+'"></i>'
								+ rowObj[col][weapon]
								+ '</span>';
						});
						statsRows[rowName][col] = html;
					}
					else if (col == 'bonus') {
						var output = Object.keys(rowObj[col]).map(function(stat) {
							return stat + ' '
								+ (rowObj[col][stat] > 0 ? '+' : '')
								+ rowObj[col][stat];
						}).join(', ');
						statsRows[rowName][col] = output;
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

		// for sorting comparisons. copies indexOf but returns Infinity instead of -1 if not found
		function getOrder(el, arr) {
			var index = arr.indexOf(el);
			if (index == -1) return Infinity;
			return index;
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
					if (a[field] || a[field] === 0) {

						if (typeof a[field] == 'number' || typeof a[field] == 'string') {
							if (a[field] > b[field]) sortNum = 1;
							else if (a[field] < b[field]) sortNum = -1;						
						}
						else {

							// Custom sorting algorithm for weapon rank
							// Prioritize weapon rank, then weapon type (i.e. all S ranks on top)
							if (field == 'weaponRanks') {

								var filteredOnWeaponType = false;
								var filteredWeaponTypes = [];
								if (vm.statsParams.filters) {
									filteredWeaponTypes = vm.statsParams.filters
										.filter(function(filter) { return filter.group == 'weaponType' })
										.map(function(filter) { return filter.key });
									filteredOnWeaponType = !!filteredWeaponTypes.length;
								}


								var wro = vm.weaponRankOrder, wto = vm.weaponTypeOrder;

								// first sort weapon rank map of each class by rank,
								// so weapon type with highest rank is listed first
								var objLists = [a[field], b[field]].map(function(weaponRankObj) {
									var sortedWeaponRankObj = {};

									Object.keys(weaponRankObj)
										.sort(function(c, d) {
											var cRank = weaponRankObj[c], dRank = weaponRankObj[d];
											var rankSortNum = 0;
											if (getOrder(cRank, wro) > getOrder(dRank, wro)) rankSortNum = 1;
											else if (getOrder(cRank, wro) < getOrder(dRank, wro)) rankSortNum = -1;
											return rankSortNum;
										})
										.forEach(function(weaponType) {
											sortedWeaponRankObj[weaponType] = weaponRankObj[weaponType];
										});

									return sortedWeaponRankObj;
								});
								var aObj = objLists[0], bObj = objLists[1];

								// if filtered on a weapon type, prioritize sorting by weapon type
								if (filteredOnWeaponType) {
									filteredWeaponTypes.forEach(function(selectedType) {
										if (sortNum != 0) return;
										if (Object.keys(aObj).indexOf(selectedType) > -1 && Object.keys(bObj).indexOf(selectedType) == -1) sortNum = 1;
										else if (Object.keys(aObj).indexOf(selectedType) == -1 && Object.keys(bObj).indexOf(selectedType) > -1) sortNum = -1;
										else {
											if (getOrder(aObj[selectedType], wro) > getOrder(bObj[selectedType], wro)) {
												sortNum = 1;
											}
											else if (getOrder(aObj[selectedType], wro) < getOrder(bObj[selectedType], wro)) {
												sortNum = -1;
											}
										}
									});
								}
								// otherwise, prioritize sorting by weapon rank
								else {
									for (var i=0; i<3; i++) {
										var aType = Object.keys(aObj)[i], bType = Object.keys(bObj)[i];

										if (getOrder(aObj[aType], wro) > getOrder(bObj[bType], wro)) sortNum = 1;
										else if (getOrder(aObj[aType], wro) < getOrder(bObj[bType], wro)) sortNum = -1;
										else {
											if (getOrder(aType, wto) > getOrder(bType, wto)) sortNum = 1;
											else if (getOrder(aType, wto) < getOrder(bType, wto)) sortNum = -1;
										}
										if (sortNum != 0) break;
									}
									
								}
							}


						}

					}
					else {
						var cat = vm.statsModel[vm.statsView].mode;
						if (a[cat] && a[cat][field] || a[cat][field] === 0) {
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










